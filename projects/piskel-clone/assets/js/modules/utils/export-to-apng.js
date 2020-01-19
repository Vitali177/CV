/* eslint-disable import/prefer-default-export */
import { Preview } from '../components/Preview';

const UPNG = require('upng-js');
const download = require('downloadjs');

export function exportToAPNG() {
  const images = [];
  const frames = document.querySelectorAll('.frame');

  frames.forEach((frame) => {
    const canvas = frame.firstElementChild;
    const ctx = canvas.getContext('2d');
    images.push(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
  });

  const canvasWidth = frames[0].firstElementChild.width;
  const canvasHeight = frames[0].firstElementChild.height;

  const cnum = 0;
  const dells = [];

  for (let i = 0; i < frames.length; i += 1) {
    dells.push(Preview.interval);
  }

  const png = UPNG.encode(images, canvasWidth, canvasHeight, cnum, dells);
  download(png, 'download.apng', 'apng');
}
