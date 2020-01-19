/* eslint-disable import/prefer-default-export */
import { Tools } from './components/Tools';
import { Canvas } from './components/Canvas';
import { drawCanvasInSelectedFrame } from './utils/draw-canvas-in-frame';
import { fullScreen } from './utils/full-screen';
import { saveToGif } from './utils/save-to-gif';
import { exportToAPNG } from './utils/export-to-apng';

export const Controller = {
  addEventListeners() {
    const penSizes = document.querySelectorAll('.pen-size div');

    penSizes.forEach((item, index) => {
      item.addEventListener('click', () => {
        penSizes.forEach((item) => item.classList.remove('selected'));

        Tools.penSize = index + 1;
        item.classList.add('selected');
      });
    });

    const tools = document.querySelectorAll('.navbar-tools li');

    tools.forEach((item) => {
      item.addEventListener('click', () => {
        tools.forEach((item) => item.classList.remove('selected'));

        Tools.currentTool = item.className;
        item.classList.add('selected');
      });
    });

    const inputPrimaryColor = document.querySelector('input.primary');
    const inputSecondaryColor = document.querySelector('input.secondary');

    inputPrimaryColor.addEventListener('change', () => {
      Tools.primaryColor = `${inputPrimaryColor.value}`;
    });

    inputSecondaryColor.addEventListener('change', () => {
      Tools.secondaryColor = `${inputSecondaryColor.value}`;
    });

    const swapColors = document.querySelector('img.swap-colors');

    swapColors.addEventListener('click', () => {
      Tools.primaryColor = `${inputSecondaryColor.value}`;
      Tools.secondaryColor = `${inputPrimaryColor.value}`;
      inputPrimaryColor.value = Tools.primaryColor;
      inputSecondaryColor.value = Tools.secondaryColor;
    });

    document.querySelector('.clear-canvas').addEventListener('click', () => {
      const ctx = Canvas.canvas.getContext('2d');
      ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);

      localStorage.setItem('canvas', Canvas.canvas.toDataURL());
      drawCanvasInSelectedFrame();
    });

    const previewCanvas = document.querySelector('.preview canvas');
    previewCanvas.addEventListener('click', () => {
      fullScreen(previewCanvas);
    });

    document.querySelector('.save-to-gif').addEventListener('click', () => {
      saveToGif();
    });

    document.querySelector('.export-to-apng').addEventListener('click', () => {
      exportToAPNG();
    });
  },
};
