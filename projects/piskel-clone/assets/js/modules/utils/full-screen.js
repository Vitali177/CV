/* eslint-disable import/prefer-default-export */

export function fullScreen(element) {
  if ('fullscreenEnabled' in document || 'webkitFullscreenEnabled' in document || 'mozFullScreenEnabled' in document
  || 'msFullscreenEnabled' in document) {
    if (document.fullscreenEnabled || document.webkitFullscreenEnabled
      || document.mozFullScreenEnabled || document.msFullscreenEnabled) {

      // requestFullscreen is used to display an element in full screen mode.
      if ('requestFullscreen' in element) {
        element.requestFullscreen();
      } else if ('webkitRequestFullscreen' in element) {
        element.webkitRequestFullscreen();
      } else if ('mozRequestFullScreen' in element) {
        element.mozRequestFullScreen();
      } else if ('msRequestFullscreen' in element) {
        element.msRequestFullscreen();
      }
    }
  } else {
    throw new Error("User doesn't allow full screen");
  }
}
