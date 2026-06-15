function initCarousel() {
  const track = document.querySelector(".carousel__inner");
  const nextBtn = document.querySelector(".carousel__arrow_right");
  const prevBtn = document.querySelector(".carousel__arrow_left");
  const slides = document.querySelectorAll(".carousel__slide");

  let currentSlideIndex = 0;
  const slideWidth = slides[0].offsetWidth;
  const totalSlides = slides.length;

  updateArrowButtons();

  function updateArrowButtons() {
    nextBtn.style.display = currentSlideIndex < totalSlides - 1 ? "" : "none";
    prevBtn.style.display = currentSlideIndex > 0 ? "" : "none";
  }

  function moveTo(slideIndex) {
    currentSlideIndex = slideIndex;
    track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
    updateArrowButtons();
  }

  function moveRight() {
    moveTo(currentSlideIndex + 1);
  }

  function moveLeft() {
    moveTo(currentSlideIndex - 1);
  }

  nextBtn.addEventListener("click", moveRight);
  prevBtn.addEventListener("click", moveLeft);
}
