import Role from "../models/role-model.js";
import Permission from "../models/permission-model.js";
import createErrorHandler from "#root/src/shared/utils/errors/error-hendler.js";

/**
 *
 * @scoop {permission}
 * @body {name} menetukan nama permission yang diedit
 * @body {description} menetukan deskripsi permission yang diedit
 * @description mengedit data permission
 * @return {object} message permission
 *
 */

export async function getAllPermission(req, res, next) {
  try {
    const { page, limit, src } = req.query;

    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skips = (pages - 1) * limits;

    const sorting = src === "asc" ? 1 : src === "dsc" ? -1 : 1;

    const [permission, total] = await Promise.all([
      Permission.find()
        .select("_id name description")
        .populate({
          path: "role",
          select: "_id name description",
        })
        .skip(skips)
        .sort({ name: sorting })
        .limit(limit)
        .lean(),
      Permission.countDocuments(),
    ]);

    res.status(200).json({
      success: "success",
      message: "View permission",
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
      data: permission,
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @scoop {permission}
 * @params {id} menetukan id permission
 * @description mendapatkan data permission berdasarkan id (id, name, description, role)
 * @return {object} data permission
 *
 */
export async function getPermissionById(req, res, next) {
  try {
    const { id } = req.params;

    const [permission, total] = await Promise.all([
      Permission.findById({ _id: id })
        .select("_id name description")
        .populate({
          path: "role",
          select: "_id name description",
        })
        .lean()
        .limit(1),
      Permission.countDocuments({ _id: id }),
    ]);

    res.status(200).json({
      success: "success",
      message: "View roles",
      total: total,
      data: permission,
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @scoop {permission}
 * @body {name} menetukan nama permission yang diedit
 * @body {description} menetukan deskripsi permission yang diedit
 * @description mengedit data permission
 * @return {object} message permission
 *
 */

export async function updatePermission(req, res, next) {
  const { id } = req.query;
  const { name, description } = req.body;

  const permission = await Role.findByIdAndUpdate(
    {
      _id: id,
    },
    { name: name, description: description },
    { new: true }
  );

  if (!permission) {
    return next(
      createErrorHandler(400, "Opps.. terjadi kesalahan, coba lagi nanti")
    );
  }

  res.status(200).json({
    success: "success",
    message: "Permission berhasil diedit",
  });
}

/**
 *
 * @scoop {permission}
 * @body {name} menetukan nama permisisan role
 * @body {description} menetukan deskripsi permission role
 * @description membuat data permission di masing-masing role
 * @return {object} message permission role
 *
 */

export async function createNewPermissionRoleUsers(req, res, next) {
  const { id } = req.query;
  const { name, description } = req.body;

  const role = await Role.findById({ _id: id }).select("_id").limit(1).lean();

  if (!role) {
    return next(createErrorHandler(404, "Id role tidak ditemukan"));
  }

  const isPermission = await Permission.findOne({ name });
  if (isPermission) {
    return next(createErrorHandler(400, "Permission sudah ada"));
  }

  const permisisan = await Permission.create({
    name,
    description,
    role: role._id,
  });
  if (!permisisan) {
    return next(
      createErrorHandler(400, "Opps.. terjadi kesalahan, coba lagi nanti")
    );
  }

  res.status(201).json({
    success: "success",
    message: "Permission berhasil dibuat",
  });
}

/**
 *
 * @scoop {role}
 * @body {name} menetukan nama permisisan role dalam bentuk array
 * @description menetukan permission dari masing-masing role
 * @return {object} message permission role
 *
 */

export async function createPermissionRoleUsers(req, res, next) {
  try {
    const { id } = req.query;
    const { name } = req.body;

    const [isRole, isPermission] = await Promise.all([
      Role.findById(id).select("_id").lean(),
      Permission.find({ name: { $in: name } })
        .select("_id name")
        .lean(),
    ]);

    if (!isRole || isPermission.length === 0) {
      return next(
        createErrorHandler(404, "Id role atau permission tidak ditemukan")
      );
    }

    const existingNames = new Set(isPermission.map((perm) => perm.name));
    const missingPermissions = name.filter((perm) => !existingNames.has(perm));

    if (missingPermissions.length > 0) {
      return next(
        createErrorHandler(
          400,
          `Permissions berikut tidak ditemukan: ${missingPermissions.join(
            ", "
          )}`
        )
      );
    }

    const permissionIds = isPermission.map((perm) => perm._id);
    const permissionUpdateResult = await Permission.bulkWrite(
      name.map((perm) => ({
        updateOne: {
          filter: { name: perm },
          update: { $addToSet: { role: isRole._id } },
          upsert: true,
        },
      }))
    );

    if (permissionUpdateResult.modifiedCount > 0) {
      await Role.findByIdAndUpdate(isRole._id, {
        $addToSet: { permission: { $each: permissionIds } },
      });
    }

    res.status(201).json({
      success: "success",
      message: "Permission berhasil dibuat",
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @scoop {role}
 * @body {name} menetukan permisisan role yang di hapus dalam bentuk array
 * @description menonaktifkan permission dari masing-masing role
 * @return {object} message permission role
 *
 */

export async function deletePermissionFromRole(req, res, next) {
  try {
    const { id } = req.query;
    const { name } = req.body;

    const [isRole, isPermission] = await Promise.all([
      Role.findById(id).select("_id").lean(),
      Permission.find({ name: { $in: name } })
        .select("_id name")
        .lean(),
    ]);

    if (!isRole || isPermission.length === 0) {
      return next(
        createErrorHandler(404, "Id role atau permission tidak ditemukan")
      );
    }

    const permissionId = isPermission.map((perm) => perm._id);

    const updatePermission = await Permission.updateMany(
      { _id: { $in: permissionIds } },
      { $pull: { role: isRole._id } }
    );

    if (updatePermission.modifiedCount === 0) {
      return next(
        createErrorHandler(400, "Tidak ada permission yang diupdate")
      );
    }

    await Role.findByIdAndUpdate(isRole._id, {
      $pull: { permission: { $in: permissionId } },
    });

    res.status(201).json({
      success: "success",
      message: "Permission berhasil dinonaktifkan",
    });
  } catch (error) {
    next(error);
  }
}
