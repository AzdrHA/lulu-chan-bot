import type ICategory from 'interface/ICategory'
import { makeRequest } from './makeRequest'

export const getAllCategory = async (): Promise<ICategory[]> => {
  return await makeRequest('/command/category', 'GET')
}
