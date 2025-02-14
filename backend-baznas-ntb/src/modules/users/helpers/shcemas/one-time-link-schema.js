import { z } from "zod";

/**
 *
 * @scoop {user}
 * @description schema validasi data one time link login admin
 * @return {object} data
 *
 */

const oneTimeLinkSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Email wajib diisi")
      .email("Email tidak valid, mohon masukkan email valid")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Format email tidak valid"
      )
      .toLowerCase(),
  })
  .strict();
export default oneTimeLinkSchema;
