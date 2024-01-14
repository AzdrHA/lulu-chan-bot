import { ILoadFileHandler } from "../interface/ILoadFileHandler";
import path from "node:path";
import * as fs from "fs";
import { ICommand } from "../interface/Command/ICommand";
import { IEvent } from "../interface/IEvent";

export default class LoadFileHandler implements ILoadFileHandler {
	private readonly folderPath: string;

	protected constructor(folderPath: string) {
		this.folderPath = folderPath;
	}

	public async searchInFolder<T extends ICommand | IEvent>(): Promise<T[]> {
		const results: T[] = [];

		async function traverse(currentPath: string): Promise<void> {
			const files = fs.readdirSync(currentPath);

			for (const file of files) {
				const filePath = path.join(currentPath, file);
				const stats = fs.statSync(filePath);

				if (stats.isDirectory()) {
					await traverse(filePath); // Recursively traverse subdirectories
				} else if (stats.isFile() && path.extname(filePath) === ".ts") {
					const importedModule = await import(filePath);
					const exportedClass: T = importedModule.default;
					if (typeof exportedClass === "function") {
						results.push(new exportedClass());
					}
				}
			}
		}

		await traverse(this.folderPath);
		return results;
	}
}
