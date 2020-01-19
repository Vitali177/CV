/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Canvas } from './Canvas';
import { Tools } from './Tools';
import { getCoordinates } from '../utils/get-coordinates';
import { getHexColor } from '../utils/get-HEX-color';

export const PaintBucket = {
  fillArea(e) {
    const sizeBlock = Canvas.sizeOneBlock;
    const positionsXY = getCoordinates(e, sizeBlock);

    const ctx = Canvas.canvas.getContext('2d');
    const oldColor = ctx.getImageData(...positionsXY, 1, 1).data.toString();
    ctx.fillStyle = Tools.primaryColor;

    if (getHexColor(ctx.getImageData(...positionsXY, 1, 1).data) === Tools.primaryColor) return;

    const arr = [[...positionsXY]];
    let coords;

    while (arr.length !== 0) {
      coords = arr.pop();

      if (coords[0] < 0 || coords[1] < 0 || coords[0] >= Canvas.canvas.width
        || coords[1] >= Canvas.canvas.height) {
        // eslint-disable-next-line no-continue
        continue;
      }

      ctx.fillRect(coords[0], coords[1], sizeBlock, sizeBlock);

      if (ctx.getImageData(coords[0] + sizeBlock, coords[1], 1, 1).data.toString() === oldColor) {
        arr.push([coords[0] + sizeBlock, coords[1]]);
      }

      if (ctx.getImageData(coords[0], coords[1] + sizeBlock, 1, 1).data.toString() === oldColor) {
        arr.push([coords[0], coords[1] + sizeBlock]);
      }

      if (ctx.getImageData(coords[0] - sizeBlock, coords[1], 1, 1).data.toString() === oldColor) {
        arr.push([coords[0] - sizeBlock, coords[1]]);
      }

      if (ctx.getImageData(coords[0], coords[1] - sizeBlock, 1, 1).data.toString() === oldColor) {
        arr.push([coords[0], coords[1] - sizeBlock]);
      }
    }
  },
};
