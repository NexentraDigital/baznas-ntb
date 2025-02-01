import crypto from "crypto";

export function generateOneTimeToken() {
  return new Promise((resolve, reject) => {
    try {
      const token = crypto.randomBytes(32).toString("base64url");
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
}
