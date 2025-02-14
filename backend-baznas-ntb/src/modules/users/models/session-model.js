import mongoose from "mongoose";
const { Schema, model } = mongoose;
import Admin from "./admin-model.js";
import Contributor from "./contributor-model.js";

/**
 *
 * @scoop {user}
 * @description model schema session
 * @return {object} data
 *
 */

const sessionSchema = new Schema(
  {
    ipAddress: { type: String, required: true, default: null },
    userAgent: { type: String, required: true, default: null },
    token: { type: String, required: true, unique: true, default: null },
    lastUsedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true, default: null },
    isRevoked: { type: Boolean, default: false },
    revokedAt: { type: Date, default: null },
    adminId: { type: Schema.Types.ObjectId, ref: "Admin" },
    contributorId: { type: Schema.Types.ObjectId, ref: "Contributor" },
  },
  {
    timestamps: true,
    indexes: [
      { ipAddress: 1 },
      { lastUsedAt: 1 },
      { expiresAt: 1 },
      { isRevoked: 1 },
      { adminId: 1 },
      { contributorId: 1 },
      { token: 1, isRevoked: 1 },
      { token: 1, expiresAt: 1 },
      { ipAddress: 1, lastUsedAt: 1 },
    ],
  }
);

sessionSchema.post("save", async function (doc) {
  if (doc) {
    await Admin.findByIdAndUpdate(doc.adminId, {
      $push: { sessionActive: doc._id },
    });
  }
});

sessionSchema.post("save", async function (doc) {
  if (doc) {
    await Contributor.findByIdAndUpdate(doc.contributorId, {
      $push: { sessionActive: doc._id },
    });
  }
});

sessionSchema.post("remove", async function (doc) {
  if (doc) {
    await Admin.findByIdAndUpdate(doc.adminId, {
      $pull: { sessionActive: doc._id },
    });
  }
});

sessionSchema.post("remove", async function (doc) {
  if (doc) {
    await Contributor.findByIdAndUpdate(doc.contributorId, {
      $pull: { sessionActive: doc._id },
    });
  }
});

const Session = model("Session", sessionSchema);
export default Session;
