import mongoose from "mongoose";
const { Schema, model } = mongoose;

/**
 *
 * @scoop {user}
 * @description model schema admin
 * @return {object} data
 *
 */

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    createdAt: { type: Date, default: Date.now },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    oneTimeLink: [{ type: Schema.Types.ObjectId, ref: "OneTimeLink" }],
    sessionActive: { type: Schema.Types.ObjectId, ref: "Session" },
    contributorId: [{ type: Schema.Types.ObjectId, ref: "Contributor" }],
  },
  {
    timestamps: true,
    indexes: [{ createdAt: 1 }, { name: 1, email: 1 }],
  }
);

const Admin = model("Admin", adminSchema);
export default Admin;
