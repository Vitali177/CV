/* eslint-disable import/prefer-default-export */
import { Preview } from '../components/Preview';

export function saveToGif() {
  const encoder = new GIFEncoder();

  encoder.setRepeat(0);
  encoder.setDelay(Preview.interval);
  encoder.start();

  const frames = document.querySelectorAll('.frame');

  frames.forEach((frame) => {
    const canvas = document.querySelector(`.${frame.classList[1]} canvas`);
    const ctx = canvas.getContext('2d');
    encoder.addFrame(ctx);
  });

  encoder.finish();
  encoder.download('download.gif');
}
