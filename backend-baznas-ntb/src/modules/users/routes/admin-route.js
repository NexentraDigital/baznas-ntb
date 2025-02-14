import express from "express";
import querySchema from "#root/src/shared/schemas/query-schema.js";
import loginAdminSchema from "#modules/users/helpers/shcema/login-admin-schema.js";
import { validationInput } from "#shared/middlewares/validation/validation-input.js";
import oneTimeLinkSchema from "#modules/users/helpers/shcema/one-time-link-schema.js";
import {
  getAdminById,
  oneTimeLinkAdmin,
  loginVerify,
} from "../controllers/admin-controller.js";

const adminRoutes = express();

/**
 *
 * @scoop {user}
 * @middleare {query} menentukan query validasi
 * @description route get all admin
 * @return {object} data
 *
 */

adminRoutes
  .route("/")
  .get(validationInput({ query: querySchema }), getAdminById);

/**
 *
 * @scoop {user}
 * @middleare {body} menentukan body validasi
 * @description route post mendapatkan link login admin
 * @return {object} data
 *
 */

adminRoutes
  .route("/login")
  .post(validationInput({ body: oneTimeLinkSchema }), oneTimeLinkAdmin);

/**
 *
 * @scoop {user}
 * @middleare {body} menentukan query validasi
 * @description route post login admin
 * @return {object} data
 *
 */

adminRoutes
  .route("/login/verify")
  .post(validationInput({ body: loginAdminSchema }), loginVerify);

export default adminRoutes;
