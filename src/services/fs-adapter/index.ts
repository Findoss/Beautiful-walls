import type { StorageAdapter } from './types';
import { persist } from 'effector-storage';
import { load, save } from './db';

export const adapter: StorageAdapter = (key) => ({
  get: async () => load(key),
  set: async (value) => save(key, value),
});

export const persistState = (store: any) => persist({ store, adapter });
