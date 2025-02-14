import mongoose from "mongoose";
const { Schema, model } = mongoose;
import Role from "./role-model.js";

/**
 *
 * @scoop {user}
 * @description model schema permission
 * @return {object} data
 *
 */

const permissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String, default: null },
    role: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
    indexes: [{ name: 1 }, { roleId: 1 }, { name: 1, roleId: 1 }],
  }
);

permissionSchema.post("save", async function (doc) {
  if (doc) {
    await Role.findByIdAndUpdate(doc.role, {
      $push: { permission: doc._id },
    });
  }
});

permissionSchema.post("remove", async function (doc) {
  if (doc) {
    await Role.findByIdAndUpdate(doc.roleId, {
      $pull: { permission: doc._id },
    });
  }
});

const Permission = model("Permission", permissionSchema);
export default Permission;
