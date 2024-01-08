import { Modal } from "bootstrap";

// const showModal = (modalEl: HTMLElement | null): void => {
//   if (!modalEl) {
//     console.log("modalEl is null");
//     return;
//   }

//   const modal = new Modal(modalEl, {});
//   modal?.show();
// };

const showModal = (id: string): void => {
  const modalEl = document.getElementById(id);
  if (!modalEl) {
    console.log("modalEl is null");
    return;
  }

  const modal = new Modal(modalEl, {});
  modal?.show();
};

const hideModal = (modalEl: HTMLElement | null): void => {
  if (!modalEl) {
    return;
  }

  const myModal = Modal.getInstance(modalEl);
  myModal?.hide();
};

const removeModalBackdrop = (): void => {
  if (document.querySelectorAll(".modal-backdrop.fade.show").length) {
    document.querySelectorAll(".modal-backdrop.fade.show").forEach((item) => {
      item.remove();
    });
  }
};

export { showModal, hideModal, removeModalBackdrop };
