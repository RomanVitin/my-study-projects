document.addEventListener("DOMContentLoaded", function () {
  // Form Validation
  const aboutForm = document.getElementById("aboutForm");
  const contactForm = document.getElementById("contactForm");
  const validation1 = new JustValidate(aboutForm);
  const validation2 = new JustValidate(contactForm);

  validation1
    .addField("#aboutInput", [
      {
        rule: "required",
        errorMessage: "Недопустимый формат",
      },
      {
        rule: "email",
        errorMessage: "Недопустимый формат",
      },
    ])
    .onSuccess(() => {
      aboutForm.reset();
    });
  validation2
    .addField("#contactName", [
      {
        rule: "required",
        errorMessage: "Недопустимый формат",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Недопустимый формат",
      },
      {
        rule: "maxLength",
        value: 15,
        errorMessage: "Недопустимый формат",
      },
    ])
    .addField("#contactEmail", [
      {
        rule: "required",
        errorMessage: "Недопустимый формат",
      },
      {
        rule: "email",
        errorMessage: "Недопустимый формат",
      },
    ])
    .addField("#contactComment", [
      {
        rule: "maxLength",
        value: 35,
        errorMessage: "Недопустимый формат",
      },
    ])
    .onSuccess(() => {
      contactForm.reset();
    });
  document.addEventListener("click", (e) => {
    const withinBoundaries = e.composedPath().includes(aboutForm);
    if (!withinBoundaries) {
      validation1.refresh();
      aboutForm.reset();
    }
  });
  document.addEventListener("click", (e) => {
    const withinBoundaries = e.composedPath().includes(contactForm);
    if (!withinBoundaries) {
      validation2.refresh();
      contactForm.reset();
    }
  });

  // Search Input
  const searchBtn = document.querySelector(".search__btn");
  const searchForm = document.querySelector(".search__form");
  const searchFormCloseBtn = document.querySelector(".search__form__close");
  const searchFormSubmitBtn = document.querySelector(".search__form__submit");
  const navMenu = document.querySelector(".nav");

  searchBtn.addEventListener("click", () => {
    searchForm.classList.add("search__form--active");
    searchBtn.classList.add("search__btn--active");
    navMenu.classList.add("nav--active");
  });
  searchFormCloseBtn.addEventListener("click", () => {
    searchForm.classList.remove("search__form--active");
    searchForm.querySelector("input").value = "";
    searchBtn.classList.remove("search__btn--active");
    navMenu.classList.remove("nav--active");
  });
  searchFormSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchForm.classList.remove("search__form--active");
    searchForm.querySelector("input").value = "";
    searchBtn.classList.remove("search__btn--active");
    navMenu.classList.remove("nav--active");
  });

  document.addEventListener("click", (e) => {
    let target = e.target;
    if (!target.closest(".header__search")) {
      searchForm.classList.remove("search__form--active");
      searchForm.querySelector("input").value = "";
      searchBtn.classList.remove("search__btn--active");
      navMenu.classList.remove("nav--active");
    }
  });

  // Burger
  const burger = document.querySelector(".header__mobile__burger");
  const burgerMenu = document.querySelector(".header__mobile__nav");

  burger.addEventListener("click", () => {
    burger.classList.toggle("header__mobile__burger--active");
    burgerMenu.classList.toggle("header__mobile__nav--active");
    document.body.classList.toggle("stop-scroll");
  });

  const burgerMenuLinks = burgerMenu.querySelectorAll(".header__mobile__nav__item");
  const burgerMenuCloseBtn = burgerMenu.querySelector(".header__mobile__nav__close");
  const burgerMenuContact = burgerMenu.querySelector(".header__mobile__nav__contact")

  burgerMenuLinks.forEach(function (el) {
    el.addEventListener("click", function () {
      burger.classList.remove("header__mobile__burger--active");
      burgerMenu.classList.remove("header__mobile__nav--active");
      document.body.classList.remove("stop-scroll");
    });
  });
  burgerMenuCloseBtn.addEventListener("click", () => {
    burger.classList.remove("header__mobile__burger--active");
    burgerMenu.classList.remove("header__mobile__nav--active");
    document.body.classList.remove("stop-scroll");
  });
  burgerMenuContact.addEventListener("click", () => {
    burger.classList.remove("header__mobile__burger--active");
    burgerMenu.classList.remove("header__mobile__nav--active");
    document.body.classList.remove("stop-scroll");
  })
});
