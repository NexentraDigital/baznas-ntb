import { ZodError } from "zod";
import createErrorHandler from "../../utils/errors/error-hendler.js";

/**
 *
 * @scoop {user}
 * @params {schema} menetukan object schema field
 * @description fungsi middleware validasi schema
 * @return {object} data
 *
 */
export const validationInput = (schemas) => (req, res, next) => {
  try {
    const errors = [];

    Object.entries(schemas).forEach(([key, schema]) => {
      if (!["body", "query", "params"].includes(key)) return;

      try {
        schema.parse(req[key] || {});
      } catch (error) {
        console.log(error.stack);

        if (error instanceof ZodError) {
          errors.push(
            ...error.errors.map((e) => ({
              field: key,
              message: e.message,
              path: e.path,
            }))
          );
        }
      }
    });

    if (errors.length > 0) {
      return next(createErrorHandler(400, "Validasi error", { errors }));
    }

    next();
  } catch (error) {
    next(createErrorHandler(500, "Internal server error"));
  }
};
