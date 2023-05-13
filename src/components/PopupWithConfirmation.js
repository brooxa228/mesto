import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup{
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._formSubmit = formSubmit;
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._handleSubmit);
    }

    _handleSubmit(e) {
        e.preventDefault();
        this._formSubmit(this.card);
        this.close();
    }

    open(card) {
        super.open();
        this.card = card;
    }
}