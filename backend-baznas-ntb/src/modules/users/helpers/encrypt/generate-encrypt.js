import bcrypt from "bcrypt";

export function hashing(data, salt = 10) {
  return bcrypt.hash(data, salt);
}

export function compareHash(password, encrypt) {
  return bcrypt.compare(password, encrypt);
}
