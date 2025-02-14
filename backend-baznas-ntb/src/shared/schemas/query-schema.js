import { z } from "zod";

/**
 *
 * @scoop {global}
 * @params {Object} menetukan chema query
 * @description membuat schema query
 * @return {object} data
 *
 */

const querySchema = z.object({
  otl_token: z
    .string()
    .trim()
    .min(1, "Token wajib diisi")
    .regex(/^[a-z0-9]+$/, "Invalid token")
    .optional(),
  sort: z.string().optional(),
  src: z.string().trim().optional(),
  expiresIn: z.string().trim().optional(),
  id: z
    .string()
    .trim()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid params id")
    .optional(),
  limit: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
});

export default querySchema;
