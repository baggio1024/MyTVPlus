/* eslint-disable no-console, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import { AdminConfig } from './admin.types';
import { MusicPlayRecord } from './db.client';
import { KvrocksStorage } from './kvrocks.db';
import { RedisStorage } from './redis.db';
import {
  DanmakuFilterConfig,
  Favorite,
  IStorage,
  PlayRecord,
  SkipConfig,
} from './types';
import { UpstashRedisStorage } from './upstash.db';

// storage type 常量: 'localstorage' | 'redis' | 'upstash' | 'kvrocks'，默认 'localstorage'
const STORAGE_TYPE =
  (process.env.NEXT_PUBLIC_STORAGE_TYPE as
    | 'localstorage'
    | 'redis'
    | 'upstash'
    | 'kvrocks'
    | undefined) || 'localstorage';

// 创建存储实例
function createStorage(): IStorage {
  switch (STORAGE_TYPE) {
    case 'redis':
      return new RedisStorage();
    case 'upstash':
      return new UpstashRedisStorage();
    case 'kvrocks':
      return new KvrocksStorage();
    case 'localstorage':
    default:
      return null as unknown as IStorage;
  }
}

const storage = createStorage();

export const db = {
  async getFavoriteList(): Promise<Favorite[]> {
    return storage.getFavoriteList();
  },

  async addFavorite(
    animeId: string,
    animeName: string,
    animeCover: string
  ): Promise<void> {
    return storage.addFavorite(animeId, animeName, animeCover);
  },

  async removeFavorite(animeId: string): Promise<void> {
    return storage.removeFavorite(animeId);
  },

  async isFavorite(animeId: string): Promise<boolean> {
    return storage.isFavorite(animeId);
  },

  async getSkipConfig(): Promise<SkipConfig> {
    return storage.getSkipConfig();
  },

  async setSkipConfig(config: SkipConfig): Promise<void> {
    return storage.setSkipConfig(config);
  },

  async getDanmakuFilterConfig(): Promise<DanmakuFilterConfig> {
    return storage.getDanmakuFilterConfig();
  },

  async setDanmakuFilterConfig(config: DanmakuFilterConfig): Promise<void> {
    return storage.setDanmakuFilterConfig(config);
  },

  async getPlayRecord(animeId: string): Promise<PlayRecord | null> {
    return storage.getPlayRecord(animeId);
  },

  async setPlayRecord(animeId: string, record: PlayRecord): Promise<void> {
    return storage.setPlayRecord(animeId, record);
  },

  async getAllPlayRecords(): Promise<MusicPlayRecord[]> {
    return storage.getAllPlayRecords();
  },

  async clearAllPlayRecords(): Promise<void> {
    return storage.clearAllPlayRecords();
  },

  async getAdminConfig(): Promise<AdminConfig> {
    return storage.getAdminConfig();
  },

  async setAdminConfig(config: AdminConfig): Promise<void> {
    return storage.setAdminConfig(config);
  },

  async getUserInfoV2(userName: string): Promise<{
    role: 'owner' | 'admin' | 'user';
    banned: boolean;
    tags?: string[];
    oidcSub?: string;
    enabledApis?: string[];
    created_at: number;
    playrecord_migrated?: boolean;
    favorite_migrated?: boolean;
    skip_migrated?: boolean;
    last_movie_request_time?: number;
    email?: string;
    emailNotifications?: boolean;
  } | null> {
    if (storage.getUserInfoV2) {
      return storage.getUserInfoV2(userName);
    }
    return null;
  },

  async getUserEmail(userName: string): Promise<string | null> {
    if (storage.getUserEmail) {
      return storage.getUserEmail(userName);
    }
    return null;
  },

  async setUserEmail(userName: string, email: string): Promise<void> {
    if (storage.setUserEmail) {
      return storage.setUserEmail(userName, email);
    }
  },

  async getEmailNotificationPreference(userName: string): Promise<boolean> {
    if (storage.getEmailNotificationPreference) {
      return storage.getEmailNotificationPreference(userName);
    }
    return false;
  },

  async setEmailNotificationPreference(
    userName: string,
    enabled: boolean
  ): Promise<void> {
    if (storage.setEmailNotificationPreference) {
      return storage.setEmailNotificationPreference(userName, enabled);
    }
  },
};
