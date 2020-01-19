/* eslint-disable import/prefer-default-export */

export function createMarkupFrame(number) {
  const frame = document.createElement('div');
  frame.classList.add('frame');
  frame.classList.add(`frame-${number}`);

  frame.innerHTML = `
  <canvas draggable="true"></canvas>
  <div class="row">
      <button class="number">${number}</button>
      <button class="delete-frame"><img src="./assets/data/images/1577290269.svg" alt=""></button>
  </div>
  <div class="row">
      <button class="move-frame"><img src="./assets/data/images/arrow.png" alt=""></button>
      <button class="duplicate-frame"><img src="./assets/data/images/wondicon-ui-free-file_111223.svg" alt=""></button>
  </div>`;

  return frame;
}
