import {Swiper, EffectFade, Navigation, Pagination, Thumbs } from 'swiper';

Swiper.use([ EffectFade, Navigation, Pagination, Thumbs]);

const swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 6,
  freeMode: true,
  watchSlidesProgress: true,
});

const swiper2 = new Swiper(".mySwiper2", {
  loop: true,
  spaceBetween: 10,
  slideToClickedSlide: true,
  slidesPerView: 'auto',
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper,
  },
});

// swiper[0].controller.control = swiper2;
// swiper2[0].controller.control = swiper;

$('.js-language-select').click(function() {
  $('.js-language').toggleClass('language--active')
  $('.menu').toggleClass('menu--active')
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
