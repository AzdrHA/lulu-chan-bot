import { makeRequest } from "./makeRequest";
import { Category } from "../model/Category";

export const getAllCategory = async (): Promise<Category[]> => {
	return makeRequest("/command/category", "GET");
};
