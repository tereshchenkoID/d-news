// $('.js-toggle').click(function() {
//   $(this).toggleClass('toggle--active');
//   $('.menu').toggleClass('menu--active');
// });
//
// $('.js-accordion').click(function(){
//   var parent = $(this).parent();
//   parent.children('.accordion--active').removeClass('accordion--active')
//   $(this).toggleClass('accordion--active');
// });
//
// function Menu(){
//   this.scrollTo = function(element){
//     var scrollEl = $(element).children('a').attr('href');
//     var navHeight = $('.nav').outerHeight();
//     if ($(scrollEl).length !== 0) {
//       $('html, body').animate({ scrollTop: $(scrollEl).offset().top - navHeight }, 800);
//     }
//     $('.menu__item').removeClass('menu__item--active');
//     $('.menu').removeClass('menu--active');
//     $('.toggle').removeClass('toggle--active');
//     $(element).addClass('menu__item--active');
//     return false;
//   }
// }
//
// var menu = new Menu();
// $('.js-menu-item').click(function(event){
//   event.preventDefault()
//   menu.scrollTo(this);
// });
//
// $(document).ready(function(){
//
//   $('.js-top-slider').slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     dots: false,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 4000,
//         settings: {
//           slidesToShow: 6
//         }
//       },
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 5
//         }
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1
//         }
//       }
//     ]
//   });
// });
