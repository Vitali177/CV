/* eslint-disable import/prefer-default-export */
import { Tools } from './Tools';
import { KeyboardShortcutsConfig } from './Keyboard-shortcuts-config';
import { addNewFrame } from '../utils/add-new-frame';
import { addDuplicateFrame } from '../utils/add-duplicate-frame';
import { deleteFrame } from '../utils/delete-frame';
import { saveToGif } from '../utils/save-to-gif';

export const KeyboardShortcuts = {
  addEventListeners() {
    function changeTool(tool) {
      document.querySelector('.navbar-tools li.selected').classList.remove('selected');
      document.querySelector(`.navbar-tools li.${tool}`).classList.add('selected');

      Tools.currentTool = tool;
    }

    function changePenSize(size) {
      document.querySelector('.pen-size .selected').classList.remove('selected');
      document.querySelector(`.pen-size .pen-size-${size}`).classList.add('selected');

      Tools.penSize = size;
    }

    const config = KeyboardShortcutsConfig;
    function handleKeyPressDown(e) {
      switch (e.code) {
        case `Key${config.penTool}`: changeTool('pen'); break;
        case `Key${config.strokeTool}`: changeTool('stroke'); break;
        case `Key${config.eraserTool}`: changeTool('eraser'); break;
        case `Key${config.colorPicker}`: changeTool('color-select'); break;
        case `Key${config.paintBucketAll}`: changeTool('big-paint-bucket'); break;
        case `Key${config.paintBucket}`: changeTool('paint-bucket'); break;

        case 'Digit1': case 'Numpad1': changePenSize(1); break;
        case 'Digit2': case 'Numpad2': changePenSize(2); break;
        case 'Digit3': case 'Numpad3': changePenSize(3); break;
        case 'Digit4': case 'Numpad4': changePenSize(4); break;

        case `Key${config.createNewEmptyFrame}`: addNewFrame(); break;
        case `Key${config.copySelectedFrame}`: addDuplicateFrame(); break;
        case `Key${config.deleteSelectedFrame}`: deleteFrame(null, null, true); break;
        case `Key${config.saveToGif}`: saveToGif(); break;

        default: break;
      }
    }
    document.body.onkeydown = handleKeyPressDown;
  },
};
