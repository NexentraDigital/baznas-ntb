import path from "path";
import morgan from "morgan";
import express from "express";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import dbConnect from "./configs/db.js";
import cookieParser from "cookie-parser";
import roleRouter from "./modules/users/routes/role-route.js";
import adminRoutes from "./modules/users/routes/admin-route.js";
import middCors from "#shared/middlewares/headers/cors-middle.js";
import middHeader from "#shared/middlewares/headers/header-middle.js";
import permissionRouter from "./modules/users/routes/permission-route.js";
import contributorRouter from "./modules/users/routes/contributor-route.js";
import middRateLimiter from "#shared/middlewares/rate-limite/rate-limit.js";
import middCompression from "#shared/middlewares/headers/compression-middle.js";
import fundraisingRoute from "./modules/fundraisings/routers/fundraising-route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use("/static", express.static(path.join(__dirname, "../public/")));
dbConnect();

app.disable("x-powered-by'");
app.use(middCompression);
app.use(middCors);
app.use(cookieParser());
app.use(middHeader);
app.use(middRateLimiter());
app.use(morgan("tiny"));

/**
 *
 * @scope {global}
 * @description Route untuk semua router
 *
 */

app.use("/v1/", adminRoutes);
app.use("/v1/", contributorRouter);
app.use("/v1/", roleRouter);
app.use("/v1/", permissionRouter);
app.use("/v1/", fundraisingRoute);

/**
 *
 * @scope {global}
 * @description Error Handler
 * @param {Error} error
 * @returns {Object} data error
 *
 */

app.use(function (err, req, res, next) {
  switch (err.name) {
    case "TypeError" || "PrismaClientInitializationError" || "SyntaxError":
      res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Opps.. server mengalami gangguan",
        name: err.name,
      });
      break;

    default:
      const statusCode = err.status || 500;
      res.status(statusCode).json({
        status: "error",
        statusCode: statusCode,
        message: err.message ?? "Opps.. server gangguan, mohon cobalagi nanti",
        name: err.name,
        error: err.error ?? null,
      });
      break;
  }
});

export default app;
