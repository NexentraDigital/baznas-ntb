export function generateLink(req, token) {
  return new Promise((resolve, recject) => {
    try {
      const links = `${req.protocol}://${req.get(
        "host"
      )}/v1/login/verify?otl_token=${token}`;
      resolve(links);
    } catch (error) {
      recject(error);
    }
  });
}
