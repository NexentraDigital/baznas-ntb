import { z } from "zod";

/**
 *
 * @scoop {user}
 * @description schema validasi data login admin
 * @return {object} data
 *
 */

const loginAdminSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Email tidak valid, mohon masukkan email valid")
      .regex(/^[a-zA-Z0-9@.\s]+$/),
    password: z
      .string()
      .min(1, "Password wajib diisi")
      .regex(/^[a-zA-Z0-9.@#$!*&]+$/),
  })
  .strict();

export default loginAdminSchema;
