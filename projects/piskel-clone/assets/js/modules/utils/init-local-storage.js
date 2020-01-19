/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Canvas } from '../components/Canvas';
import { Tools } from '../components/Tools';
import { drawCanvasInSelectedFrame } from './draw-canvas-in-frame';

export function initLocalStorage() {
  if (localStorage.getItem('canvas')) {
    const ctx = Canvas.canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    const dataURL = localStorage.getItem('canvas');
    const img = new Image();
    img.src = dataURL;
    img.style.imageRendering = 'pixelated';
    img.onload = () => ctx.drawImage(img, 0, 0, Canvas.canvas.width, Canvas.canvas.height);

    drawCanvasInSelectedFrame();
  }

  if (localStorage.getItem('canvasWidth')) {
    const canvasWidth = localStorage.getItem('canvasWidth');

    Canvas.canvas.width = canvasWidth;
    Canvas.canvas.height = canvasWidth;

    Canvas.canvasNumberBlocks = canvasWidth;
    Canvas.sizeOneBlock = Canvas.canvas.width / Canvas.canvasNumberBlocks;
  } else {
    const defaultCanvasSize = 32;

    Canvas.canvas.width = defaultCanvasSize;
    Canvas.canvas.height = defaultCanvasSize;

    Canvas.canvasNumberBlocks = defaultCanvasSize;
    Canvas.sizeOneBlock = Canvas.canvas.width / Canvas.canvasNumberBlocks;
  }

  const buttonsChangeSize = document.querySelectorAll('.canvas-size button');
  buttonsChangeSize.forEach((button) => {
    button.classList.remove('selected');
  });

  const buttonClass = `size-${Canvas.canvas.width}`;
  document.querySelector(`.${buttonClass}`).classList.add('selected');

  if (localStorage.getItem('currentTool')) {
    Tools.currentTool = localStorage.getItem('currentTool');
  } else {
    Tools.currentTool = 'pen';
  }
  document.querySelector(`.navbar-tools li.${Tools.currentTool}`).classList.add('selected');

  if (localStorage.getItem('penSize')) {
    Tools.penSize = localStorage.getItem('penSize');
  } else {
    Tools.penSize = 1;
  }
  document.querySelector(`.pen-size-${Tools.penSize}`).classList.add('selected');
}
