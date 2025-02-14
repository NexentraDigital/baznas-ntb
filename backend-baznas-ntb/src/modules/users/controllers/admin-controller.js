import Admin from "../models/admin-model.js";
import Session from "../models/session-model.js";
import { cached } from "#root/src/configs/redis.js";
import workerPool from "#root/src/workers/worker-pool.js";
import OneTimeLink from "../models/one-time-link-model.js";
import { generateLink } from "../helpers/link/generate-link.js";
import { addEmailJob } from "#root/src/services/email/email-queue.js";
import { expiredTime } from "#root/src/shared/utils/times/expired-time.js";
import createErrorHandler from "#root/src/shared/utils/errors/error-hendler.js";

/**
 *
 * @scoop {admin}
 * @params {id} menetukan id admin
 * @description menampilkan data admin by id
 * @return {object} data admin
 *
 */

export async function getAdminById(req, res, next) {
  try {
    const { id } = req.params;
    const admin = await Admin.findById({ _id: id })
      .select("_id email")
      .limit(1)
      .lean();

    res.status(201).json({
      success: true,
      message: "Admin berhasil dibuat",
      data: admin,
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @scoop {admin}
 * @body {email} menetukan email untuk mengirimkan link login
 * @description membuat link login admin (one-time-link)
 * @return {object} url via email
 *
 */

export async function oneTimeLinkAdmin(req, res, next) {
  try {
    const { email } = req.body;

    const cacheKey = `otl:${email.split("@")[0]}`;
    const [tokenResult, admin] = await Promise.all([
      workerPool.worker("hashToken"),
      Admin.findOne({ email })
        .select("_id email password")
        .populate({
          path: "role",
          select: "name -_id",
          populate: {
            path: "permission",
            select: "name -_id",
          },
        })
        .populate({
          path: "oneTimeLink",
          select: "token expiredAt -_id",
          options: { sort: { createdAt: -1 }, limit: 1 },
        })
        .lean(),
    ]);

    if (!admin) {
      throw createErrorHandler(404, "Admin tidak ditemukan");
    }

    if (!admin) {
      throw createErrorHandler(400, "Opp.. terjadi kesalahan, mohon ulangi");
    }

    const { token, hash } = tokenResult;
    const expired = await expiredTime({ minutes: 2, type: "iso" });
    const link = await generateLink(req, token);

    await Promise.all([
      OneTimeLink.create({
        token: hash,
        expiredAt: expired,
        isUsed: false,
        adminId: admin._id,
      }),
      cached.set(cacheKey, JSON.stringify(admin), "EX", 2 * 60 * 1000),
    ]);
    res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Silahkan cek email, akan terkirim secepatnya",
    });

    setImmediate(() => {
      addEmailJob("send_email", {
        from: process.env.EMAIL_FROM,
        to: admin.email,
        subject: "Your link login",
        content: link,
      });
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @scoop {admin}
 * @query {otl_token} menetukan token otl
 * @body {email} menetukan email admin
 * @body {password} menetukan password admin
 * @description melakukan login via email dan password
 * @return {object} data session (jwt)
 *
 */

export async function loginVerify(req, res, next) {
  try {
    const { otl_token } = req.query;
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email })
      .select("_id email password")
      .populate({
        path: "role",
        select: "name permission",
        populate: {
          path: "permission",
          select: "name -_id",
        },
      })
      .populate({
        path: "oneTimeLink",
        select: "token expiredAt -_id",
        match: { isUsed: false },
        options: { sort: { createdAt: -1 }, limit: 1 },
      })
      .lean();

    if (!admin) {
      throw createErrorHandler(400, "Invalid credentials");
    }

    const payload = {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role.name,
      permission: admin.role.permission.map((item) => item.name),
    };

    const [isMatchPass, isMatchOtl, accessToken, refreshToken, expiredToken] =
      await Promise.all([
        workerPool.worker("compareToken", {
          data: password,
          hash: admin?.password,
        }),
        workerPool.worker("compareToken", {
          data: otl_token,
          hash: admin.oneTimeLink[0]?.token,
        }),
        workerPool.worker("generateJwt", {
          type: "access_token",
          payload: payload,
        }),
        workerPool.worker("generateJwt", {
          type: "refresh_token",
          payload: payload,
        }),
        workerPool.worker("checkExpired", {
          expiredAt: admin.oneTimeLink[0]?.expiredAt,
        }),
      ]);

    if (!isMatchOtl || !isMatchPass || expiredToken) {
      throw createErrorHandler(
        400,
        "Opps...silahkan gunakan link baru, terjadi kesalahan"
      );
    }

    await Promise.all([
      Session.findOneAndUpdate(
        {
          adminId: admin._id,
          expiresAt: { $lt: new Date() },
        },
        {
          ipAddress: req.ip,
          userAgent: req.headers["user-agent"],
          token: refreshToken,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      ),
      OneTimeLink.findOneAndUpdate(
        {
          adminId: admin._id,
          isUsed: false,
        },
        {
          isUsed: true,
          updatedAt: new Date().toISOString(),
        },
        {
          sort: { createdAt: -1 },
          new: true,
        }
      ),
      res.cookie("auth", refreshToken, {
        path: "/",
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      }),
    ]);

    res.json({
      status: "success",
      statusCode: 200,
      message: "Login successful",
      data: { token: accessToken },
    });
  } catch (error) {
    next(error);
  }
}
