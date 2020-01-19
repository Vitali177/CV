/* eslint-disable import/prefer-default-export */
import { Preview } from '../components/Preview';

export function drawCanvasInSelectedFrame() {
  const canvas = document.querySelector('.frame.selected canvas');

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;

  const dataURL = localStorage.getItem('canvas');
  const img = new Image();
  img.src = dataURL;
  img.style.imageRendering = 'pixelated';
  img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const selectedFrame = document.querySelector('.frame.selected');
  const number = selectedFrame.className.split(' ')[1].split('-')[1];

  Preview.framesSrc[number - 1] = img.src;
}
