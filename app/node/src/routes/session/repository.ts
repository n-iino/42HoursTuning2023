import { RowDataPacket } from "mysql2";
import pool from "../../util/mysql";
import { Session } from "../../model/types";
import { convertDateToString } from "../../model/utils";
import { CacheManager } from "../../util/redis/cacheManager";

export const getSessionByUserId = async (
  userId: string
): Promise<Session | undefined> => {
  const cacheSessionStr = await CacheManager.get("sessionByUserId", userId);

  if (cacheSessionStr) {
    const cacheSession = JSON.parse(cacheSessionStr);

    return {
      sessionId: cacheSession[0].session_id,
      userId: cacheSession[0].linked_user_id,
      createdAt: cacheSession[0].created_at,
    };
  }

  const [session] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM session WHERE linked_user_id = ?",
    [userId]
  );
  if (session.length === 0) {
    return;
  }

  await CacheManager.set("sessionByUserId", userId, JSON.stringify(session));

  return {
    sessionId: session[0].session_id,
    userId: session[0].linked_user_id,
    createdAt: convertDateToString(session[0].created_at),
  };
};

export const createSession = async (
  sessionId: string,
  userId: string,
  now: Date
) => {
  await pool.query(
    "INSERT INTO session (session_id, linked_user_id, created_at) VALUES (?, ?, ?)",
    [sessionId, userId, now]
  );
};

export const getSessionBySessionId = async (
  sessionId: string
): Promise<Session | undefined> => {
  const cacheSessionStr = await CacheManager.get(
    "sessionBySessionId",
    sessionId
  );

  if (cacheSessionStr) {
    const cacheSession = JSON.parse(cacheSessionStr);

    return {
      sessionId: cacheSession[0].session_id,
      userId: cacheSession[0].linked_user_id,
      createdAt: cacheSession[0].created_at,
    };
  }

  const [session] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM session WHERE session_id = ?",
    [sessionId]
  );
  if (session.length === 0) {
    return;
  }

  await CacheManager.set(
    "sessionBySessionId",
    sessionId,
    JSON.stringify(session)
  );

  return {
    sessionId: session[0].session_id,
    userId: session[0].linked_user_id,
    createdAt: convertDateToString(session[0].created_at),
  };
};

export const deleteSessions = async (userId: string) => {
  await pool.query("DELETE FROM session WHERE linked_user_id = ?", [userId]);
};
