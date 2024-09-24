"use strict";

// ===== get height app =====
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty(
    "--app-height",
    `${document.documentElement.clientHeight}px`
  );
};
window.addEventListener("resize", appHeight);

// ===== query =====
const [sidebar, sidebarControl, slideGroupFirst] = [
  document.querySelector("[data-sidebar]"),
  document.querySelector("[data-sidebar-control]"),
  document.querySelector("[data-group-heading]"),
];
const [prevsFirstView, prevsGroup] = [
  document.querySelector("[btn-prevs-firstview]"),
  document.querySelector("[btn-prevs-group]"),
];

// ===== main =====
const main = () => {
  // init swiper
  new Swiper(".js-mainvisual-swiper", {
    loop: true,
    effect: "fade",
    allowTouchMove: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 2000,
  });

  const groupSwiper = new Swiper(".js-group-swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    speed: 1200,
    breakpoints: {
      0: {
        allowTouchMove: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      1024: {
        allowTouchMove: false,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    },
    on: {
      init: (sw) => {
        if (sw.realIndex === 0) {
          slideGroupFirst.classList.add("--hide");
        } else {
          slideGroupFirst.classList.remove("--hide");
        }
      },
      slideChange: (sw) => {
        const index_currentSlide = sw.realIndex;

        // ====
        if (index_currentSlide === 0) {
          prevsGroup.style.display = "none";
          prevsFirstView.style.display = "block";
        } else {
          prevsGroup.style.display = "block";
          prevsFirstView.style.display = "none";
        }
      },
    },
  });

  const shipsSwiper = new Swiper(".js-ships-swiper", {
    navigation: {
      nextEl: null,
      prevEl: null,
    },
    speed: 1200,
    breakpoints: {
      0: {
        allowTouchMove: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      1024: {
        allowTouchMove: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
    on: {
      slideChange: (sw) => {
        if (sw.realIndex === 1) {
          slideGroupFirst.classList.remove("--hide");
        } else {
          slideGroupFirst.classList.add("--hide");
        }
      },
    },
  });

  // enter slide
  const [dressBtn, casualBtn] = [
    document.querySelector("[btn-dress-enter]"),
    document.querySelector("[btn-casual-enter]"),
  ];
  dressBtn.addEventListener("click", () => {
    shipsSwiper.slideNext();
  });
  casualBtn.addEventListener("click", () => {
    shipsSwiper.slideTo(1, 600);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        groupSwiper.slideTo(9, 1200);
      }, 400);
    } else {
      setTimeout(() => {
        groupSwiper.slideTo(10, 1200);
      }, 400);
    }
  });

  // slideChange
  if (window.innerWidth < 1024) {
    shipsSwiper.on("slideChange", (sw) => {
      if (sw.realIndex === 0) {
        sidebarControl.classList.add("hide");
      } else {
        sidebarControl.classList.remove("hide");
      }
    });
  }

  // event next/prev
  prevsFirstView.addEventListener("click", () => {
    shipsSwiper.slidePrev();
  });

  // back to top
  document.body.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-btn-backtotop")) {
      groupSwiper.slideTo(0, 1200);
      setTimeout(() => {
        shipsSwiper.slidePrev();
      }, 1000);
    }
  });
};

// ===== popup ====
// close
const closePopupAll = () => {
  sidebar.classList.remove("--hide");
  const popups = document.querySelectorAll("[data-popup]");
  popups.forEach((item) => {
    item.classList.remove("--show");
  });
};

// show
const itemElements = document.querySelectorAll("[data-items]");
itemElements.forEach((itemElement) => {
  const itemNumber = itemElement.getAttribute("data-items");
  const popupElement = document.querySelector(`[data-popup="${itemNumber}"]`);
  itemElement.addEventListener("click", () => {
    closePopupAll();
    if (popupElement) {
      sidebar.classList.add("--hide");
      popupElement.classList.add("--show");
    }
  });
});

// ===== lazy loading =====
const ll = new LazyLoad({
  threshold: 0,
});

window.onload = () => {
  document.body.classList.remove("fadeout");
  appHeight();
  main();
};
