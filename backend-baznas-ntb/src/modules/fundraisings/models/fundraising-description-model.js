import { Schema, model } from "mongoose";
import Fundraising from "./fundraising-model.js";

const descriptionSchema = new Schema({
  title: { type: String, required: true, index: true },
  body: { type: String, required: true },
  fundraisingId: {
    type: Schema.Types.ObjectId,
    ref: "Fundraising",
    required: true,
    unique: true,
  },
});

descriptionSchema.post("save", async function (doc, next) {
  if (doc) {
    await Fundraising.findByIdAndUpdate(doc.fundraisingId, {
      description: doc._id,
    });
    next();
  }
});

descriptionSchema.post("remove", async function (doc, next) {
  if (doc) {
    await Fundraising.findByIdAndUpdate(doc.fundraisingId, {
      description: null,
    });
    next();
  }
});

const Description = model("Description", descriptionSchema);
export default Description;
