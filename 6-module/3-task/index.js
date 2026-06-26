import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this._renderCarousel();
    this._bindEvents();
    this._moveCarousel();
  }

  _renderCarousel() {
    const innerSlidesHTML = this.slides
      .map((slide) => this._renderCarouselSlideHTML(slide))
      .join("");

    return createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
          ${innerSlidesHTML}
        </div>
      </div>
    `);
  }

  _renderCarouselSlideHTML(slide) {
    return `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="${slide.id}">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button" data-id="${slide.id}">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  _moveCarousel() {
    let currentSlideIndex = 0;
    const track = this.elem.querySelector(".carousel__inner");
    const slides = this.elem.querySelectorAll(".carousel__slide");
    const nextBtn = this.elem.querySelector(".carousel__arrow_right");
    const prevBtn = this.elem.querySelector(".carousel__arrow_left");

    const moveSlide = () => {
      const slideWidth = slides[0].offsetWidth;
      track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;

      nextBtn.style.display =
        currentSlideIndex < slides.length - 1 ? "" : "none";
      prevBtn.style.display = currentSlideIndex > 0 ? "" : "none";
    };

    moveSlide();

    nextBtn.addEventListener("click", () => {
      if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
        moveSlide();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        moveSlide();
      }
    });
  }

  _bindEvents() {
    const buttons = this.elem.querySelectorAll(".carousel__button");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const slideId = button.getAttribute("data-id");
        const productAddEvent = new CustomEvent("product-add", {
          detail: slideId,
          bubbles: true,
        });
        this.elem.dispatchEvent(productAddEvent);
      });
    });
  }
}
