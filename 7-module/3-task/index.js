import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.renderSlider();
    this.sliderSteps = this.elem.querySelector(".slider__steps");
    this.init();
  }

  renderSlider() {
    return createElement(
      `
      <div class="slider">
        <div class="slider__thumb" style="left: 0%">
          <span class="slider__value">0</span>
        </div>

        <div class="slider__progress" style="width: 0%"></div>

        <div class="slider__steps">
        </div>
      </div>
      `,
    );
  }

  renderSliderSteps() {
    this.sliderSteps.innerHTML = "";

    for (let i = 0; i < this.steps; i++) {
      let step = document.createElement("span");
      step.dataset.id = i;
      step.classList.add("slider__step");

      if (i === this.value) {
        step.classList.add("slider__step-active");
      }

      this.sliderSteps.appendChild(step);
    }
  }

  updateActiveStep() {
    const steps = this.elem.querySelectorAll(".slider__step");
    steps.forEach((step) => step.classList.remove("slider__step-active"));

    const activeStep = this.elem.querySelector(
      `.slider__step[data-id="${this.value}"]`,
    );

    activeStep.classList.add("slider__step-active");
  }

  calculateValue(e) {
    const segments = this.steps - 1;
    const left = e.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const approximateValue = leftRelative * segments;
    const value = Math.round(approximateValue);
    const valuePercents = (value / segments) * 100;

    return [value, valuePercents];
  }

  sliderDrag() {
    this.elem.addEventListener("click", (e) => {
      const [newValue, newPercentValue] = this.calculateValue(e);

      const thumb = this.elem.querySelector(".slider__thumb");
      const thumbInnerValue = this.elem.querySelector(".slider__value");
      const progress = this.elem.querySelector(".slider__progress");

      thumb.style.left = `${newPercentValue}%`;
      progress.style.width = `${newPercentValue}%`;
      thumbInnerValue.innerText = `${newValue}`;

      this.value = newValue;

      this.bindEvents();
      this.updateActiveStep();
    });
  }

  bindEvents() {
    const sliderAddEvent = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(sliderAddEvent);
  }

  init() {
    this.renderSliderSteps();
    this.updateActiveStep();
    this.sliderDrag();
  }
}
