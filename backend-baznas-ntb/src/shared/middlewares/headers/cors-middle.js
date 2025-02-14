import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

/**
 *
 * @scoop {user}
 * @params {Object} menetukan opsi middleware cors
 * @description fungsi middleware cors
 * @return {object} data
 *
 */

const middCors = cors({
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
});

export default middCors;
