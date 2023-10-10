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
    clickable: true,
  },
  loop: false,
  breakpoints: {
    320: {
      allowTouchMove: false,
    },
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

const swiper7 = new Swiper(".gallery-online-games", {
  slideToClickedSlide: true,
  slidesPerView: "auto",
  spaceBetween: 20,
  freeMode: true,
  pagination: {
    el: ".pagination-online-games",
    clickable: true,
  },
});

const swiper8 = new Swiper(".gallery-magazines", {
  slideToClickedSlide: true,
  slidesPerView: "auto",
  spaceBetween: 20,
  freeMode: true,
  pagination: {
    el: ".pagination-magazines",
    clickable: true,
  },
});


let prevScrollTop = $(window).scrollTop();

const handleScroll = () => {
  const $header = $("#header");
  const scrollTop = $(window).scrollTop();

  if (scrollTop < prevScrollTop) {
    $header.css("top", "0");
  } else {
    $header.css("top", `-${$header.height()}px`);
  }

  prevScrollTop = scrollTop;
}

$(document).ready(function () {
  handleScroll();

  $(window).scroll(function () {
    handleScroll();
  });
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

$(document).click(function (e) {
  if (!$(e.target).closest('.js-popup-wrapper').length) {
    $('.js-popup').removeClass('popup--active')
  }
});

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

$(document).click(function (e) {
  if (!$(e.target).closest('.js-menu-item').length) {
    $('.js-menu-item').removeClass('menu__item--active');
  }
});



function Base() {
  this.BASE = 'https://api.qool90.bet/news'
  this.data = []
  this.active = 0
  this.types = {
    '1': 'quiz',
    '2': 'test',
    '3': 'opinion'
  }
}

Base.prototype.question = function(data) {
  let html = ''

  html += `
              <div class="quiz__question js-quiz-question">
                <div>
                  ${
                    data.image
                      ?
                        `
                          <div class="quiz__image u-mb-16">
                            <img src="${data.image}" class="img" />
                          </div>
                        `
                      :
                        ``
                  }
                  <h6 class="u-mb-0">${data.question}</h6>
                </div>
                <div>`

            data.answers.forEach(function (item, index) {
              html += `
                        <label class="radio ${index < data.answers.length - 1 ? 'u-mb-16' : 'u-mb-24'}">
                          <input class="radio__input js-quiz-question-checkbox" data-index="${index}" type="radio" name="answer" checked="checked">
                          <span class="radio__item"></span>
                          <span>${item}</span>
                        </label>
                      `
            });

  html += `        <button class="button button--primary button--sm button--inline js-quiz-question-button" aria-label="Next question">
                    <span class="button__text">Next</span>
                  </button>
                </div>
              </div>
            `

  return html
}

Base.prototype.answer = function(data, answer, length, idx) {
  let html = ''

  html += `
              <div class="quiz__answer js-quiz-answer">
                <div>
                  <div class="u-mb-30">
                    <h6>Your answer:</h6>
                    <p>${data.answers[answer]}</p>
                  </div>
                  <div class="u-mb-30">
                    <h6>Correct: </h6>
                    <p>${data.answers[data.true]}</p>
                  </div>
                  <div class="u-mb-30">
                    <p class="u-mb-16">This is how other participants responded:</p>`

                    data.votes.forEach(function(item, index) {
                      html += `
                                <div class="${index < data.votes.length - 1 && 'u-mb-16'}">
                                  <p class="u-mb-5">${data.answers[index]}:</p>
                                  <div class="scale">
                                      <div class="scale__background">
                                        <div style="transform: scaleX(${item / 100})"></div>
                                      </div>
                                      <div class="scale_value u-text-right u-font-size-14">${item}%</div>
                                  </div>
                                </div>
                              `
                    })

  html += `       </div>
                  <button class="button button--primary button--sm button--inline js-quiz-answer-button" aria-label="Next question">
                    <span class="button__text">
                        ${length === idx ? 'To results' : 'Next question'}
                    </span>
                  </button>
                </div>
              </div>
            `
  return html
}

Base.prototype.finish = function(data, result) {
    return `
         <div class="u-p-24">
            <p class="u-mb-16">With <strong>${result}</strong> out of <strong>${data}</strong> points you are in the good midfield.</p>
            <p class="u-mb-16">Continue quizzing straight away? Let's go!</p>
            <button class="button button--primary button--inline button--sm u-mr-10 js-quiz-button-new" aria-label="New quiz!">
                <span class="button__text">Start new quiz!</span>
            </button>
         </div>
        `
}

Base.prototype.pagination = function(length) {
  let html = ''
  html += `<div class="quiz__pagination">`

  for (let i = 0; i < length; i++) {
    html += `<button class="quiz__dot js-quiz-dot" data-index="${i}"></button>`
  }

  html += `</div>`
  return html
}

Base.prototype.sendFormData = function(formData, url, type, successCallback, errorCallback, options = null) {
  $.ajax({
    url,
    type,
    data: formData,
    processData: false,
    contentType: false,
    options,
    success (response) {
      if (successCallback && typeof successCallback === 'function') {
        successCallback(response);
      }
    },
    error (xhr, status, error) {
      if (errorCallback && typeof errorCallback === 'function') {
        errorCallback(xhr, status, error);
      }
    },
  });
}
const base = new Base()

/* Quiz */
function Quiz() {
  this.active = {}
  this.data = []
  this.result = 0
  this.answer = 0
}

Quiz.prototype.initQuiz = function(id) {
  const $form = $(`[data-opinion="${id}"]`)
  $form.addClass('quiz--active')
}

Quiz.prototype.draw = function() {
  let html = ''

  $('.js-quiz-list-pagination').html(base.pagination(this.data.data.length))

  this.data.data.forEach(function (item, index) {
    html += `
             <div class="quiz js-quiz" data-opinion="${index}">
                ${base.question(item)}
             </div>
            `
  });

  $('.js-quiz-list').html(html)

  this.initQuiz(0)
}

Quiz.prototype.init = function(data, idx) {
  const self = this
  this.active = data
  base.active = idx

  base.sendFormData(null, `${base.BASE }/opinions/data/?id=${this.active.id}`, 'GET', function (response) {
      if (response) {
        self.data = JSON.parse(response)
        self.result = 0
        self.answer = 0
        self.draw()
      }
    }, function (xhr, status, error) {
      console.error(error);
    },
    {
      async: false
    });
}

const quiz = new Quiz()

$('body').on('click', '.js-quiz-question-button', function () {
  const $form = $(this).closest('.js-quiz')
  const index = $form.find('.js-quiz-question-checkbox:checked').attr('data-index')
  const active = quiz.data.data[$form.attr('data-opinion')]
  const idx = $form.attr('data-opinion')

  quiz.answer = index
  quiz.result += (active.true === Number(index) ? 1 : 0)

  if (active.true === Number(index)) {
    $(`.js-quiz-dot[data-index="${idx}"]`).addClass('quiz__dot--true')
  }
  else {
    $(`.js-quiz-dot[data-index="${idx}"]`).addClass('quiz__dot--false')
  }

  $form.html(base.answer(active, quiz.answer, quiz.data.data.length, Number(idx) + 1))
})

$('body').on('click', '.js-quiz-answer-button', function() {
  const next = $('.quiz--active').next('.js-quiz')
  $('.js-quiz').removeClass('quiz--active')

  if (next.length !== 0) {
    next.addClass('quiz--active')
  }
  else {
    $('.js-quiz-list').html(base.finish(quiz.data.data.length, quiz.result))
  }
})

$('body').on('click', '.js-quiz-button-new', function() {
  console.log(base.data[base.active + 1], base.active + 1)

  if (base.active < base.data.length - 1) {
    quiz.init(base.data[base.active + 1], base.active + 1)
  }
})
/* End Quiz */


/* Survey */
function Opinion() {}
/* End Survey */


/* Test */
function Test() {}
/* End Test */


function Questionary() {}

Questionary.prototype.init = function() {
  const test = [
    {
      "id": 321,
      "type": 1
    },
    {
      "id": 322,
      "type": 1
    },
    {
      "id": 523,
      "type": 3
    },
    {
      "id": 423,
      "type": 2
    },
    {
      "id": 524,
      "type": 3
    }
  ]

  base.data = test
  quiz.init(base.data[0], 0)

  // base.sendFormData(null, `${base.BASE }/opinions/`, 'GET', function (response) {
  //     if (response) {
  //       base.data = JSON.parse(response)
  //
  //       if(base.data.length > 0) {
  //         if (base.data[0].type === 1) {
  //           quiz.init(base.data[0], 0)
  //         }
  //         else if (base.data[0].type === 2) {
  //           // i = new Test(self.data[0])
  //         }
  //         else if (base.data[0].type === 3) {
  //           // i = new Opinion(self.data[0])
  //         }
  //       }
  //     }
  //   }, function (xhr, status, error) {
  //     console.error(error);
  //   },
  //   {
  //     async: false
  //   });
}


const questionary = new Questionary()
questionary.init()
