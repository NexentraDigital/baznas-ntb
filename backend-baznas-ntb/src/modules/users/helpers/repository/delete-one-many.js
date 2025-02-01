import prisma from "../../../../configs/db.js";

/**
 * @scoop {User}
 * @param {string, string, object} collection, id, select
 * @return {object or null} Jika ada return data, jika tidak return null
 *
 * */

export function deletedById(collection, id = null, datas = {}) {
  return prisma[collection].delete({
    where: {
      id: id,
    },
    data: {
      ...datas,
    },
  });
}
export function deletedManyById(collection, id = null, datas = {}) {
  return prisma[collection].deleteMany({
    where: {
      id: id,
    },
    data: {
      ...datas,
    },
  });
}
