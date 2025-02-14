import compression from "compression";

/**
 *
 * @scoop {user}
 * @params {Object} menetukan opsi middleware compression
 * @description fungsi middleware compression
 * @return {object} data
 *
 */

const middCompression = compression({
  level: 9,
  threshold: 10,
  filter: async (req, res) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  },
});

export default middCompression;
