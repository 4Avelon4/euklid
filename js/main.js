(_ => {
  // swiper
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    loop: true,

    autoplay: {
      delay: 5000,
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      paginationBulletMessage: 'Выбрать слайд {{index}}'
    }
  });

  // accordion
  $(".accordion").accordion({
    heightStyle: "content",
    collapsible: true,
    active: false,
  });

  document.addEventListener('DOMContentLoaded', function () {
    // toggle
    const header = document.querySelector('.header');
    const toggleBtn = document.querySelector('.nav-toggle__btn');
    const menu = document.querySelector('.header__nav');
    const menuLink = document.querySelectorAll('.nav__link');

    toggleBtn.addEventListener("click", navToggleClick);

    function navToggleClick() {
      menu.classList.toggle('open');
      toggleBtn.classList.toggle('toggle__btn--open');
      document.body.classList.toggle('stop--scroll');

      const headerHeight = header.offsetHeight;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      menu.style.minHeight = `${headerHeight + heroHeight}px`;
    }

    for (let i = 0; i < menuLink.length; i++) {
      menuLink[i].addEventListener('click', menuLinkClick);
    }

    function menuLinkClick(event) {
      if (menu.classList.contains('open')) {
        navToggleClick(event);
      }
    }

    // search
    document.querySelectorAll('.header-search__btn-toggle').forEach(function (searchBtn) {
      const searchForm = document.querySelector('.header-form__wrapper');
      searchBtn.onclick = _ => {
        searchForm.classList.toggle('search-active');
        setTimeout(function () { searchForm.classList.toggle('search-animation'); }, 1);
      }
      searchBtn.addEventListener('click', function (event) {
        const path = event.currentTarget.dataset.path
        const search = document.querySelector(`[data-target="${path}"]`);

        document.querySelectorAll('.header-search__wrapper').forEach(function (searchToggle) {
          searchToggle.classList.remove('header-search-inactive');
        });
        setTimeout(function () { search.classList.add('header-search-inactive') }, 100);
      });
    });

    // tabs
    document.querySelectorAll('.tabs-item__btn').forEach(function (tabsBtn) {
      tabsBtn.addEventListener('click', function (event) {
        const path = event.currentTarget.dataset.path

        document.querySelectorAll('.tabs-item__btn').forEach(function (tabClick) {
          tabClick.classList.remove('tabs-item__btn-active');
        });

        document.querySelectorAll('.tab-content').forEach(function (tabContent) {
          tabContent.classList.remove('tab-content-active');
        });

        event.currentTarget.classList.add('tabs-item__btn-active');
        document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
      });
    });

    // questions
    document.querySelectorAll('.questions-item__title').forEach(function (questBtn) {
      function getQuestionDataSet(event) {
        const questPath = event.currentTarget.dataset.path;
        const questToggle = document.querySelector(`[data-target="${questPath}"]`);

        return {
          questPath,
          questToggle,
        };
      };

      questBtn.addEventListener('focus', function (event) {
        const questionObject = getQuestionDataSet(event);
        questionObject.questToggle.classList.add('question__border-top');
      });

      questBtn.addEventListener('blur', function (event) {
        const questionObject = getQuestionDataSet(event);
        questionObject.questToggle.classList.remove('question__border-top');
      });

      questBtn.addEventListener('keydown', function (event) {
        const questionObject = getQuestionDataSet(event);

        if (questionObject.questToggle.querySelector('.ui-state-active')) questionObject.questToggle.classList.remove('question__border-top');
        else questionObject.questToggle.classList.add('question__border-top');

        if (event.key !== 'Enter') questionObject.questToggle.classList.remove('question__border-top');
      });
    });
  });
})();
