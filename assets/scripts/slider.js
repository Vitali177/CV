let slideIndex = 1,
  slides = document.querySelectorAll('.slider__item'),
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'),
  dotsWrap = document.querySelector('.slider__dots'),
  dots = document.querySelectorAll('.dot'),
  slidesTitles = document.querySelectorAll('.slider__title');

  function showSlides(n) {

    if (n > slides.length) {
      slideIndex = 1;
      n = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((slide) => slide.style.display = 'none');
    dots.forEach((dot) => dot.classList.remove('dot_active'));
    slidesTitles.forEach((slideTitle) => slideTitle.style.display = 'none');

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot_active');
    slidesTitles[slideIndex - 1].style.display = 'block';
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  } 

  prev.addEventListener('click', () => {
    plusSlides(-1);
  });

  next.addEventListener('click', () => {
    plusSlides(1);
  });

  dotsWrap.addEventListener('click', (e) => {
    for (let i = 0; i < dots.length + 1; i++) {
      if (e.target.classList.contains('dot') && e.target === dots[i-1]) {
        currentSlide(i);
      }
    }
  });


  window.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
  });