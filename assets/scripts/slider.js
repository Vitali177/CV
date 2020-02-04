let slideIndex = 1,
  slides = document.querySelectorAll('.slider__item'),
  slideContainer = document.querySelector('.slider__container'),
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'),
  dotsWrap = document.querySelector('.slider__dots'),
  dots = document.querySelectorAll('.dot');

const size = slides[0].clientWidth;
const distanceNearSlides = 100;

slideContainer.style.width = `${size * slides.length + distanceNearSlides * (slides.length - 1)}px`;
slideContainer.style.transform = `translateX(${(-size * slideIndex) - distanceNearSlides}px)`;


next.addEventListener('click', (e) => { 
  changeSlide(e);
});

prev.addEventListener('click', (e) => { 
  changeSlide(e);
});



slideContainer.addEventListener('transitionend', () => {
  if (slides[slideIndex].id === 'last-clone') {
    slideContainer.style.transition = 'none';
    slideIndex = slides.length - 2;
    slideContainer.style.transform = `translateX(${-((size + distanceNearSlides) * slideIndex)}px)`;
  }

  if (slides[slideIndex].id === 'first-clone') {
    slideContainer.style.transition = 'none';
    slideIndex = slides.length - slideIndex;
    slideContainer.style.transform = `translateX(${-((size + distanceNearSlides) * slideIndex)}px)`;
  }
});

function changeSlide(e) {
  if (slideIndex <= 0) {  // if you click quickly many times on the arrows, fix bug
    slideIndex = 1;
  }

  if (slideIndex >= slides.length - 1) {  // if you click quickly many times on the arrows, fix bug
    slideIndex = -1;
  }

  if (e.target.closest('div').classList.contains('next')) {
    slideIndex++;
  } else {
    slideIndex--;
  }

  slideContainer.style.transition = 'transform 0.4s ease-in-out';
  slideContainer.style.transform = `translateX(${-((size + distanceNearSlides) * slideIndex)}px)`;
  selectDot();
}


function selectDot() {  
  dots.forEach((dot) => dot.classList.remove('dot_active'));

  if (slideIndex === 0) { // last-clone
    dots[dots.length - 1].classList.add('dot_active');  // select last dot
  } else if (slideIndex === slides.length - 1) {  // first-clone
    dots[0].classList.add('dot_active');  // select first dot
  } else {
    dots[slideIndex - 1].classList.add('dot_active');
  }
}


function showSlideFromDot(n) {
  slideIndex = n;

  dots.forEach((dot) => dot.classList.remove('dot_active'));
  dots[n - 1].classList.add('dot_active');

  slideContainer.style.transition = 'transform 0.4s ease-in-out, opacity .3s';
  slideContainer.style.transform = `translateX(${-((size + distanceNearSlides) * slideIndex)}px)`;
}

dotsWrap.addEventListener('click', (e) => {
  for (let i = 0; i < dots.length + 1; i++) {
    if (e.target.classList.contains('dot') && e.target === dots[i-1]) {
      showSlideFromDot(i);
    }
  }
});
