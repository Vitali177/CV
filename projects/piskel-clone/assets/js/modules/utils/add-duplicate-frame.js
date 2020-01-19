/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Canvas } from '../components/Canvas';
import { Frames } from '../components/Frames';
import { createMarkupFrame } from './create-markup-frame';
import { drawCanvasInSelectedFrame } from './draw-canvas-in-frame';
import { addEventListenersOnNewFrame } from './add-listeners-on-all-frames';

export function addDuplicateFrame() {
  Frames.numberOfFrames += 1;
  document.querySelector('.frames .wrapper').appendChild(createMarkupFrame(Frames.numberOfFrames));

  addEventListenersOnNewFrame();

  setTimeout(() => { // Ждем, чтобы обработчик клика установился на новый кадр
    document.querySelector('.frame:last-child').dispatchEvent(new Event('click'));

    localStorage.setItem('canvas', Canvas.canvas.toDataURL()); // сохраняем, чтобы он отрисовался сразу
    drawCanvasInSelectedFrame(); // в выбранном фрейме в этой функции
  }, 0);
}
