import prisma from "../../../../configs/db.js";

/**
 * @scoop {User}
 * @param {string, string, object} collection, id, select
 * @return {object or null} Jika ada return data, jika tidak return null
 *
 * */

export function findById(collection, id, select = {} ?? false) {
  return prisma[collection].findFirst({
    where: {
      id: id,
    },
    select: select,
  });
}

/**
 * @scoop {User}
 * @param {string, string, object} collection, email, select
 * @return {object or null} Jika ada return data, jika tidak return null
 *
 * */

export function findByEmail(collection, email, select = {} ?? false) {
  return prisma[collection.toLowerCase()].findFirst({
    where: {
      email: email,
    },
    select: select,
  });
}

/**
 * @scoop {User}
 * @param {string, string, object} collection, email, select
 * @return {object or null} Jika ada return data, jika tidak return null
 *
 * */

export function findUniqueByEmail(collection, email, select = {} ?? false) {
  return prisma[collection.toLowerCase()].findUnique({
    where: {
      email: email,
    },
    select: select,
  });
}
