import { Command } from './Command';

export type Category = {
  id: number;
  name: string;
  nsfw: boolean;
  createdAt: Date;
  updatedAt: Date;
  commands: Command[];
};
