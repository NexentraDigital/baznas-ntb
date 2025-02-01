import { ZodError } from "zod";
import createErrorHandler from "../../utils/errors/error-hendler.js";

/**
 * @scoop {global}
 * @description Validasi all input
 * @return {object} data
 */

export default function validationInput(schema, data = {}) {
  try {
    return schema.parseAsync(data);
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.errors.map((e) => ({
        message: e.message,
        path: e.path,
      }));

      throw createErrorHandler(400, "Validasi Error", { error: errors });
    }
    throw createErrorHandler(
      500,
      "Opps.. server gangguan, mohon cobalagi nanti"
    );
  }
}
