/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { swapFrames } from './swap-frames';
import { Frames } from '../components/Frames';

export function dragNDrop(frame) {
  let dragEndFrameClass;

  function dragOver(e) {
    e.preventDefault();
    this.classList.add('hovered');
  }

  function dragEnter(e) {
    e.preventDefault();
    this.classList.add('hovered');
  }

  function dragLeave() {
    this.classList.remove('hovered');
  }

  function dragDrop() {
    this.classList.remove('hovered');
    [ , Frames.lastDropFrameClass] = this.className.split(' ');
  }

  frame.addEventListener('dragover', dragOver);
  frame.addEventListener('dragenter', dragEnter);
  frame.addEventListener('dragleave', dragLeave);
  frame.addEventListener('drop', dragDrop);

  function dragStart() {
    this.className += ' hold';
  }

  function dragEnd() {
    this.classList.remove('hold');
    [ , dragEndFrameClass] = this.className.split(' ');
    setTimeout(() => {
      swapFrames(dragEndFrameClass, Frames.lastDropFrameClass);
    }, 0);
  }

  frame.addEventListener('dragstart', dragStart);
  frame.addEventListener('dragend', dragEnd);
}
