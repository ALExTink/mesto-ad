function showInputError(formElement, inputElement, errorMessage, settings) { //Показывает ошибку под полем, на котором она сделана
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings) { //Скрывает ошибку под полем, на котором она сделана
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
}

function setEventListeners(formElement, settings) { //Навешивает обработчики input на все поля формы
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

function checkInputValidity(formElement, inputElement, settings) { //Проверка валидности поля. В случае невалидности показывает ошибку, в случае валидности скрывает ошибку
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function hasInvalidInput(inputList) { //Проверяет, есть ли валидность хотя бы одного поля в форме. Если есть хотя бы одно невалидное поле, возвращает true, если все поля валидные - false
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, settings) { //Переключение состояний кнопки в зависимости от валидности полей. Если есть хотя бы одно невалидное поле, кнопка становится неактивной, если все поля валидные - активной
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, settings);
  } else {
    enableSubmitButton(buttonElement, settings);
  }
}

function enableSubmitButton(buttonElement, settings) { //Делает кнопку активной
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.disabled = false;
}

function disableSubmitButton(buttonElement, settings) { //Делает кнопку неактивной
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.disabled = true;
}

function enableValidation(settings) { //Включение валидации для всех форм на странице. Находит все формы по селектору, указанному в настройках, и навешивает обработчики событий на каждую форму
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

function clearValidation(formElement, settings) { //Очистка валидации для формы
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
    inputElement.setCustomValidity("");
  });

  disableSubmitButton(buttonElement, settings);
}

export { enableValidation, clearValidation };
