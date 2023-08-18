import { CacheTypes, getCacheName } from "./cacheRule";
import { redisClient } from "./redis";

export const CacheManager = {
  async get(type: CacheTypes, key: string) {
    return await redisClient.get(getCacheName(type, key));
  },

  async set(type: CacheTypes, key: string, data: string) {
    return await redisClient.set(getCacheName(type, key), data);
  },
};
