import prisma from "../../../../configs/db.js";

/**
 * @scoop {User}
 * @param {string, string, object} collection, id, select
 * @return {object or null} Jika ada return data, jika tidak return null
 *
 * */

export function updatedById(collection, id = null, datas = {}) {
  return prisma[collection].update({
    where: {
      id: id,
    },
    data: {
      ...datas,
    },
  });
}

export function updatedManyById(collection, id = null, datas = {}) {
  return prisma[collection].updateMany({
    where: {
      id: id,
    },
    data: {
      ...datas,
    },
  });
}
