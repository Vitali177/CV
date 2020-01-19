/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Canvas } from '../components/Canvas';
import { Preview } from '../components/Preview';
import { dragNDrop } from './dragndrop';
import { addDuplicateFrame } from './add-duplicate-frame';
import { deleteFrame } from './delete-frame';

export function addEventListenersOnNewFrame() {
  const frame = document.querySelector('.frame:last-child');

  dragNDrop(frame);

  frame.addEventListener('click', () => {
    const elementsFrames = document.querySelectorAll('.frame');
    elementsFrames.forEach((frame2) => frame2.classList.remove('selected'));

    frame.classList.add('selected');

    const number = frame.className.split(' ')[1].split('-')[1] - 1;

    if (Preview.framesSrc[number]) { // Если кадр не новый (и не пустой)
      const ctx = Canvas.canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, Canvas.canvas.clientWidth, Canvas.canvas.height);

      const dataURL = Preview.framesSrc[number];
      const img = new Image();
      img.src = dataURL;
      img.style.imageRendering = 'pixelated';
      img.onload = () => ctx.drawImage(img, 0, 0, Canvas.canvas.width, Canvas.canvas.height);
    }
  });

  const buttonsDuplicateFrame = document.querySelector('.frame:last-child .duplicate-frame');
  buttonsDuplicateFrame.addEventListener('click', () => addDuplicateFrame());

  const buttonDeleteFrame = document.querySelector('.frame:last-child .delete-frame');
  buttonDeleteFrame.addEventListener('click', () => deleteFrame(buttonDeleteFrame, frame));
}
