const handleEscUp = (evt) => { // Закрытие по Esc
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closeModalWindow(activePopup);
  }
};

export const openModalWindow = (modalWindow) => { // Открыение модального окна
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscUp);
};

export const closeModalWindow = (modalWindow) => { // Закрытие модального окна
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscUp);
};

export const setCloseModalWindowEventListeners = (modalWindow) => { // Добавляет обработчики событий при закрытии модального окна
  const closeButtonElement = modalWindow.querySelector(".popup__close")
  closeButtonElement.addEventListener("click", () => {
    closeModalWindow(modalWindow);
  });

  modalWindow.addEventListener("mousedown", (evt) => { // Закрытие по клику вне области модального окна
    if (evt.target.classList.contains("popup")) {
      closeModalWindow(modalWindow);
    }
  });
}
