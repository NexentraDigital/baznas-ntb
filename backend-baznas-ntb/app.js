import app from "./src/index.js";
import dotenv from "dotenv";
import path from "path";

const envPath =
  process.env.APP_ENV === "production" ? ".env.production" : ".env.development";

dotenv.config({ path: envPath });

app.listen(process.env.PORT, () => {
  console.log("Ok! || ✅ http://localhost:" + process.env.PORT);
});
