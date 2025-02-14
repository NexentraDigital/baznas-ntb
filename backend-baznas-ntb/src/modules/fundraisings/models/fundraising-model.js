import { Schema, model } from "mongoose";
import Description from "./fundraising-description-model.js";
import FundraisingImage from "./fundraising-image-model.js";

const fundraisingSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    image: { type: Schema.Types.ObjectId, ref: "FundraisingImage" },
    description: {
      type: Schema.Types.ObjectId,
      ref: "Description",
    },
    distribution: [{ type: Schema.Types.ObjectId, ref: "Distribution" }],
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, required: true },
    programName: { type: String, required: true, index: true },
    programType: {
      type: String,
      enum: {
        values: ["donasi", "fidyah"],
        message: "{VALUE} tidak valid",
      },
      default: "donasi",
      index: true,
      set: function (value) {
        return value.trim().toLowerCase();
      },
    },
    publicationDate: { type: Date, index: true, default: Date.now },
    expirationDate: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: {
        values: ["panding", "approved", "rejected"],
        message: "{VALUE} tidak valid",
      },
      default: "panding",
      index: true,
      set: function (value) {
        return value.trim().toLowerCase();
      },
    },
    transaction: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
    adminId: { type: Schema.Types.ObjectId, ref: "Admin", index: true },
    contributorId: {
      type: Schema.Types.ObjectId,
      ref: "Contributor",
      index: true,
    },
  },
  { timestamps: true }
);

const Fundraising = model("Fundraising", fundraisingSchema);
export default Fundraising;
