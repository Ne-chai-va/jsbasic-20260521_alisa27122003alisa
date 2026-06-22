import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.elem = this.renderModal();

    this.closeBtn = this.elem.querySelector(".modal__close");
  }

  renderModal() {
    return createElement(
      `
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
  
            <h3 class="modal__title">
            </h3>
        </div>
  
        <div class="modal__body">
        </div>
        </div>
      </div>
      `,
    );
  }

  open() {
    document.body.appendChild(this.elem);
    document.body.classList.add("is-modal-open");

    this.closeBtn.addEventListener("click", this.closeBtnFunc);
    document.addEventListener("keydown", this.closeEscFunc);
  }

  close() {
    document.body.classList.remove("is-modal-open");
    this.elem.remove();

    this.closeBtn.removeEventListener("click", this.closeBtnFunc);
    document.removeEventListener("keydown", this.closeEscFunc);
  }

  closeBtnFunc = () => {
    this.close();
  };

  closeEscFunc = (e) => {
    if (e.code === "Escape") {
      this.close();
    }
  };

  setTitle(title) {
    const modalTitle = this.elem.querySelector(".modal__title");
    modalTitle.innerText = title;
  }

  setBody(body) {
    const modalBody = this.elem.querySelector(".modal__body");
    modalBody.innerHTML = "";
    modalBody.appendChild(body);
  }
}
