import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import Fundraising from "../models/fundraising-model.js";
import workerPool from "#root/src/workers/worker-pool.js";
import FundraisingImage from "../models/fundraising-image-model.js";
import Description from "../models/fundraising-description-model.js";
import { pathToUrl } from "#root/src/shared/utils/path-to-link/convert-path-to-link.js";
import { log } from "console";
import createErrorHandler from "#root/src/shared/utils/errors/error-hendler.js";
import Admin from "../../users/models/admin-model.js";
import Contributor from "../../users/models/contributor-model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 *
 * @scoop {fundraising}
 * @query {src} menetukan searching fundraising
 * @query {page} menetukan halaman fundraising
 * @query {limit} menetukan jumlah per halaman fundraising
 * @description menampilkan data fundraising
 * @return {object} object data fundraising
 *
 */

export const getAllFundraising = async (req, res, next) => {
  try {
    const { src, page, limit, expiresIn } = req.query;

    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skips = (pages - 1) * limits;

    const sorting = src === "asc" ? 1 : src === "dsc" ? -1 : 1;

    const currentDate = new Date();
    const expirationThresholds = {
      day: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
      week: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
      month: new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000),
    };

    let query = {
      expirationDate: { $gt: currentDate },
    };

    if (expiresIn) {
      query.expirationDate = {
        $gt: currentDate,
        $lt: expirationThresholds[expiresIn],
      };
    }

    const sortOptions = {
      title: 1,
      publicationDate: -1,
      currentAmount: 1,
    };

    const [fundraising, total] = await Promise.all([
      Fundraising.find()
        .select(
          "_id title targetAmount currentAmount programName programType publicationDate expirationDate"
        )
        .populate({
          path: "description",
          select: "title body -_id",
        })
        .populate({
          path: "image",
          select: "url -_id",
        })
        .limit(limits)
        .skip(skips)
        .sort(sortOptions)
        .lean(),

      Fundraising.countDocuments(),
    ]);
    if (!fundraising?.length) {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Fundraising tidak ditemukan",
      });
    }
    res.json({ data: fundraising });
  } catch (error) {
    console.log(error.stack);

    next(error);
  }
};

/**
 *
 * @scoop {fundraising}
 * @param {id} menetukan detail fundraising
 * @description menampilkan detail campanye fundraising
 * @return {object} object fundraising (message)
 *
 */

export const getFundraisingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fundraising = await Fundraising.findById({ _id: id })
      .select(
        "_id title targetAmount currentAmount programName programType publicationDate expirationDate"
      )
      .populate({
        path: "description",
        select: "title body",
      })
      .populate({
        path: "image",
        select: "url",
      })
      .limit(1)
      .lean();
    if (!fundraising) {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Fundraising tidak ditemukan",
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @scoop {fundraising}
 * @body {title} menetukan judul fundraising
 * @body {image} menetukan gambar fundraising
 * @body {description} menetukan deskripsi fundraising
 * @body {targetAmount} menetukan target jumlah uang yang akan dikumpulkan (default 0)
 * @body {currentAmount} menetukan jumlah uang terkumpul
 * @body {programName} menetukan nama program fundraising
 * @body {programType} menetukan jenis program fundraising (donasi (default), fidyah)
 * @body {publicationDate} menetukan tanggal publikasi fundraising
 * @body {expirationDate} menetukan expired fundraising
 * @body {adminId, contributorId} menetukan pembuat fundraising (admin atau contributor) default data req.user._id
 * @description membuat campanye fundraising
 * @return {object} object fundraising (message)
 *
 */

export const createFundraising = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      title,
      description,
      targetAmount,
      programName,
      programType,
      publicationDate,
      expirationDate,
    } = req.body;

    req.user = {
      _id: "67ac5e937a52fb330d60401a",
      role: "admin",
    };
    const UserModel = req.user.role === "admin" ? Admin : Contributor;

    const [imageOptimize, users] = await Promise.all([
      workerPool.worker("imageOptimized", {
        file: req.file,
        options: {
          quality: 60,
          programName: programType === "donasi" ? "donasi" : programType,
        },
      }),
      UserModel.findById(req.user._id).select("_id").lean(),
    ]);

    if (!imageOptimize || !users) {
      return next(
        createErrorHandler(400, "Tidak dapat membuat campanye fundraising")
      );
    }

    const [fundraising] = await Fundraising.create(
      [
        {
          title,
          targetAmount,
          currentAmount: 0,
          programName,
          programType,
          publicationDate: new Date(publicationDate),
          expirationDate: new Date(expirationDate),
          adminId: users._id,
        },
      ],
      { session }
    );

    const imageUrl = `${
      req.protocol || req.get("x-forwarded-proto")
    }://${req.get("host")}${pathToUrl(imageOptimize.output)}`;

    if (!imageUrl) {
      return next(createErrorHandler(400, "Gambar tidak ditemukan"));
    }

    const [desc, image] = await Promise.all([
      Description.create(
        [
          {
            title: description.title,
            body: description.body,
            fundraisingId: fundraising._id,
          },
        ],
        { session }
      ),
      FundraisingImage.create(
        [
          {
            fileName: imageOptimize.filename,
            url: imageUrl,
            fundraisingId: fundraising._id,
          },
        ],
        { session }
      ),
    ]);

    await Fundraising.updateOne(
      { _id: fundraising._id },
      {
        $set: {
          description: desc[0]._id,
          image: image[0]._id,
        },
      },
      { session }
    );

    await session.commitTransaction();

    return res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Berhasil membuat fundraising",
    });

    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

/**
 *
 * @scoop {fundraising}
 * @body {title} menetukan judul fundraising
 * @body {image} menetukan gambar fundraising
 * @body {description} menetukan deskripsi fundraising
 * @body {targetAmount} menetukan target jumlah uang yang akan dikumpulkan (default 0)
 * @body {currentAmount} menetukan jumlah uang terkumpul
 * @body {programName} menetukan nama program fundraising
 * @body {programType} menetukan jenis program fundraising (donasi (default), fidyah)
 * @body {publicationDate} menetukan tanggal publikasi fundraising
 * @body {expirationDate} menetukan expired fundraising
 * @body {adminId, contributorId} menetukan editor fundraising (admin atau contributor) default data req.user.id
 * @description mengedit campanye fundraising
 * @return {object} object fundraising (message)
 *
 */

export const updateFundraising = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.query;
    const {
      title,
      description,
      targetAmount,
      programName,
      programType,
      publicationDate,
      expirationDate,
    } = req.body;

    const existingFundraising = await Fundraising.findById({ _id: id })
      .select("_id image description")
      .lean();

    if (!existingFundraising) {
      return next(createErrorHandler(404, "Fundraising tidak ditemukan"));
    }

    let imageData = null;
    if (req.file) {
      const [imageOptimize] = await Promise.all([
        workerPool.worker("imageOptimized", {
          file: req.file,
          options: {
            quality: 60,
            programName: programType === "donasi" ? "donasi" : programType,
          },
        }),
      ]);

      const imageUrl = `${
        req.protocol || req.get("x-forwarded-proto")
      }://${req.get("host")}${pathToUrl(imageOptimize.output)}`;

      imageData = {
        fileName: imageOptimize.filename,
        url: imageUrl,
      };
    }

    const updateData = {
      ...(title && { title }),
      ...(targetAmount && { targetAmount }),
      ...(programName && { programName }),
      ...(programType && { programType }),
      ...(publicationDate && { publicationDate: new Date(publicationDate) }),
      ...(expirationDate && { expirationDate: new Date(expirationDate) }),
    };

    await Fundraising.findByIdAndUpdate(id, { $set: updateData }, { session });

    if (description) {
      await Description.findOneAndUpdate(
        { fundraisingId: id },
        {
          $set: {
            title: description.title,
            body: description.body,
          },
        },
        { session, upsert: true }
      );
    }

    if (imageData) {
      await FundraisingImage.findOneAndUpdate(
        { fundraisingId: id },
        {
          $set: {
            fileName: imageData.fileName,
            url: imageData.url,
          },
        },
        { session, upsert: true }
      );
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Berhasil mengupdate fundraising",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
