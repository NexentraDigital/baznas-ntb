import { z } from "zod";

/**
 *
 * @scoop {user}
 * @description schema validasi data permission baru
 * @return {object} data
 *
 */

const newPermissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .regex(/^[a-z_]+$/, "Format name tidak valid")
    .toLowerCase(),
  description: z.string().trim().optional(),
});

export default newPermissionSchema;
