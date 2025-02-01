import { generateLink } from "../../helpers/link/generate-link.js";
import {
  compareHash,
  hashing,
} from "../../helpers/encrypt/generate-encrypt.js";
import { saved } from "../../helpers/repository/create-one-many.js";
import {
  findByEmail,
  findById,
} from "../../helpers/repository/find-one-many.js";
import loginAdminSchema from "../../helpers/shcema/login-admin-schema.js";
import {
  checkExpiredTime,
  convertToISODate,
  expiredAt,
} from "../../../../shared/utils/times/times-utils.js";
import oneTimeLinkSchema from "../../helpers/shcema/one-time-link-schema.js";
import { generateOneTimeToken } from "../../helpers/token/generate-token.js";
import createErrorHandler from "../../../../shared/utils/errors/error-hendler.js";
import validationInput from "../../../../shared/middlewares/validation/validation-input.js";
import { updatedById } from "../../helpers/repository/update-one-many.js";

/**
 *
 * @scoop {user}
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description One time function
 * @returns {object} link token
 */

export async function oneTimeLink(req, res, next) {
  try {
    const isValid = await validationInput(oneTimeLinkSchema, req.body);

    const result = await findByEmail("admin", isValid.email, {
      id: true,
      email: true,
    });

    if (result === null) {
      throw createErrorHandler(400, "Opss.. tidak dapat meneruskan permintaan");
    }
    const tokens = await generateOneTimeToken();

    const [tokenHash, expired, link] = await Promise.all([
      hashing(tokens),
      expiredAt({ minutes: 2 }),
      generateLink(req, tokens),
    ]);

    const isSave = await saved("oneTimeLink", {
      token: tokenHash,
      expiredAt: convertToISODate(expired),
      adminId: result.id,
    });

    if (isSave) {
      res.json({
        link: link,
      });
    } else {
      throw createErrorHandler(500, "Opss.. gagal membuat link login");
    }
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @scoop {user}
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description One time function
 * @returns {object} link token
 */

export async function loginVerify(req, res, next) {
  try {
    const { otl_token } = req.query;

    if (!otl_token) {
      throw createErrorHandler(404, "Tidak dapat menemukan token");
    }

    const isValid = await validationInput(loginAdminSchema, req.body);

    const result = await findByEmail("admin", isValid.email, {
      id: true,
      email: true,
      password: true,
      oneTimeLink: {
        select: {
          token: true,
          expiredAt: true,
          isUsed: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    });

    if (result === null) {
      throw createErrorHandler(400, "Opss.. tidak dapat meneruskan permintaan");
    }

    const [isMatch, isExpired, isMatchPass] = await Promise.all([
      compareHash(otl_token, result.oneTimeLink[0].token),
      checkExpiredTime(result.oneTimeLink[0].expiredAt),
      compareHash(isValid.password, result.password),
    ]);

    if (
      isMatch &&
      isExpired === false &&
      result.oneTimeLink[0].isUsed === false
    ) {
      if (!isMatchPass) {
        throw createErrorHandler(400, "Opss.. email dan password salah");
      }

      const isUpdated = await updatedById(
        "admin",
        result.id,
        {
          oneTimeLink: {
            deleteMany: {
              adminId: result.id, 
            },
          },
        },
        {
          id: true,
        }
      );

      if (isUpdated) {
        res.json("Halo selamat datang kembali!😍");
      } else {
        res.json("Gagal bro! 🤣");
      }
    } else {
      throw createErrorHandler(400, "Opss.. Terjadi kesalahan, moho ulangi");
    }
  } catch (error) {
    next(error);
  }
}
