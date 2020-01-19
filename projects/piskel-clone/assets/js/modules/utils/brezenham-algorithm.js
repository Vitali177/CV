/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Canvas } from '../components/Canvas';
import { Tools } from '../components/Tools';
import { getCoordinates } from './get-coordinates';

export function brezenhamAlgorithm(e, tool) {
  [Canvas.positionX, Canvas.positionY] = getCoordinates(e, Canvas.sizeOneBlock);

  const ctx = Canvas.canvas.getContext('2d');
  const sizeBlock = Tools.penSize * Canvas.sizeOneBlock;

  ctx.fillStyle = Tools.primaryColor;

  function drawPixel(x, y, width) {
    if (tool === 'pen') {
      ctx.fillRect(x, y, width, width);
    } else if (tool === 'eraser') {
      ctx.clearRect(x, y, width, width);
    }
  }

  if (Canvas.lastX && Canvas.lastY && (Math.abs(Canvas.positionX - Canvas.lastX) > 1 * sizeBlock || Math.abs(Canvas.positionY - Canvas.lastY) > 1 * sizeBlock)) {
    const drawLine = (x1, y1, x2, y2) => {
      // Iterators, counters required by algorithm
      let x; let y; let px; let py; let xe; let ye; let i;

      // Calculate line deltas
      const dx = x2 - x1;
      const dy = y2 - y1;

      // Create a positive copy of deltas (makes iterating easier)
      const dx1 = Math.abs(dx);
      const dy1 = Math.abs(dy);

      // Calculate error intervals for both axis
      px = 2 * dy1 - dx1;
      py = 2 * dx1 - dy1;

      // The line is X-axis dominant
      if (dy1 <= dx1) {
        // Line is drawn left to right
        if (dx >= 0) {
          x = x1; y = y1; xe = x2;
        } else { // Line is drawn right to left (swap ends)
          x = x2; y = y2; xe = x1;
        }
        // Draw first pixel
        drawPixel(x, y, sizeBlock);

        // Rasterize the line
        for (i = 0; x < xe; i += 1) {
          x += sizeBlock;
          // Deal with octants...
          if (px < 0) {
            px += 2 * dy1;
          } else {
            if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
              y += sizeBlock;
            } else {
              y -= sizeBlock;
            }
            px += 2 * (dy1 - dx1);
          }
          // Draw pixel from line span at currently rasterized position
          drawPixel(x, y, sizeBlock);
        }
      } else { // The line is Y-axis dominant
        // Line is drawn bottom to top
        if (dy >= 0) {
          x = x1; y = y1; ye = y2;
        } else { // Line is drawn top to bottom
          x = x2; y = y2; ye = y1;
        }

        // Draw first pixel
        drawPixel(x, y, sizeBlock);

        // Rasterize the line
        for (i = 0; y < ye; i += 1) {
          y += sizeBlock;

          // Deal with octants...
          if (py <= 0) {
            py += 2 * dx1;
          } else {
            if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
              x += sizeBlock;
            } else {
              x -= sizeBlock;
            }
            py += 2 * (dx1 - dy1);
          }

          // Draw pixel from line span at currently rasterized position
          drawPixel(x, y, sizeBlock);
        }
      }
    };

    drawLine(Canvas.lastX, Canvas.lastY, Canvas.positionX, Canvas.positionY);
  } else drawPixel(Canvas.positionX, Canvas.positionY, sizeBlock);

  Canvas.lastX = Canvas.positionX;
  Canvas.lastY = Canvas.positionY;
}
