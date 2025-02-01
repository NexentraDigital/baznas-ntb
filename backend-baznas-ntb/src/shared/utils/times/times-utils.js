export function expiredAt({ minutes = 0, hours = 0, days = 0 } = {}) {
  const now = Date.now();
  const expired = now + (minutes * 60 + hours * 3600 + days * 86400) * 1000;
  return expired;
}

export function convertToISODate(datetime) {
  return new Date(datetime).toISOString();
}

export function checkExpiredTime(expiredAt) {
  return new Promise((resolve, reject) => {
    try {
      const expired = new Date(expiredAt);
      const isNow = new Date();

      if (isNow > expired) {
        resolve(true);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
}
