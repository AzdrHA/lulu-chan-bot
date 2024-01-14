import type ICommand from './ICommand'

export default interface Category {
  id: number
  name: string
  slug: string
  nsfw: boolean
  createdAt: Date
  updatedAt: Date
  commands: ICommand[]
}
