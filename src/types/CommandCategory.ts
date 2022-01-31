import { Command } from './Command';
import { Category } from './Category';

export type CommandCategory = {
  id: number;
  name: Category;
  nsfw: boolean;
  createdAt: Date;
  updatedAt: Date;
  commands: Command[];
};
