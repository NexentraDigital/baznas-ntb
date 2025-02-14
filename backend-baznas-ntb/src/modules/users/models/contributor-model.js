import mongoose from "mongoose";
const { Schema, model } = mongoose;
import Admin from "./admin-model.js";

/**
 *
 * @scoop {user}
 * @description model schema contributor
 * @return {object} data
 *
 */

const contributorSchema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    adminId: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    timestamps: true,
    indexes: [
      { name: 1 },
      { adminId: 1 },
      { position: 1 },
      { name: 1, email: 1 },
      { name: 1, position: 1 },
    ],
  }
);

contributorSchema.pre("find", function () {
  this.populate("role");
  this.populate("adminId");
});

contributorSchema.post("sace", async function (doc) {
  if (doc) {
    await Admin.findByIdAndUpdate(doc.adminId, {
      $push: { contributorId: doc._id },
    });
  }
});

contributorSchema.post("remove", async function (doc) {
  if (doc) {
    await Admin.findByIdAndUpdate(doc.adminId, {
      $pull: { contributorId: doc._id },
    });
  }
});

const Contributor = model("Contributor", contributorSchema);
export default Contributor;
