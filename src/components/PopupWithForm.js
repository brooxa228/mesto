import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
        this._formSubmit = formSubmit;
        this._handleSubmit = this._handleSubmit.bind(this);
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
        this._formSubmit(this._getInputValues());
        this.close();
    };

    close() {
        super.close();
        this._formElement.reset();
    }
}
