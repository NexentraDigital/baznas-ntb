import { Schema, model } from "mongoose";

const distributionSchema = new Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  image: [{ type: Schema.Types.ObjectId, ref: "FundraisingImage" }],
  fundraisingId: {
    type: Schema.Types.ObjectId,
    ref: "Fundraising",
    index: true,
  },
});

const Distribution = model(
  "Distribution",
  distributionSchema
);
export default Distribution;
