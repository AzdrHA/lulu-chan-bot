import { makeRequest } from "./makeRequest";
import { Image } from "../model/Image";

export const getImageByCommandName = async (
	commandName: string,
): Promise<Image> => {
	return makeRequest(`/command/${commandName}/image`, "GET");
};
