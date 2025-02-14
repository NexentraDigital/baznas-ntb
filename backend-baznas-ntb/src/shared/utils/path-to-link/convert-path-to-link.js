export const pathToUrl = (filePath) => {
  if (!filePath) throw new Error("File path is required");
  const relativePath = filePath.split("public")[1].replace(/\\/g, "/");
  return `/static${relativePath}`;
};
