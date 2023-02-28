// открытие и закрытие попапа

class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
    }

    // открытие попапа и добавление листенера закрытия при нажатии на Esc

    openPopup(popupSelector) {
        popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', _handleEscClose);
    }

    // закрытие попапа и удаление листенера закрытия при нажатии на Esc

    closePopup(popupSelector) {
        popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', _handleEscClose);
    }

    // закрытие попапа при нажадии на Esc

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            closePopup(openedPopup);
        }
    }


    setEventListeners() {
        // функционал закрытия попапа Добавления карточки
        addCardPopupCloseButton.addEventListener('click', function () { closePopup(addCardPopup) })
        addCardPopupContainer.addEventListener('click', function (event) { event.stopPropagation() });

        // функционал закрытия попапа ПРОфиля
        profilePopupCloseButton.addEventListener('click', function () { closePopup(profilePopup) });
        profilePopupContainer.addEventListener('click', function (event) { event.stopPropagation() });

        // функционал закрытия попапа АВАтарки
        avatarPopupCloseButton.addEventListener('click', function () { closePopup(avatarPopup) });
        avatarPopupContainer.addEventListener('click', function (event) { event.stopPropagation() }); // не совсем ясна логика отаноывки всплытия и когда ( в какое время) ее применять надо

        // функционал закрытия попапа ПРОсмотра фоток карточки
        photoPopupCloseButton.addEventListener('click', function () { closePopup(cardsPhotoPopup) });
        photoPopupContainer.addEventListener('click', function (event) { event.stopPropagation() });

        // Общий функционал попаов: выключение при нажатии на Esc и клике на оверлей

        popupsAll.forEach(popup => popup.addEventListener('click', function () { closePopup(popup) }));
    }

    _setEventListeners(popupCloseBtn) { // добавляет слушатель клика иконке
        this._element
            .querySelector(`${popupCloseBtn}close-icon`)
            .addEventListener("click", this.closePopup);
        // this._element
        //   .querySelector()
        //   .addEventListener("click", this.);
    }
}

class PopupWithImage extends Popup {
    constructor() {

    }
    // Этот класс должен перезаписывать родительский метод open. В методе open класса PopupWithImage нужно
    //  вставлять в попап картинку с src изображения и подписью к картинке.
}

class PopupWithForm extends Popup {
    constructor() {

    }
    //     Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    //      В этом колбэке содержится метод класса Api.
    // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    // Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса
    //  PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
    //   но и добавлять обработчик сабмита формы.
    // Перезаписывает родительский метод close, так как при закрытии попапа
    //  форма должна ещё и сбрасываться.
    // Для каждого попапа создавайте свой экземпляр класса PopupWithForm.

    // 
}