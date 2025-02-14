import Role from "../models/role-model.js";
import Permission from "../models/permission-model.js";
import Contributor from "../models/contributor-model.js";
import workerPool from "#root/src/workers/worker-pool.js";
import createErrorHandler from "#root/src/shared/utils/errors/error-hendler.js";

/**
 *
 * @scoop {contributor}
 * @body {name} menetukan email contributor
 * @body {email} menetukan email contributor
 * @body {password} menetukan password contributor
 * @body {role} menetukan role contributor
 * @body {permission} menetukan permission contributor (array)
 * @description membuat akun contributor
 * @return {object} data contributor name
 *
 */

export default async function createContributor(req, res, next) {
  const { name, email, password, role, permission } = req.body;

  const [isRole, isPermission, passHash] = await Promise.all([
    Role.find().select("name -_id").lean(),
    Permission.find().select("name -_id").lean(),
    workerPool.worker("hashed", { data: password }),
  ]);

  const isRoleValid = isRole.map((r) => r.name).includes(role);
  const isPermissionValid = isPermission.map((p) => p.name).includes(role);

  // logic register contributor

  try {
  } catch (error) {
    next(error);
  }
}
