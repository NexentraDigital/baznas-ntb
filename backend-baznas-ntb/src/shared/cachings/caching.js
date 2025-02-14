import { cached } from "#root/src/configs/redis.js";

/**
 *
 * @scoop {global}
 * @description class cached data
 * @return {object} data
 *
 */

class Caching {
  constructor() {
    this.client = cached;
  }

  async get(key) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key, value, ttl = 30) {
    await this.client.set(key, JSON.stringify(value), "EX", ttl);
  }

  async del(key) {
    await this.client.del(key);
  }
  async has(key) {
    await this.client;
  }
}

export const caching = new Caching();
