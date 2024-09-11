import WaveSurfer from 'wavesurfer.js'
import { Fancybox } from "@fancyapps/ui"
import { Swiper, EffectFade, Navigation, Pagination, Thumbs } from 'swiper'
import 'theia-sticky-sidebar'

const $elBody = $('body')
const $elToggle = $('.js-toggle')
const $elMenu = $('.js-menu')
const $elHeader = $('#header')

const $switch = $('.js-switch input')
$switch.prop('checked', sessionStorage.getItem('theme') === 'dark')
$elBody.attr('theme', sessionStorage.getItem('theme') || 'light')

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const getOuterTop = () => {
  const $stickyElementTop = $elHeader.offset().top
  const $scrollTop = $(window).scrollTop()
  return $stickyElementTop - $scrollTop === 0 ? $elHeader.outerHeight() : $stickyElementTop - $scrollTop + $elHeader.outerHeight()
}

$(document).ready(function() {
  let $chatOpened   = $(window).width() > 992 ? localStorage.getItem('toggle') : '0'
  const $chat         =  $('.js-chat')  
  const $chatForm     =  $('.js-chat-fieldset')
  const $chatMessage  =  $('.js-chat-input')
  const $chatSubmit   =  $('.js-chat-button')
  const $chatList     =  $('.js-chat-list')
  let $chatFiles    = []

  const adjustHeight = () => {
    const el = $chatMessage[0]
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  const updateContent = () => {
    const $scrollableBlock = $('.js-chat-area')
    
    if ($scrollableBlock[0].scrollHeight > $scrollableBlock.height()) {
        $scrollableBlock.scrollTop($scrollableBlock[0].scrollHeight)
    }
  }

  adjustHeight()
  updateContent()

  const handleInput = () => {
    if ($chatMessage.val().length > 0) {
      $chatSubmit.removeClass('chat__button--disabled')
    } else {
      $chatSubmit.addClass('chat__button--disabled')
    }

    adjustHeight()
  }

  $chatMessage.on('keydown, input', handleInput);

  $(window).on('resize', adjustHeight)

  $chatForm.on('submit', function(e) {
    e.preventDefault()

    $chatList.hide()
        
    const newQuestionBlock = `
      <div class="question js-question">
        <div class="question__text">${$chatMessage.val()}</div>
      </div>`

    $('.js-chat-area').append(newQuestionBlock)

    $chatMessage.val('')
    handleInput()
    updateContent()
  })

  $chatMessage.on('keydown', function(e) {
    if (e.key === 'Enter') {
      if (!e.shiftKey && $chatMessage.val().length > 0) {
        e.preventDefault()
        $chatForm.submit()
      }
    }
  })

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return 1
      case 'audio':
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" class="h-10 w-10 flex-shrink-0" width="36" height="36"><rect width="36" height="36" rx="6" fill="#FF5588"></rect><path d="M19.6663 9.66663H12.9997C12.5576 9.66663 12.1337 9.84222 11.8212 10.1548C11.5086 10.4673 11.333 10.8913 11.333 11.3333V24.6666C11.333 25.1087 11.5086 25.5326 11.8212 25.8451C12.1337 26.1577 12.5576 26.3333 12.9997 26.3333H22.9997C23.4417 26.3333 23.8656 26.1577 24.1782 25.8451C24.4907 25.5326 24.6663 25.1087 24.6663 24.6666V14.6666L19.6663 9.66663Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.667 9.66663V14.6666H24.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.3337 18.8334H14.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.3337 22.1666H14.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.3337 15.5H15.5003H14.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
      case 'video':
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" class="h-10 w-10 flex-shrink-0" width="36" height="36"><rect width="36" height="36" rx="6" fill="#0000FF"></rect><path d="M18.833 9.66663H12.9997C12.5576 9.66663 12.1337 9.84222 11.8212 10.1548C11.5086 10.4673 11.333 10.8913 11.333 11.3333V24.6666C11.333 25.1087 11.5086 25.5326 11.8212 25.8451C12.1337 26.1577 12.5576 26.3333 12.9997 26.3333H22.9997C23.4417 26.3333 23.8656 26.1577 24.1782 25.8451C24.4907 25.5326 24.6663 25.1087 24.6663 24.6666V15.5L18.833 9.66663Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.833 9.66663V15.5H24.6663" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
      case 'text':
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" class="h-10 w-10 flex-shrink-0" width="36" height="36"><rect width="36" height="36" rx="6" fill="#FF5588"></rect><path d="M19.6663 9.66663H12.9997C12.5576 9.66663 12.1337 9.84222 11.8212 10.1548C11.5086 10.4673 11.333 10.8913 11.333 11.3333V24.6666C11.333 25.1087 11.5086 25.5326 11.8212 25.8451C12.1337 26.1577 12.5576 26.3333 12.9997 26.3333H22.9997C23.4417 26.3333 23.8656 26.1577 24.1782 25.8451C24.4907 25.5326 24.6663 25.1087 24.6663 24.6666V14.6666L19.6663 9.66663Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.667 9.66663V14.6666H24.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.3337 18.8334H14.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.3337 22.1666H14.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.3337 15.5H15.5003H14.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
      case 'application': 
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" class="h-10 w-10 flex-shrink-0" width="36" height="36"><rect width="36" height="36" rx="6" fill="#FF5588"></rect><path d="M19.6663 9.66663H12.9997C12.5576 9.66663 12.1337 9.84222 11.8212 10.1548C11.5086 10.4673 11.333 10.8913 11.333 11.3333V24.6666C11.333 25.1087 11.5086 25.5326 11.8212 25.8451C12.1337 26.1577 12.5576 26.3333 12.9997 26.3333H22.9997C23.4417 26.3333 23.8656 26.1577 24.1782 25.8451C24.4907 25.5326 24.6663 25.1087 24.6663 24.6666V14.6666L19.6663 9.66663Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.667 9.66663V14.6666H24.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.3337 18.8334H14.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.3337 22.1666H14.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.3337 15.5H15.5003H14.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
      default:
        return '?'  
    }
  }

  const getFileType = (mimeType) => {
    const TYPES = ['image', 'audio', 'video', 'text', 'application']
    const mainType = mimeType.split('/')[0]
    return TYPES.includes(mainType) ? mainType : 'unknown'
  }

  const renderFiles = () => {
    let html = ''
    $chatFiles.forEach((file, idx) => {
      const type = getFileType(file.type)

      console.log(file)

      html += `
            <div class="attachment ${type === 'image' ? 'attachment--image' : ''} js-attachment" data-idx="${idx}">
              <button class="attachment__close js-attachment-close" type="button">
                <i class="fa fa-times"></i>
              </button>`;

              if(type === 'image') {
                html += `<img src="${URL.createObjectURL(file)}" alt="${file.name}" class="img img--cover attachment__thumbnail">`
              }
              else {
                html += `<p class="attachment__icon">
                          ${getFileIcon(type)}
                         </p>
                         <div class="attachment__info">
                           <p class="attachment__name">${file.name}</p>
                           <p class="attachment__type">${file.type}</p>
                         </div>`
              }
      html += `</div>`
    })

    $('.js-chat-files').html(html)
  }

  const removeFile = (index) => {
    $chatFiles.splice(index, 1)
    renderFiles()
  }

  const addClass = () => {
    if ($(window).width() > 992) {
      $('.js-chat').addClass('chat--wide')
    } else {
      $('.js-chat').removeClass('chat--wide')
    }
  }

  const loadClass = () => {
    if($chatOpened === '1') {
      $chat.addClass('chat--wide')
    }
    else {
      $chat.removeClass('chat--wide')
    }
  }

  $('.js-chat-option').on('click', function() {
    $chatMessage.val($(this).find('span').text())
    $chatList.hide()
    $chatForm.submit()
  })

  $('.js-chat-file').on('change', function() {
    $chatFiles = Array.from(this.files)
    renderFiles()
  })

  $elBody.on('click', '.js-attachment-close', function() {
    removeFile($(this).parent().data('idx'))
  })

  $elBody.on('click', function(event) {
    if (!$(event.target).closest('.history__item').length) {
      $('.history__item--active').removeClass('history__item--active')
    }
  })
  
  $elBody.on('click', '.js-history-toggle', function(event) {
    event.stopPropagation()
    const $parent = $(this).parent()
  
    if ($parent.hasClass('history__item--active')) {
      $parent.removeClass('history__item--active')
    } else {
      $('.history__item--active').removeClass('history__item--active')
      $parent.addClass('history__item--active')
    }
  })

  $elBody.on('click', '.js-history-option', function() {
    $('.history__item--active').removeClass('history__item--active')
  })

  $('.js-chat-toggle').on('click', function() {
    $chat.toggleClass('chat--wide')
    const a = $chat.hasClass('chat--wide')
    $chatOpened = a
    localStorage.setItem('toggle', a ? '1' : '0')
  })

  if (window.SpeechRecognition) {
    // eslint-disable-next-line new-cap,no-undef
    const recognizer = new SpeechRecognition();
    recognizer.continuous = false
    recognizer.interimResults = true
    recognizer.lang = $('.js-search-microphone').attr('data-locale');
  
    recognizer.onresult = function (event) {
      if (event.results && event.results.length > 0) {
        const result = event.results[event.resultIndex];
        if (result.isFinal) {
          $('.js-chat-input').val(result[0].transcript)
        } else {
          $('.js-microphone-results').text(`"${result[0].transcript}"`)
          $('.js-chat-input').val(result[0].transcript)
        }
      }
    }
  
    recognizer.onerror = function(event) {
      console.log(event)
      if(event.error !== 'no-speech'){
        $('.js-search-microphone').addClass('search__microphone--disabled')
        $('.js-microphone-error').addClass('microphone--active')
      }
    };
  
    recognizer.onend = function() {
      $('.js-microphone-results').text('')
      $('.js-microphone-search').removeClass('microphone--active')
      adjustHeight()
      handleInput()
      // Send after end voice chat
      // $chatForm.submit()
    }
  
    $('.js-chat-volume').on('click', function() {
      $('.js-microphone-search').addClass('microphone--active')
      recognizer.start();
    })
  } 

  $(window).on('resize', function() {
    addClass()
  })

  loadClass()
})

if (window.SpeechRecognition) {
  // eslint-disable-next-line new-cap,no-undef
  const recognizer = new SpeechRecognition();
  recognizer.continuous = false
  recognizer.interimResults = true
  recognizer.lang = $('.js-search-microphone').attr('data-locale');

  recognizer.onresult = function (event) {
    if (event.results && event.results.length > 0) {
      const result = event.results[event.resultIndex];
      if (result.isFinal) {
        $('.js-search-field').val(result[0].transcript)
      } else {
        $('.js-microphone-results').text(`"${result[0].transcript}"`)
        $('.js-search-field').val(result[0].transcript)
      }
    }
  }

  recognizer.onerror = function(event) {
    console.log(event)
    if(event.error !== 'no-speech'){
      $('.js-search-microphone').addClass('search__microphone--disabled')
      $('.js-microphone-error').addClass('microphone--active')
    }
  };

  recognizer.onend = function() {
    $('.js-microphone-results').text('')
    $('.js-microphone-search').removeClass('microphone--active')
  };

  $('.js-search-microphone').on('click', function() {
    $('.js-microphone-search').addClass('microphone--active')
    recognizer.start();
  })

  $('.js-microphone').on('click', function() {
    $('.js-microphone').removeClass('microphone--active')
  })
} 
else {
  $('.js-search-microphone').hide()
}

// https://wavesurfer.xyz/examples/?all-options.js
const waveformOption = (el) => {
  return {
    container: el,
    waveColor: "#5e5e75",
    progressColor: "#ff0000",
    cursorColor: "#5e5e75",
    cursorWidth: 2,
    mediaControls: true,
    url: $(el).attr('data-record'),
  }
}

if ($('#waveform').length  > 0 && $('#waveform-post').length > 0) {
  const wavesurfer = WaveSurfer.create(
    waveformOption('#waveform')
  )
  const wavesurferPost = WaveSurfer.create(
    waveformOption('#waveform-post')
  )
}

$('.js-post-volume').on('click', function() {
  $(this).toggleClass('post__volume--active')
  $('.js-post-waveform').toggleClass('post__waveform--active')
})

$switch.on('change', function() {
  $elBody.attr('theme', $(this).prop('checked') === true ? 'dark' : 'light')
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
  const scrollTop = $(window).scrollTop()
  $elHeader.css("top", scrollTop < prevScrollTop ? "0" : `-${$elHeader.height()}px`)
  $('.js-account-dropdown').css('top', scrollTop < prevScrollTop ? "50px" : "0")
  $('.js-bonus-dropdown').css('top', scrollTop < prevScrollTop ? "50px" : "0")
  $('.js-menu').css('top', scrollTop < prevScrollTop ? `${$elHeader.height()}px` : "0")

  const elementsToReset = {
    '.js-menu-item': 'menu__item--active',
    '.js-nav-scope-dropdown': 'nav-scope__dropdown--active'
  }

  Object.entries(elementsToReset).forEach(([selector, className]) => {
    $(selector).removeClass(className)
  })

  prevScrollTop = scrollTop
}

const handleDropdownClick = (wrapperSelector, dropdownSelector, activeClass) => {
  $(wrapperSelector).click(function handleClick() {
    if($elMenu.hasClass('menu--active')) {
      $elToggle.removeClass('toggle--active')
      $elMenu.removeClass('menu--active')
    }

    $elBody.removeClass('hidden')
    $(dropdownSelector).toggleClass(activeClass)
  })
}

handleDropdownClick('.js-account-wrapper', '.js-account-dropdown', 'account-dropdown--active');
handleDropdownClick('.js-bonus-wrapper', '.js-bonus-dropdown', 'bonus-dropdown--active');

$(document).ready(function () {
  $(window).scroll(function () {
    handleScroll();
  });
});

$elToggle.click(function handleToggle() {
  $elToggle.toggleClass('toggle--active')
  $elMenu.toggleClass('menu--active')
});

$('.js-settings-toggle').click(function() {
  $('.js-settings').addClass('settings--active')
  $elBody.addClass('hidden')
});

$('.js-settings-close').click(function() {
  $('.js-settings').removeClass('settings--active')
  $elBody.removeClass('hidden')
});

$('.js-settings-shadow').click(function() {
  $('.js-settings').removeClass('settings--active')
  $elBody.removeClass('hidden')
});

$('.js-edition-link').click(function() {
  $('.js-edition-link').removeClass('edition__link--active')
  $(this).addClass('edition__link--active')

  $(`.js-editions-link[data-editions="${$(this)[0].getAttribute('data-edition')}"]`).addClass('editions__link--active')
});

$('.js-nav-scope-link').click(function scopeDropdown() {
  $('.js-nav-scope-dropdown').toggleClass('nav-scope__dropdown--active')
})

$('.js-language-link').click(function() {
  $('.js-language-link').removeClass('language__link--active')
  $(this).addClass('language__link--active')
})

$('.js-top-list').click(function() {
  const id = $(this)[0].getAttribute('data-link')
  $('.top-list__link').removeClass('top-list__link--active')
  $('.top-list__body').removeClass('top-list__body--active')
  $(this).addClass('top-list__link--active')
  $(`div[data-tab="${id}"]`).addClass('top-list__body--active')
})

$('.sa-sticky').theiaStickySidebar({
    additionalMarginTop: 130
})

$('.js-search-toggle').on('click', function() {
  $('.js-search').toggleClass('search--wide')
  $('.js-search-field').val('')
})

$('.js-search-field').on('focus', function() {
  $('.js-search').toggleClass('search--focus')
})

$('.js-search-field').on('focusout', function() {
  $('.js-search').toggleClass('search--focus')
})

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

$('.js-account-dropdown-item').click(function handleAccount() {
  $(this).toggleClass('account-dropdown__item--active')
})

$(document).click(function handleDocumentClick(e) {
  const elements = [
    { selector: '.js-account', dropdown: '.js-account-dropdown', activeClass: 'account-dropdown--active', in: false },
    { selector: '.js-bonus', dropdown: '.js-bonus-dropdown', activeClass: 'bonus-dropdown--active', in: false },
    { selector: '.js-menu-item', dropdown: '.js-menu-item', activeClass: 'menu__item--active', in: true },
    { selector: '.js-nav-scope-link', dropdown: '.js-nav-scope-dropdown', activeClass: 'nav-scope__dropdown--active', in: true }
  ]

  let clickedElement = null

  elements.forEach(element => {
    if (element.in) {
      if ($(e.target).closest(element.selector).length > 0) {
        clickedElement = element;
      }
    } else if ($(e.target).closest(element.selector).length > 0 || $(e.target).closest(element.dropdown).length > 0) {
      clickedElement = element
    }
  })

  if (clickedElement) {
    elements.forEach(element => {
      if (element !== clickedElement) {
        $(element.dropdown).removeClass(element.activeClass)
      }
    })
  } else {
    elements.forEach(element => {
      $(element.dropdown).removeClass(element.activeClass)
    })

    if(!$elMenu.hasClass('menu--active')) {
      $elBody.removeClass('hidden')
    }
  }
})


/* Base */
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

$elBody.on('change', '.js-quiz-question-checkbox', function() {
  const button = $(this).closest('.js-quiz').find('.js-quiz-question-button')

  if(button.attr('disabled') !== undefined) {
    button.removeAttr('disabled')
  }
})

$elBody.on('click', '.js-quiz-question-button', function () {
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

$elBody.on('click', '.js-quiz-answer-button', function() {
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

$elBody.on('click', '.js-quiz-button-new', function() {
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