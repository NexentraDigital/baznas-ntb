import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import Admin from "#root/src/modules/users/models/admin-model.js";
import Contributor from "#root/src/modules/users/models/contributor-model.js";
import createErrorHandler from "#root/src/shared/utils/errors/error-hendler.js";

dotenv.config();

/**
 *
 * @scoop {global}
 * @headers {token} menetukan auth
 * @description fungsi middleware protect users dan token jwt
 * @return {object} data
 *
 */

export default async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers?.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw createErrorHandler(
        401,
        "Opss..kami tidak dapat meneruskan permintaan anda"
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const users =
      decoded.role === "super_admin"
        ? await Admin.findById(decoded.id).populate({
            path: "role",
            seelect: "name -_id",
            populate: {
              path: "permission",
              select: "name -_id",
            },
          })
        : decoded.role === "contributor"
        ? await Contributor.findById().populate({
            path: "role",
            seelect: "name -_id",
            populate: {
              path: "permission",
              select: "name -_id",
            },
          })
        : null;

    req.user = users;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @scoop {global}
 * @params {Object} menetukan role yang diizinkan
 * @description fungsi protect role
 * @return {object} data
 *
 */

export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role?.name;
    if (!allowedRoles.includes(userRole)) {
      throw createErrorHandler(403, "Akses tidak diizinkan untuk role anda");
    }
    next();
  };
};

/**
 *
 * @scoop {global}
 * @params {Object} menetukan permission yang diizinkan
 * @description fungsi protect permission
 * @return {object} data
 *
 */

export const checkPermission = (requiredPermissions) => {
  return (req, res, next) => {
    const userPermissions = req.user?.role?.permissions.map((p) => p.name);
    const hasPermission = requiredPermissions.every((p) =>
      userPermissions.includes(p)
    );

    if (!hasPermission) {
      throw createErrorHandler(403, "Anda tidak memiliki izin yang cukup");
    }
    next();
  };
};
