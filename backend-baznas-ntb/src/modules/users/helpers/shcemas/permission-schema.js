import { z } from "zod";

/**
 *
 * @scoop {user}
 * @description schema validasi data permission
 * @return {object} data
 *
 */

const permissionSchema = z.object({
  name: z.array(
    z
      .string()
      .trim()
      .min(1, "Name wajib diisi")
      .regex(/^[a-z_]+$/, "Format name tidak valid")
      .toLowerCase()
  ),
  description: z.string().trim().optional(),
});

export default permissionSchema;
