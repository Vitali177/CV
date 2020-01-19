/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Tools } from './Tools';
import { ColorSelect } from './Color-select';
import { BigPaintBucket } from './Big-paint-bucket';
import { PaintBucket } from './Paint-bucket';
import { saveToLocalStorage } from '../utils/save-local-storage';
import { drawCanvasInSelectedFrame } from '../utils/draw-canvas-in-frame';
import { brezenhamAlgorithm } from '../utils/brezenham-algorithm';

export const Canvas = {
  canvas: document.querySelector('#canvas'),
  canvasNumberBlocks: null, // localStorage
  sizeOneBlock: null, // FIX
  isDrawing: false,
  lastX: null,
  lastY: null,
  positionX: null,
  positionY: null,

  addEventListeners() {
    document.body.addEventListener('click', () => {
      saveToLocalStorage();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isDrawing && Tools.currentTool === 'pen') brezenhamAlgorithm(e, 'pen');
      if (this.isDrawing && Tools.currentTool === 'eraser') brezenhamAlgorithm(e, 'eraser');
    });

    this.canvas.addEventListener('click', (e) => {
      if (Tools.currentTool === 'pen') brezenhamAlgorithm(e, 'pen');
      if (Tools.currentTool === 'color-select') ColorSelect.getColor(e);
      this.lastX = null;
      this.lastY = null;

      saveToLocalStorage();
      drawCanvasInSelectedFrame();
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDrawing = true;
      if (Tools.currentTool === 'paint-bucket') PaintBucket.fillArea(e);
      if (Tools.currentTool === 'big-paint-bucket') BigPaintBucket.fillAllCanvas(e);
      if (Tools.currentTool === 'eraser') brezenhamAlgorithm(e, 'eraser');
    });

    window.addEventListener('mouseup', () => {
      this.isDrawing = false;
      this.lastX = null;
      this.lastY = null;
    });

    this.canvas.addEventListener('mouseout', () => {
      this.lastX = null;
      this.lastY = null;
    });

    const buttonsChangeSize = document.querySelectorAll('.canvas-size button');

    buttonsChangeSize.forEach((button) => {
      button.addEventListener('click', () => {
        buttonsChangeSize.forEach((button_) => {
          button_.classList.remove('selected');
        });

        button.classList.add('selected');

        [this.canvas.width] = button.innerHTML.split('X');
        [this.canvas.height] = button.innerHTML.split('X');

        this.canvasNumberBlocks = this.canvas.width;
        this.sizeOneBlock = this.canvas.width / this.canvasNumberBlocks;

        if (localStorage.getItem('canvas')) {
          const ctx = this.canvas.getContext('2d');
          ctx.imageSmoothingEnabled = false;
          const dataURL = localStorage.getItem('canvas');
          const img = new Image();

          img.style.imageRendering = 'pixelated';

          img.src = dataURL;
          img.onload = () => {
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            saveToLocalStorage();
            drawCanvasInSelectedFrame();
          };
        }
      });
    });
  },
};
