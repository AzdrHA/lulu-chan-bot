import { makeRequest } from './makeRequest'
import type IImage from '../interface/IImage'

export const getImageByCommandName = async (
  commandName: string
): Promise<IImage> => {
  return await makeRequest(`/command/${commandName}/image`, 'GET')
}
