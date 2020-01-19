/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Canvas } from './Canvas';
import { Tools } from './Tools';
import { getCoordinates } from '../utils/get-coordinates';
import { getHexColor } from '../utils/get-HEX-color';

export const ColorSelect = {
  getColor(e) {
    const positionsXY = getCoordinates(e, Canvas.sizeOneBlock);

    const ctx = Canvas.canvas.getContext('2d');
    const color = getHexColor(ctx.getImageData(...positionsXY, 1, 1).data);

    document.querySelector('input.primary').value = color;
    Tools.primaryColor = color;
  },
};
