import express from "express";
import {
  oneTimeLink,
  loginVerify,
} from "../../controllers/admin/admin-auth-controller.js";

const adminRoute = express();

adminRoute.route("/login").post(oneTimeLink);
adminRoute.route("/login/verify").post(loginVerify);

export default adminRoute;
