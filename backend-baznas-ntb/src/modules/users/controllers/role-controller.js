import Role from "../models/role-model.js";
import createErrorHandler from "#root/src/shared/utils/errors/error-hendler.js";

/**
 *
 * @scoop {role}
 * @query {page} mengatur jumlah page untuk pagination default 1
 * @query {limit} menagtur jumlah data yang di tampilkan dalap page pagination default 10
 * @description mendapatkan semua data role (id, name, description, permission)
 * @return {object} data role
 *
 */

export async function getRoleUsers(req, res, next) {
  try {
    const { page, limit } = req.query;

    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skips = (pages - 1) * limits;

    const [roles, total] = await Promise.all([
      Role.find()
        .select("_id name description")
        .populate({
          path: "permission",
          select: "_id name description",
        })
        .skip(skips)
        .limit(limit)
        .lean(),
      Role.countDocuments(),
    ]);

    res.status(200).json({
      success: "success",
      message: "View roles",
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
      data: roles,
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @scoop {role}
 * @params {id} menetukan id role
 * @description mendapatkan data role berdasarkan id (id, name, description, permission)
 * @return {object} data role
 *
 */
export async function getRoleUsersById(req, res, next) {
  try {
    const { id } = req.params;

    const [roles, total] = await Promise.all([
      Role.findById({ _id: id })
        .select("_id name description")
        .populate({
          path: "permission",
          select: "_id name description",
        })
        .lean()
        .limit(1),
      Role.countDocuments({ _id: id }),
    ]);

    res.status(200).json({
      success: "success",
      message: "View roles",
      total: total,
      data: roles,
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @scoop {role}
 * @query {page} mengatur jumlah page untuk pagination default 1
 * @query {limit} menagtur jumlah data yang di tampilkan dalap page pagination default 10
 * @query {src} menetukan nama dan deskripsi role
 * @description mancari data role berdasarkan nama dan deskripsi
 * @return {object} data role
 *
 */

export async function searchRoleUsers(req, res, next) {
  try {
    const { page, limit, src } = req.query;
    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skips = (pages - 1) * limits;

    const searchQuery = src
      ? {
          $or: [
            { name: { $regex: src, $options: "i" } },
            { description: { $regex: src, $options: "i" } },
          ],
        }
      : {};

    const [roles, total] = await Promise.all([
      Role.find(searchQuery)
        .select("_id name description")
        .populate({
          path: "permission",
          select: "_id name description",
        })
        .skip(skips)
        .limit(limits)
        .lean(),
      Role.countDocuments(searchQuery),
    ]);

    res.status(200).json({
      success: "success",
      message: "View roles",
      pagination: {
        currentPage: pages,
        totalPages: Math.ceil(total / limits),
        totalItems: total,
        itemsPerPage: limits,
      },
      data: roles,
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @scoop {role}
 * @body {name} menetukan nama role
 * @body {description} menetukan deskripsi role
 * @description membuat data role
 * @return {object} message role
 *
 */

export async function createRoleUsers(req, res, next) {
  const { name, description } = req.body;

  const isRole = await Role.findOne({ name });
  if (isRole) {
    return next(createErrorHandler(400, "Role sudah ada"));
  }

  const role = await Role.create({ name, description });
  if (!role) {
    return next(
      createErrorHandler(400, "Opps.. terjadi kesalahan, coba lagi nanti")
    );
  }

  res.status(201).json({
    success: "success",
    message: "Role berhasil dibuat",
  });
}


/**
 *
 * @scoop {role}
 * @body {name} menetukan nama role yang diedit
 * @body {description} menetukan deskripsi role yang diedit
 * @description mengedit data role
 * @return {object} message role
 *
 */

export async function updateRoleUsers(req, res, next) {
  const { id } = req.query;
  const { name, description } = req.body;

  const role = await Role.findByIdAndUpdate(
    {
      _id: id,
    },
    { name: name, description: description },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  if (!role) {
    return next(
      createErrorHandler(400, "Opps.. terjadi kesalahan, coba lagi nanti")
    );
  }

  res.status(200).json({
    success: "success",
    message: "Role berhasil diedit",
  });
}

/**
 *
 * @scoop {role}
 * @body {name} menetukan nama role yang di delete
 * @body {description} menetukan deskripsi role yang di delete
 * @description menghapus data role
 * @return {object} message role
 *
 */

export async function deleteRoleUsers(req, res, next) {
  const { id } = req.query;

  const role = await Role.findByIdAndDelete(
    { _id: id },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  if (!role) {
    return next(
      createErrorHandler(400, "Opps.. terjadi kesalahan, coba lagi nanti")
    );
  }
  res.status(200).json({
    success: "success",
    message: "Role berhasil dihapus",
  });
}
