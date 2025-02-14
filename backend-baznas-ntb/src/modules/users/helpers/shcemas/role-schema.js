import { z } from "zod";

/**
 *
 * @scoop {user}
 * @description schema validasi data role
 * @return {object} data
 *
 */

const roleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .regex(/^[a-zA-Z]+$/, "Format name tidak valid")
    .toLowerCase(),
  description: z.string().trim().optional(),
});

export default roleSchema;
