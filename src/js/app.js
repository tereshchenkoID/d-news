import {Swiper, EffectFade, Navigation, Pagination, Thumbs } from 'swiper';
import { Fancybox } from "@fancyapps/ui";
import 'theia-sticky-sidebar';

const $switch = $('.js-switch input')
$switch.prop('checked', sessionStorage.getItem('theme') === 'dark')
$('body').attr('theme', sessionStorage.getItem('theme') || 'light')

$switch.on('change', function() {
  $('body').attr('theme', $(this).prop('checked') === true ? 'dark' : 'light')
  sessionStorage.setItem('theme', $(this).prop('checked') === true ? 'dark' : 'light')
})

Swiper.use([ EffectFade, Navigation, Pagination, Thumbs]);

Fancybox.bind("[data-fancybox]", {});

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

const setBreakpoints = (el) => {
  const breakpoints = $(el).attr('data-breakpoints').split(',')
  const result = {}

  breakpoints.forEach(item => {
    const i = item.split(':')
    result[i[0]] = {
      slidesPerView: Number(i[1])
    }
  })

  return result
}

document.querySelectorAll(".gallery-latest-news").forEach(el => {
  // eslint-disable-next-line no-new
  new Swiper(el, {
    loop: true,
    spaceBetween: 20,
    slideToClickedSlide: true,
    pagination: {
      el: ".pagination-latest-news",
      clickable: true,
    },
    breakpoints: setBreakpoints(el),
  });
})


document.querySelectorAll(".gallery-rss").forEach(el => {
  // eslint-disable-next-line no-new
  new Swiper(el, {
    direction: "vertical",
    slidesPerView: $(el).attr('data-count'),
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
})

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

const swiper9 = new Swiper(".gallery-details", {
  loop: true,
  spaceBetween: 20,
  pagination: {
    el: ".pagination-details",
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

const swiper10 = new Swiper(".gallery-wide", {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
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

  $('.js-menu').removeClass('menu--active')
  $('.js-toggle').removeClass('toggle--active')
  $('.js-menu-item').removeClass('menu__item--active')
  prevScrollTop = scrollTop;
}

$(document).ready(function () {
  handleScroll();

  $(window).scroll(function () {
    handleScroll();
  });
});

$('.js-settings-toggle').click(function() {
  $('.js-settings').addClass('settings--active')
  $('body').addClass('hidden')
});

$('.js-settings-close').click(function() {
  $('.js-settings').removeClass('settings--active')
  $('body').removeClass('hidden')
});

$('.js-settings-shadow').click(function() {
  $('.js-settings').removeClass('settings--active')
  $('body').removeClass('hidden')
});

$('.js-edition-link').click(function() {
  $('.js-edition-link').removeClass('edition__link--active')
  $(this).addClass('edition__link--active')

  $(`.js-editions-link[data-editions="${$(this)[0].getAttribute('data-edition')}"]`).addClass('editions__link--active')
  $('.js-editions-toggle').text($(this).find('.js-edition-text').html())
});


$('.js-editions-select').click(function() {
  $('.js-editions').toggleClass('editions--active')
});

$(document).click(function (e) {
  if (!$(e.target).closest('.js-editions-select').length) {
    $('.js-editions').removeClass('editions--active');
  }
});

$('.js-editions-item').click(function() {
  $('.js-editions-item').removeClass('editions__link--active')
  $(this).addClass('editions__link--active')
  $('.js-editions-toggle').text($(this)[0].text)
  $(`.js-edition-link[data-edition="${$(this)[0].getAttribute('data-editions')}"]`).addClass('edition__link--active')
  $('.js-editions').toggleClass('edition--active')
});

$('.js-language-link').click(function() {
  $('.js-language-link').removeClass('language__link--active')
  $(this).addClass('language__link--active')
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

$('.sa-sticky').theiaStickySidebar({
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

$('.js-popup-close').on('click', function() {
  $('.js-popup').removeClass('popup--active')
})

$('.js-popup-shadow').on('click', function() {
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

$('.js-menu-link').on('click', function(e) {
  if ($(this).parent().hasClass('menu__item--active')) {
    $(this).parent().removeClass('menu__item--active')
  }
  else {
    $('.js-menu-item').removeClass('menu__item--active')
    $(this).parent().addClass('menu__item--active')
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

  html += `<div class="quiz-question__list u-mb-16">`
            data.answers.forEach(function (item, index) {
                html += `
                        <div>
                          <label class="radio quiz-question__radio">
                            <input class="radio__input js-quiz-question-checkbox" data-index="${index}" type="radio" name="answer" checked="checked">
                            <span class="radio__item"></span>
                            <span>${item}</span>
                          </label>
                        </div>
                       `
            });

  html += `</div>
           <div class="u-text-right">
              <button class="button button--primary button--sm button--inline js-quiz-question-button" disabled aria-label="Next question">
                  <span class="button__text">Next question</span>
              </button>
           </div>`

  return html
}

Base.prototype.answer = function(data, answer, length, idx) {
  let html = ''

  html += `
                  <div class="quiz-question__block u-mb-10">
                    <h6 class="u-mb-0">Your answer:</h6>
                    <p>${data.answers[answer]}</p>
                  </div>
                  <div class="quiz-question__block u-mb-10">
                    <h6 class="u-mb-0">Correct: </h6>
                    <p>${data.answers[data.true]}</p>
                  </div>
                  <div class="u-mb-16">
                    <p class="u-mb-16">This is how other participants responded:</p>`

                    data.votes.forEach(function(item, index) {
                      html += `
                                <div class="${index < data.votes.length - 1 && 'u-mb-10'}">
                                  <p class="u-mb-5">${data.answers[index]}:</p>
                                  <div class="scale">
                                      <div class="scale__background">
                                        <div style="transform: scaleX(${item / 100})"></div>
                                      </div>
                                      <p class="scale_value u-text-right u-font-size-14">${item}%</p>
                                  </div>
                                </div>
                              `
                    })

  html += `       </div>
                  <div class="u-text-right">
                    <button class="button button--primary button--sm button--inline js-quiz-answer-button" aria-label="Next question">
                      <span class="button__text">
                          ${length === idx ? 'To results' : 'Next question'}
                      </span>
                    </button>
                  </div>`
  return html
}

Base.prototype.finish = function(data, result) {
    return `
         <div class="u-py-10 u-p-20-lg">
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
  html += `<div class="quiz-pagination__list">`
  for (let i = 0; i < length; i++) {
    html += `<button class="quiz-pagination__dot js-quiz-dot" data-index="${i}" aria-label="Question ${i}"></button>`
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
  const self = this

  $('.js-quiz-list-pagination').html(base.pagination(this.data.data.length))

  this.data.data.forEach(function (item, index) {
    html += `
             <div class="quiz js-quiz" data-opinion="${index}">
                <div class="quiz-question js-quiz-question">
                  <h6 class="u-text-transform-capitalize">${self.data.name}</h6>
                  <div class="quiz-question__wrapper">
                    <div class="quiz-question__left js-quiz-question-left">
                      ${
                        item.image
                        ?
                          `
                            <div class="quiz-question__image u-mb-16">
                              <img src="${item.image}" class="img" alt="Question ${index}"/>
                            </div>
                          `
                        :
                          ``
                      }
                      <p class="u-mb-0">${item.question}</p>
                    </div>
                    <div class="quiz-question__right js-quiz-question-right">
                        ${base.question(item)}
                    </div>
                  </div>
                </div>
             </div>`
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

$('body').on('change', '.js-quiz-question-checkbox', function() {
  const button = $(this).closest('.js-quiz').find('.js-quiz-question-button')

  if(button.attr('disabled') !== undefined) {
    button.removeAttr('disabled')
  }
})

$('body').on('click', '.js-quiz-question-button', function () {
  const $form = $(this).closest('.js-quiz')
  const index = $form.find('.js-quiz-question-checkbox:checked').attr('data-index')
  const active = quiz.data.data[$form.attr('data-opinion')]
  const idx = $form.attr('data-opinion')

  quiz.answer = index
  quiz.result += (active.true === Number(index) ? 1 : 0)

  if (active.true === Number(index)) {
    $(`.js-quiz-dot[data-index="${idx}"]`).addClass('quiz-pagination__dot--true')
  }
  else {
    $(`.js-quiz-dot[data-index="${idx}"]`).addClass('quiz-pagination__dot--false')
  }

  $form.find('.js-quiz-question-right').html(base.answer(active, quiz.answer, quiz.data.data.length, Number(idx) + 1))
})

$('body').on('click', '.js-quiz-answer-button', function() {
  const next = $('.quiz--active').next('.js-quiz')
  console.log(next)
  $('.js-quiz').removeClass('quiz--active')

  if (next.length !== 0) {
    next.addClass('quiz--active')
  }
  else {
    $('.js-quiz-list').html(base.finish(quiz.data.data.length, quiz.result))
  }
})

$('body').on('click', '.js-quiz-button-new', function() {
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
  base.sendFormData(null, `${base.BASE }/opinions/`, 'GET', function (response) {
      if (response) {
        base.data = JSON.parse(response)

        if(base.data.length > 0) {
          if (base.data[0].type === 1) {
            quiz.init(base.data[0], 0)
          }
          else if (base.data[0].type === 2) {
            alert("Quiz test 2")
            // i = new Test(self.data[0])
          }
          else if (base.data[0].type === 3) {
            alert("Quiz test 3")
            // i = new Opinion(self.data[0])
          }
        }
      }
    }, function (xhr, status, error) {
      console.error(error);
    },
    {
      async: false
    });
}


const questionary = new Questionary()
questionary.init()
