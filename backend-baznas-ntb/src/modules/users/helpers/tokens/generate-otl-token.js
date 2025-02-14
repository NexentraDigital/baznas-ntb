import crypto from "crypto";

/**
 *
 * @scoop {user}
 * @description generate random token
 * @return {object} data
 *
 */

export async function generateOneTimeToken() {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
}
