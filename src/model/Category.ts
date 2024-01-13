import { Command } from "./Command";

export class Category {
	public id: number;
	public name: string;
	public slug: string;
	public nsfw: boolean;
	public createdAt: Date;
	public updatedAt: Date;
	public commands: Command[];
}
