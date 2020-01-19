/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Canvas } from './Canvas';
import { Tools } from './Tools';
import { getCoordinates } from '../utils/get-coordinates';
import { getHexColor } from '../utils/get-HEX-color';

export const BigPaintBucket = {
  fillAllCanvas(e) {
    const positionsXY = getCoordinates(e, Canvas.sizeOneBlock);
    const { width } = Canvas.canvas;

    const ctx = Canvas.canvas.getContext('2d');
    const oldColor = getHexColor(ctx.getImageData(...positionsXY, 1, 1).data);
    ctx.fillStyle = Tools.primaryColor;

    if (oldColor === Tools.primaryColor) return;

    for (let i = 0; i < width; i += Canvas.sizeOneBlock) {
      positionsXY[0] = i;
      for (let j = 0; j < width; j += Canvas.sizeOneBlock) {
        positionsXY[1] = j;
        if (getHexColor(ctx.getImageData(...positionsXY, 1, 1).data) === oldColor) {
          ctx.fillRect(...positionsXY, Canvas.sizeOneBlock, Canvas.sizeOneBlock);
        }
      }
    }
  },
};