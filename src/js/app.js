import {Swiper, EffectFade, Navigation, Pagination, Thumbs } from 'swiper';
import 'theia-sticky-sidebar';

Swiper.use([ EffectFade, Navigation, Pagination, Thumbs]);

const swiper = new Swiper(".gallery-thumb-photo", {
  spaceBetween: 10,
  slidesPerView: 6,
  breakpoints: {
    320: {
      slidesPerView: 2
    },
    480: {
      slidesPerView: 3
    },
    992: {
      slidesPerView: 4
    },
    1200: {
      slidesPerView: 6
    },
  },
  freeMode: true,
  watchSlidesProgress: true,
});

const swiper2 = new Swiper(".gallery-photo", {
  loop: true,
  spaceBetween: 10,
  slideToClickedSlide: true,
  slidesPerView: 'auto',
  pagination: {
    el: ".pagination-photo-gallery",
    clickable: true,
  },
  thumbs: {
    swiper,
  },
});

const swiper3 = new Swiper(".gallery-latest-news", {
  loop: true,
  spaceBetween: 20,
  slideToClickedSlide: true,
  pagination: {
    el: ".pagination-latest-news",
    clickable: true,
  },
  slidesPerView: 3,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    480: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3
    },
  },
});

const swiper4 = new Swiper(".gallery-rss", {
  direction: "vertical",
  slidesPerView: 3,
  spaceBetween: 15,
  navigation: {
    nextEl: ".navigation-rss-next",
    prevEl: ".navigation-rss-prev",
  },
  loop: false,
  breakpoints: {
    768: {
      loop: true,
    }
  }
});

const swiper5 = new Swiper(".gallery-default", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
});

const swiper6 = new Swiper(".gallery-ticker", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
});


$('.js-language-select').click(function() {
  $('.js-language').toggleClass('language--active')
});

$('.js-language-item').click(function() {
  $('.js-language-item').removeClass('language__link--active')
  $(this).addClass('language__link--active')
  $('.js-language-toggle').text($(this)[0].getAttribute('data-language'))
  $('.js-language').toggleClass('language--active')
});

$('.js-toggle').click(function() {
  $(this).toggleClass('toggle--active')
  $('.menu').toggleClass('menu--active')
});

$('.js-top-list').click(function() {
  const id = $(this)[0].getAttribute('data-link')
  $('.top-list__link').removeClass('top-list__link--active')
  $('.top-list__body').removeClass('top-list__body--active')
  $(this).addClass('top-list__link--active')
  $(`div[data-tab="${id}"]`).addClass('top-list__body--active')
})

$('.js-ticker').hover(function(){
  this.stop();
}, function(){
  this.start();
});


$('.sa-sticky')
  .theiaStickySidebar({
    additionalMarginTop: 130
  });

$('.js-search-toggle').on('click', function() {
  $('.js-search').toggleClass('search--wide')
})

$('.js-search-field').on('focus', function() {
  $('.js-search').toggleClass('search--focus')
});

$('.js-search-field').on('focusout', function() {
  $('.js-search').toggleClass('search--focus')
});

$('.js-notification .button').on('click', function() {
  $('.js-notification').removeClass('notification--active')
})

$('.js-cookie .button').on('click', function() {
  $('.js-cookie').removeClass('cookie--active')
})

$('.js-popup a').on('click', function() {
  $('.js-popup').removeClass('popup--active')
})

$('.js-edit-form-button').on('click', function() {
  $(this).toggleClass('edit-form__eye--active')
  const form = $(this).closest('.js-edit-form-password')
  $(form).find('.js-edit-form-field').attr('type', $(this).hasClass('edit-form__eye--active') ? 'text' : 'password')
})


$('.js-checkbox').on('change', function() {
  if ($('.js-checkbox-all input').prop('checked') === true) {
    $('.js-checkbox-all input').prop('checked', false);
  }
})

$('.js-checkbox-all').on('change', function() {
  const isChecked = $(this).find('input').prop('checked');
  $('.js-checkbox input').prop('checked', isChecked);
})

$('.js-menu-item').on('click', function() {
  if ($(this).hasClass('menu__item--active')) {
    $(this).removeClass('menu__item--active')
  }
  else {
    $('.js-menu-item').removeClass('menu__item--active')
    $(this).addClass('menu__item--active')
  }
})
