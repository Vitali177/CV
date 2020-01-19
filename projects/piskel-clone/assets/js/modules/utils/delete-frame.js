/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Frames } from '../components/Frames';
import { Preview } from '../components/Preview';

export function deleteFrame(buttonDeleteFrame, frame, selected) {
  if (document.querySelectorAll('.frame').length === 1) {
    return;
  }
  let number;

  if (selected) { // Если мы удаляем по нажатию клавиши, то мы удаляем выбранный кадр
    const selectedFrame = document.querySelector('.frame.selected');
    [, number] = selectedFrame.className.split(' ')[1].split('-');

    document.querySelector('.frames .wrapper').removeChild(selectedFrame);
  } else {
    [, number] = buttonDeleteFrame.parentElement.parentElement.className.split(' ')[1].split('-');

    document.querySelector('.frames .wrapper').removeChild(frame);
  }
  number *= 1;

  for (let i = number + 1; i <= Frames.numberOfFrames; i += 1) {
    document.querySelector(`.frame-${i} .number`).innerHTML = `${i - 1}`; // Меняем номер
  }
  for (let i = number + 1; i <= Frames.numberOfFrames; i += 1) {
    const frameElement = document.querySelector(`.frame-${i}`); // Меняем главный класс фрейма

    frameElement.classList.remove(`frame-${i}`);
    frameElement.classList.add(`frame-${i - 1}`);
  }

  if (number === Preview.framesSrc.length) { // Если фрейм последний
    Preview.framesSrc = [...Preview.framesSrc.slice(0, number - 1)];
  } else {
    const start = [...Preview.framesSrc.slice(0, number - 1)];
    Preview.framesSrc = [...start, ...Preview.framesSrc.slice(number)];
  }

  if (number - 1 >= 1) {
    setTimeout(() => { // Ждем, чтобы обработчик клика установился на новый кадр
      document.querySelector(`.frame-${number - 1}`).dispatchEvent(new Event('click'));
    }, 0);
  } else {
    setTimeout(() => {
      document.querySelector(`.frame-${number}`).dispatchEvent(new Event('click'));
    }, 0);
  }
  Frames.numberOfFrames -= 1;
}
