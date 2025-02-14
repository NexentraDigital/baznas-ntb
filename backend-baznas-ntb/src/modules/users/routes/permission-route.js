import express from "express";
import {
  getAllPermission,
  updatePermission,
  getPermissionById,
  deletePermissionFromRole,
  createPermissionRoleUsers,
  createNewPermissionRoleUsers,
} from "../controllers/permission-controller.js";
import querySchema from "../../../shared/schemas/query-schema.js";
import paramsSchema from "../../../shared/schemas/params-schema.js";
import permissionSchema from "../helpers/shcema/permission-schema.js";
import newPermissionSchema from "../helpers/shcema/new-permission-schema.js";
import { validationInput } from "#root/src/shared/middlewares/validations/validation-input.js";

const permissionRouter = express();

/**
 *
 * @scoop {user}
 * @middleare {query} menentukan query validasi
 * @description route get mendapatkan semua data permission
 * @return {object} data
 *
 */

permissionRouter
  .route("/permissions")
  .get(validationInput({ query: querySchema }), getAllPermission);

/**
 *
 * @scoop {user}
 * @middleare {params} menentukan params validasi
 * @description route get mendapatkan data permission by id
 * @return {object} data
 *
 */

permissionRouter
  .route("/permission/:id")
  .get(validationInput({ params: paramsSchema }), getPermissionById);

/**
 *
 * @scoop {user}
 * @middleare {query} menentukan query validasi
 * @description route patch mengupdate permisiion
 * @return {object} data
 *
 */

permissionRouter
  .route("/permission/update")
  .patch(validationInput({ query: querySchema }), updatePermission);

/**
 *
 * @scoop {user}
 * @middleare {query} menentukan query validasi
 * @middleare {body} menentukan body validasi
 * @description route post membuat permission baru (permission belom ada didatabase)
 * @return {object} data
 *
 */

permissionRouter
  .route("/permission/create/new")
  .post(
    validationInput({ body: newPermissionSchema, query: querySchema }),
    createNewPermissionRoleUsers
  );

/**
 *
 * @scoop {user}
 * @middleare {query} menentukan query validasi
 * @middleare {body} menentukan body validasi
 * @description route post mengaktifkan permission pada role
 * @return {object} data
 *
 */

permissionRouter
  .route("/permission/create")
  .post(
    validationInput({ body: permissionSchema, query: querySchema }),
    createPermissionRoleUsers
  );

/**
 *
 * @scoop {user}
 * @middleare {query} menentukan query validasi
 * @middleare {body} menentukan body validasi
 * @description route post menonaktifkan permission pada role
 * @return {object} data
 *
 */

permissionRouter
  .route("/permission/non-active")
  .patch(
    validationInput({ body: permissionSchema, query: querySchema }),
    deletePermissionFromRole
  );

export default permissionRouter;
