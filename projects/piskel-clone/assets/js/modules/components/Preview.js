/* eslint-disable import/prefer-default-export */

export const Preview = {
  framesSrc: [],
  interval: 500,
  timer: null,

  show() {
    let indexFrame = 0;
    const that = this;

    function showFrame() {
      const previewFrame = document.querySelector('.preview canvas');

      const ctx = previewFrame.getContext('2d');
      ctx.imageSmoothingEnabled = false;

      const dataURL = that.framesSrc[indexFrame];
      const img = new Image();
      img.src = dataURL;
      img.style.imageRendering = 'pixelated';
      img.onload = () => {
        ctx.clearRect(0, 0, previewFrame.width, previewFrame.height);
        ctx.drawImage(img, 0, 0, previewFrame.width, previewFrame.height);
      };
      // eslint-disable-next-line no-unused-expressions
      indexFrame + 1 >= that.framesSrc.length ? indexFrame = 0 : indexFrame += 1;
    }

    this.timer = setInterval(() => {
      if (Preview.framesSrc.length !== 0) { // если кадры есть
        showFrame();
      }
    }, this.interval);
  },

  changeInterval(value) {
    if (+value === 0) {
      Preview.interval = 0;
      clearInterval(this.timer);
    } else {
      Preview.interval = Math.round(1000 / value);
      clearInterval(this.timer);
      this.show();
    }
  },
};
