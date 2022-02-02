import { Category } from '../types/Category';
import { CategoryConfig } from '../types/CategoryConfig';

export const commandConfig: Record<Category, CategoryConfig> = {
  admin: { order: 100 },
  emote: { order: 90 },
  hentai: { order: 70 },
  image: { order: 0 },
  misc: { order: 50 },
  music: { order: 0 },
  porn: { order: 60 },
  reaction: { order: 80 },
  setting: { order: 40 }
};
