import express from "express";
import querySchema from "#root/src/shared/schemas/query-schema.js";
import { uploadSingle } from "#root/src/shared/middlewares/image/image-middle.js";
import createFundraisingSchema from "../helpers/schemas/create-fundraising-schema.js";
import { validationInput } from "#root/src/shared/middlewares/validation/validation-input.js";
import {
  createFundraising,
  getAllFundraising,
  getFundraisingById,
  updateFundraising,
} from "../controllers/fundraising-controller.js";
import paramsSchema from "#root/src/shared/schemas/params-schema.js";

const fundraisingRoute = express();

fundraisingRoute
  .route("/fundraisings")
  .get(validationInput({ query: querySchema }), getAllFundraising);
fundraisingRoute
  .route("/fundraising/:id")
  .get(
    validationInput({ params: paramsSchema }),
    uploadSingle("none"),
    getFundraisingById
  );
fundraisingRoute
  .route("/fundraising/create")
  .post(
    uploadSingle("image"),
    validationInput({ body: createFundraisingSchema }),
    createFundraising
  );

fundraisingRoute
  .route("/fundraising/update")
  .patch(
    uploadSingle("image"),
    validationInput({ query: querySchema, body: createFundraisingSchema }),
    updateFundraising
  );

export default fundraisingRoute;
