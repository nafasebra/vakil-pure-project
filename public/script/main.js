const btn_gototop = document.querySelector('.btn_gotoup')

if(btn_gototop) {
  btn_gototop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  })
}

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
  slidesPerView: 1,
  breakpoints: {
    556: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    850: {
      slidesPerView: 4,
      spaceBetween: 20,
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});


var swiper = new Swiper('.swiper-brands', {
  slidesPerView: 2,
  spaceBetween: 20,
  breakpoints: {
    556: {
      slidesPerView: 3,
    },
    750: {
      slidesPerView: 4,
    },
    856: {
      slidesPerView: 5,
    },
    990: {
      slidesPerView: 6,
    },
  },
  autoplay: {
    delay: 5000, // Change the delay value (in milliseconds) as per your preference
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
});