import prisma from "../../../../configs/db.js";

/**
 * @scoop {User}
 * @param {string, string, object} collection, id, select
 * @return {object or null} Jika ada return data, jika tidak return null
 *
 * */

export function saved(collection, datas = {}) {
  return prisma[collection].create({
    data: {
      ...datas,
    },
  });
}
