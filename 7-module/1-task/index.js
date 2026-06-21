import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.renderMenu();
    this.bindEvents();
    this.moveMenu();
  }

  renderMenu() {
    const innerRibbonHTML = this.categories
      .map((item) => this.renderMenuItem(item))
      .join("");

    return createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">${innerRibbonHTML}</nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
  }

  renderMenuItem(item) {
    return `
      <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
    `;
  }

  moveMenu() {
    const track = this.elem.querySelector(".ribbon__inner");
    const nextBtn = this.elem.querySelector(".ribbon__arrow_right");
    const prevBtn = this.elem.querySelector(".ribbon__arrow_left");

    nextBtn.addEventListener("click", () => {
      track.scrollBy(350, 0);
    });

    prevBtn.addEventListener("click", () => {
      track.scrollBy(-350, 0);
    });

    track.addEventListener("scroll", () => {
      const scrollLeft = track.scrollLeft;
      const scrollWidth = track.scrollWidth;
      const clientWidth = track.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      prevBtn.classList.toggle("ribbon__arrow_visible", scrollLeft > 0);
      nextBtn.classList.toggle("ribbon__arrow_visible", scrollRight > 1);
    });
  }

  bindEvents() {
    const buttons = this.elem.querySelectorAll(".ribbon__item");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();

        buttons.forEach((btn) => {
          btn.classList.remove("ribbon__item_active");
        });
        button.classList.add("ribbon__item_active");

        const itemID = button.getAttribute("data-id");
        const productAddEvent = new CustomEvent("ribbon-select", {
          detail: itemID,
          bubbles: true,
        });
        this.elem.dispatchEvent(productAddEvent);
      });
    });
  }
}
