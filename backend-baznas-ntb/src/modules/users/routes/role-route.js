import express from "express";
import {
  getRoleUsers,
  searchRoleUsers,
  updateRoleUsers,
  deleteRoleUsers,
  createRoleUsers,
  getRoleUsersById,
} from "../controllers/role-controller.js";
import roleSchema from "../helpers/shcema/role-schema.js";
import querySchema from "../../../shared/schemas/query-schema.js";
import paramsSchema from "../../../shared/schemas/params-schema.js";
import { validationInput } from "#root/src/shared/middlewares/validations/validation-input.js";

const roleRouter = express();

/**
 *
 * @scoop {user}
 * @middleare {query} menentukan query validasi
 * @description route get mendapatkan semua data role
 * @return {object} data
 *
 */

roleRouter
  .route("/roles")
  .get(validationInput({ query: querySchema }), getRoleUsers);

/**
 *
 * @scoop {user}
 * @middleare {query} menentukan query validasi
 * @description route get mendapatkan data role by id
 * @return {object} data
 *
 */

roleRouter
  .route("/roles/:id")
  .get(validationInput({ params: paramsSchema }), getRoleUsersById);

/**
 *
 * @scoop {user}
 * @middleare {query} menentukan query validasi
 * @description route get search role
 * @return {object} data
 *
 */

roleRouter
  .route("/view/roles")
  .get(validationInput({ query: querySchema }), searchRoleUsers);

/**
 *
 * @scoop {user}
 * @middleare {body} menentukan body validasi
 * @description route post membuat role
 * @return {object} data
 *
 */

roleRouter
  .route("/role/create")
  .post(validationInput({ body: roleSchema }), createRoleUsers);

/**
 *
 * @scoop {user}
 * @middleare {query} menentukan query validasi
 * @middleare {body} menentukan body validasi
 * @description route patch mengupdate role
 * @return {object} data
 *
 */

roleRouter
  .route("/role/update")
  .patch(
    validationInput({ body: roleSchema, query: querySchema }),
    updateRoleUsers
  );

/**
 *
 * @scoop {user}
 * @middleare {query} menentukan query validasi
 * @description route delete menghapus role
 * @return {object} data
 *
 */

roleRouter
  .route("/role/delete")
  .delete(validationInput({ query: querySchema }), deleteRoleUsers);

export default roleRouter;
