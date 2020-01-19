/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Preview } from './Preview';
import { addEventListenersOnNewFrame } from '../utils/add-listeners-on-all-frames';
import { addNewFrame } from '../utils/add-new-frame';

export const Frames = {
  numberOfFrames: 1,
  lastDropFrameClass: null,

  addEventListeners() {
    addEventListenersOnNewFrame(this.numberOfFrames); // на первый, уже созданный кадр

    document.querySelector('.add-frame').addEventListener('click', () => addNewFrame());

    const inputFPS = document.querySelector('.info-FPS input');

    inputFPS.addEventListener('change', () => {
      Preview.changeInterval(inputFPS.value);
      document.querySelector('.info-FPS span').innerText = inputFPS.value;
    });
  },
};
