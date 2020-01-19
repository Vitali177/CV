// jshint esversion: 8
import { Controller } from './modules/Controller';
import { Canvas } from './modules/components/Canvas';
import { Frames } from './modules/components/Frames';
import { Preview } from './modules/components/Preview';
import { KeyboardShortcuts } from './modules/components/Keyboard-shortcuts';
import { initLocalStorage } from './modules/utils/init-local-storage';

window.addEventListener('DOMContentLoaded', () => {
  initLocalStorage();
  Controller.addEventListeners();
  Canvas.addEventListeners();
  Frames.addEventListeners();
  KeyboardShortcuts.addEventListeners();
  Preview.show();
});
