export default class PermissionException extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'PermissionException'
  }
}
