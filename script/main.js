// slider instance
var swiper = new Swiper('.swiper-header', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 10000,
    disableOnInteraction: false, 
    pauseOnMouseEnter: true,
  },
  onSlideChange: function() {
    var previousSlide = document.querySelector('.swiper-slide.swiper-slide-prev .slide-content');
    if (previousSlide) {
      previousSlide.classList.remove('slideUp');
    }
  }
});

var swiperArticles = new Swiper('.swiper-articles', {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});