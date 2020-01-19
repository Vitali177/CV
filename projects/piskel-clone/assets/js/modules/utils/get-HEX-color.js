/* eslint-disable import/prefer-default-export */

export function getHexColor(color) {
  function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }
  return `#${componentToHex(color[0])}${componentToHex(color[1])}${componentToHex(color[2])}`;
}
