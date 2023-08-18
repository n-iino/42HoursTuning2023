export type CacheTypes = "sessionByUserId" | "sessionBySessionId";

export const getCacheName = (type: CacheTypes, key: string) => {
  return type + key;
};
