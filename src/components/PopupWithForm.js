import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit, loadingSaveButtonText) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
        this._formSubmit = formSubmit;
        this._handleSubmit = this._handleSubmit.bind(this);
        this._saveButton = this._formElement.querySelector('.popup__save')
        this._initialSaveButtonText = this._saveButton.textContent;
        this._loadingSaveButtonText = loadingSaveButtonText;
    }

    _getInputValues() {
        return this._inputList.reduce((values, input)  => {
            values[input.name] = input.value; //записали в объект - значение
            return values;
        }, {}); //получили объект!

        // const values = {};
        // this._inputList.forEach((input) => values[input.name] = input.value);
        // return values
    }

    setEventListeners() {
        super.setEventListeners(); 
        this._formElement.addEventListener('submit', this._handleSubmit);
    };

    _handleSubmit(e) {
        e.preventDefault();
        this._setLoadingStatusText(true);
        this._formSubmit(this._getInputValues())
        .then(() => this.close()) // после успешного ответа от сервера - закроется
        .finally(() => this._setLoadingStatusText(false))
    };

    close() {
        super.close();
        this._formElement.reset();
    }

    _setLoadingStatusText(loading) {
        if (loading) {
            this._saveButton.textContent = this._loadingSaveButtonText;
        } else {
            this._saveButton.textContent = this._initialSaveButtonText;
        }
        this._saveButton.disabled = loading;
    }
}
