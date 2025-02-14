import mongoose from "mongoose";
const { Schema, model } = mongoose;
import Admin from "./admin-model.js";
import Contributor from "./contributor-model.js";

/**
 *
 * @scoop {user}
 * @description model schema role
 * @return {object} data
 *
 */

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String, default: null },
    permission: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    contributorId: {
      type: Schema.Types.ObjectId,
      ref: "Contributor",
    },
  },
  {
    timestamps: true,
  }
);

roleSchema.index({ _id: "text", name: "text", description: "text" });

roleSchema.index({ name: -1, adminId: -1 });
roleSchema.index({ name: -1, contributorId: -1 });

roleSchema.post("save", async function (doc) {
  if (doc) {
    await Admin.findByIdAndUpdate(doc.adminId, {
      $push: { role: doc._id },
    });
  }
});

roleSchema.post("save", async function (doc) {
  if (doc) {
    await Contributor.findByIdAndUpdate(doc.contributorId, {
      $push: { role: doc._id },
    });
  }
});

roleSchema.post("remove", async function (doc) {
  if (doc) {
    await Admin.findByIdAndUpdate(doc.adminId, {
      $pull: { role: doc._id },
    });
  }
});

roleSchema.post("remove", async function (doc) {
  if (doc) {
    await Contributor.findByIdAndUpdate(doc.contributorId, {
      $pull: { role: doc._id },
    });
  }
});

const Role = model("Role", roleSchema);
export default Role;
