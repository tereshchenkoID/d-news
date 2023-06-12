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
