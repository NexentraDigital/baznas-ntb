import { Schema, model } from "mongoose";
import Fundraising from "./fundraising-model.js";

const fundraisingImageSchema = new Schema({
  fileName: { type: String, required: true, index: true },
  url: { type: String, required: true },
  fundraisingId: {
    type: Schema.Types.ObjectId,
    ref: "Fundraising",
    unique: true,
    index: true,
  },
  distributionId: {
    type: Schema.Types.ObjectId,
    ref: "Distribution",
    index: true,
  },
});

fundraisingImageSchema.post("save", async function (doc, next) {
  if (doc) {
    await Fundraising.findByIdAndUpdate(doc.fundraisingId, {
      image: doc._id,
    });
    next();
  }
});
fundraisingImageSchema.post("remove", async function (doc, next) {
  if (doc) {
    await Fundraising.findByIdAndUpdate(doc.fundraisingId, {
      $pull:{image: doc._id},
    });
    next();
  }
});
fundraisingImageSchema.post("save", async function (doc, next) {
  if (doc) {
    await Fundraising.findByIdAndUpdate(doc.distributionId, {
      $addToSet: { image: doc._id },
    });
    next();
  }
});
fundraisingImageSchema.post("remove", async function (doc, next) {
  if (doc) {
    await Fundraising.findByIdAndUpdate(doc.distributionId, {
      $pull: { image: doc._id },
    });
    next();
  }
});

const FundraisingImage = model("FundraisingImage", fundraisingImageSchema);
export default FundraisingImage;
