/**
 *
 * @scoop {user}
 * @body {req} untuk menentuan host
 * @body {token} menetukan token otl
 * @description generate link login
 * @return {String} data link
 *
 */

export function generateLink(req, token) {
  return new Promise(function (resolve, recject) {
    try {
      const protocol = req.get("x-forwarded-proto") || req.protocol;
      const links = `${protocol}://${req.get(
        "host"
      )}/v1/login/verify?otl_token=${token}`;
      resolve(links);
    } catch (error) {
      recject(error);
    }
  });
}
