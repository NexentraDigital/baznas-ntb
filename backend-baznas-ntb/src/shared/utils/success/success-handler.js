export function createSuccessHandler(statusCode, message, option = {}) {
  return {
    status:"success",
    statusCode,
    message,
    data: { ...option },
  };
}
