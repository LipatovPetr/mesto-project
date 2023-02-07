// import {
//   validationConfig
// } from "../index.js";



//  Функция активации ошибки валидации

const showError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);

};

//  Функция деактивации ошибки валидации 

const hideError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

//  Функция валидации поля 

const checkInputValidity = (formElement, inputElement, settings) => { 

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid){
    showError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideError(formElement, inputElement, settings);
  }
};

//  Функция валидации всех полей формы 

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

//  Функция активации/деактивации кнопки формы

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}; 

//  Функция навешивания листнеров 

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);  

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}; 

//  Функция включения валидации

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};


