import express from "express";
import createContributor from "../controllers/contributor-controller.js";

const contributorRouter = express();

/**
 *
 * @scoop {user}
 * @middleare {body} menentukan body validasi
 * @description route post membuat akun contributor
 * @return {object} data
 *
 */

contributorRouter.route("/contributor/create").post(createContributor);

export default contributorRouter;
