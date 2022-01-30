export const hexColorRegex = /^#([A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?)$/;

export default class UtilsRegex {
  public static isHexColor = (color: string) => {
    return color.match(hexColorRegex);
  };
}
