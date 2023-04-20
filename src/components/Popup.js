export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handleCloseByClick = this._handleCloseByClick.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);

    }

    _handleEscClose(e) {
        if (e.key ==='Escape') this.close()
    }

    _handleCloseByClick(e) {
        if (e.target === e.currentTarget || e.target.classList.contains('popup__close')) this.close();
    };

    setEventListeners() {
        this._popup.addEventListener('mouseup', this._handleCloseByClick);
    }
}