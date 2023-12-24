import * as util from "util";
import { ICommand } from "../interface/ICommand";

export const PROJECT_DIR = process.cwd();
export const APP_DIR = util.format("%s/src", PROJECT_DIR);
export const COMMAND_DIR = util.format("%s/command", APP_DIR);
export const EVENT_DIR = util.format("%s/event", APP_DIR);
export const TRANSLATION_DIR = util.format("%s/translation", APP_DIR);

export const COMMAND_LIST = new Map<string, ICommand>();
