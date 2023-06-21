import {Swiper, EffectFade, Navigation, Pagination, Thumbs } from 'swiper';

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
  loop: true
});

const swiper5 = new Swiper(".gallery-default", {
  slidesPerView: 1,
  loop: true
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
