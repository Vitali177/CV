/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Canvas } from '../components/Canvas';
import { Tools } from '../components/Tools';

export function saveToLocalStorage() {
  localStorage.setItem('canvas', Canvas.canvas.toDataURL());
  localStorage.setItem('canvasWidth', Canvas.canvas.width);
  localStorage.setItem('currentTool', Tools.currentTool);
  localStorage.setItem('penSize', Tools.penSize);
}
