import { z } from "zod";

/**
 *
 * @scoop {global}
 * @params {Object} menetukan chema params
 * @description membuat schema params
 * @return {object} data
 *
 */

const paramsSchema = z
  .object({
    id: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid params id")
      .optional(),
    roleId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid params id")
      .optional(),
    userId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid params id")
      .optional(),
  })
  .strict();

export default paramsSchema;
