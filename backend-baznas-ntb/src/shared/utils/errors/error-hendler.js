import createHttpError from "http-errors";

/**
 * @scoop {global}
 * @description Function error handler
 * @param {Number, String, Object } status, message, options
 * @return {Object} data error
 */

export default function createErrorHandler(status, message, options = {}) {
  return createHttpError(status, message, { ...options });
}
