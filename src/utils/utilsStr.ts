export default class UtilsStr {
  public static convertStringArrayToArray = (input: string) => {
    return input.replace(/[\[\]]/g, '').split(',');
  };
}
