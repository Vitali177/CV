/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Canvas } from '../components/Canvas';
import { Frames } from '../components/Frames';
import { createMarkupFrame } from './create-markup-frame';
import { drawCanvasInSelectedFrame } from './draw-canvas-in-frame';
import { addEventListenersOnNewFrame } from './add-listeners-on-all-frames';

export function addNewFrame() {
  const ctx = Canvas.canvas.getContext('2d');
  ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
  localStorage.setItem('canvas', Canvas.canvas.toDataURL());

  Frames.numberOfFrames += 1;
  document.querySelector('.frames .wrapper').appendChild(createMarkupFrame(Frames.numberOfFrames));

  addEventListenersOnNewFrame();

  document.querySelector('.frame:last-child').dispatchEvent(new Event('click'));
  drawCanvasInSelectedFrame();
}
