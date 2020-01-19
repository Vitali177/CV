/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle
import { Canvas } from '../components/Canvas';

export function getCoordinates(e, sizeOneBlock) {
  const canvasSizes = [128, 64, 32];
  const canvasCoefficients = [4, 8, 16]; // потому что размер канваса 512 (512 / 128 = 4 и т.д)

  let positionX = Math.floor(e.offsetX / sizeOneBlock) * sizeOneBlock;
  let positionY = Math.floor(e.offsetY / sizeOneBlock) * sizeOneBlock;

  if (Canvas.canvas.width === canvasSizes[0]) {
    positionX = Math.floor(positionX / canvasCoefficients[0]);
    positionY = Math.floor(positionY / canvasCoefficients[0]);
  }

  if (Canvas.canvas.width === canvasSizes[1]) {
    positionX = Math.floor(positionX / canvasCoefficients[1]);
    positionY = Math.floor(positionY / canvasCoefficients[1]);
  }

  if (Canvas.canvas.width === canvasSizes[2]) {
    positionX = Math.floor(positionX / canvasCoefficients[2]);
    positionY = Math.floor(positionY / canvasCoefficients[2]);
  }

  return [positionX, positionY];
}
