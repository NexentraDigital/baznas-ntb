import path from "path";
import cors from "cors";
import express from "express";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import compression from "compression";
import adminRoute from "./modules/users/routes/admin/admin-auth-route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

/**
 * @description Testing with ejs
 * @routes login admin
 *
 */

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views/"));

app.get("/v1/login", (req, res) => {
  res.render("../views/pages/getlink");
});
app.get("/v1/login/verify", (req, res) => {
  const { otl_token } = req.query;
  if (!otl_token) {
    res.json("Token tidak ada");
  }
  res.render("../views/pages/login", { otl_token });
});

/**
 * @description Route untuk semua modul
 *
 * */

app.use("/v1/", adminRoute);

/**
 * @scoop {global}
 * @description Error Handler
 * @param {Error} err
 *
 */

app.use(function (err, req, res, next) {
  if (err) {
    console.log(err.stack);

    const statusCode = err.status || 500;
    res.status(statusCode).json({
      status: "error",
      statusCode: statusCode,
      message: err.message ?? "Opps.. server gangguan, mohon cobalagi nanti",
      name: err.name,
      error: err.error ?? null,
    });
  } else {
    next();
  }
});

export default app;
