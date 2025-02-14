import mongoose from "mongoose";
const { Schema, model } = mongoose;
import Admin from "./admin-model.js";

/**
 *
 * @scoop {user}
 * @description model schema one time link
 * @return {object} data
 *
 */

const oneTimeLinkSchema = new Schema(
  {
    token: { type: String, required: true },
    expiredAt: { type: Date, required: true },
    isUsed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    adminId: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    timestamps: true,
    indexes: [
      { token: 1 },
      { expiredAt: 1 },
      { isUsed: 1 },
      { adminId: 1 },
      { token: 1, isUsed: 1 },
      { token: 1, expiredAt: 1 },
      { createdAt: 1 },
    ],
  }
);

oneTimeLinkSchema.post("save", async function (doc) {
  if (doc) {
    await Admin.findByIdAndUpdate(doc.adminId, {
      $addToSet: { oneTimeLink: doc._id },
    });
  }
});

oneTimeLinkSchema.post("remove", async function (doc) {
  if (doc) {
    await Admin.findByIdAndUpdate(doc.adminId, {
      $pull: { oneTimeLink: doc },
    });
  }
});

const OneTimeLink = model("OneTimeLink", oneTimeLinkSchema);
export default OneTimeLink;
