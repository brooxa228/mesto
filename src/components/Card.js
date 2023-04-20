export default class Card {
    constructor({name, link}, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._card = this._getTemplate();
        this._cardName = this._card.querySelector('.element__title'); 
        this._cardImage = this._card.querySelector('.element__pic'); 
        this._likeButton = this._card.querySelector('.element__like-button');
        this._deleteButton = this._card.querySelector('.element__delete-btn');
        this._imageButton = this._card.querySelector('.element__image-btn');
        this._likeCard = this._likeCard.bind(this);
        this._deleteCard = this._deleteCard.bind(this);
    }

    _getTemplate() {
        return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true); 
    }

    createCard() {
        this._cardName.textContent = this._name; 
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;

        this._setEventListeners();

        return this._card;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._likeCard);
        this._deleteButton.addEventListener('click', this._deleteCard);
        this._imageButton.addEventListener('click',() => this._handleCardClick(this._link, this._name));
    }

    _likeCard() {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    _deleteCard() {
        this._card.remove();
    }
}