const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_error',
  errorClass: 'form__error-text_active'
}

class FormValidator {

  constructor({ settings }, formElement /*элемент валидируемой формы*/) {
    this.formSelector = settings.formSelector;
    this.inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  // метод активации ошибки валидации
  _showError( inputElement ) { // инпутЭлемент - это инпутСелектор?

    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); // ?
    this.inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = this.errorClass;
    errorElement.classList.add(this.errorClass);
  };

  // метод деактивации ошибки валидации 
  _hideError( inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); // ?
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  };

  // проверка вадлидности формы
  _checkInputValidity( inputElement ) {

    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      showError( inputElement, inputElement.validationMessage );
    } else {
      hideError( inputElement );
    }
  };

  // метод валидации всех полей формы 
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // изменяет состояние кнопки сабмита
  _toggleButtonState( inputList ) {
    if (hasInvalidInput(inputList)) {
      this.submitButtonSelector.disabled = true;
      this.submitButtonSelector.classList.add(this.inactiveButtonClass);
    } else {
      this.submitButtonSelector.disabled = false;
      this.submitButtonSelector.classList.remove(this.inactiveButtonClass);
    }
  };

  // устанавливает все обработчики
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this.inputSelector));
    const buttonElement = this._formElement.querySelector(this.submitButtonSelector);

    toggleButtonState( inputList );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement);
        toggleButtonState(inputList);
      });
    });
  }

  // Метод включения валидации
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this.formSelector));
    formList.forEach(() => {
      setEventListeners();
    });
  }
}

// для каждой проверяемой формы создать экземпляры класса


