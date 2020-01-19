/* eslint-disable import/prefer-default-export */
import { Preview } from '../components/Preview';

export function swapFrames(frameClass1, frameClass2) {
  if (frameClass1 === frameClass2) return;

  const frame1 = document.querySelector(`.${frameClass1}`);
  const frame2 = document.querySelector(`.${frameClass2}`);

  const canvas1 = document.querySelector(`.${frameClass1} canvas`);
  const canvas2 = document.querySelector(`.${frameClass2} canvas`);

  frame1.removeChild(canvas1);
  frame2.removeChild(canvas2);

  frame1.prepend(canvas2);
  frame2.prepend(canvas1);

  const index1 = frameClass1.split('-')[1] - 1;
  const index2 = frameClass2.split('-')[1] - 1;

  const buff = Preview.framesSrc[index1];
  Preview.framesSrc[index1] = Preview.framesSrc[index2];
  Preview.framesSrc[index2] = buff;

  document.querySelector('.frame.selected').classList.remove('selected');
  frame2.classList.add('selected');
  frame2.dispatchEvent(new Event('click'));
}
