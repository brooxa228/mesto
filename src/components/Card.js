export default class Card {
    constructor({name, link, likes, owner, _id}, templateSelector, handleCardClick, handleCardDeleteClick, userId, handleLikeClick) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._owner = owner;
        this.cardId = _id; 
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._card = this._getTemplate();
        this._cardName = this._card.querySelector('.element__title'); 
        this._cardImage = this._card.querySelector('.element__pic'); 
        this._likeButton = this._card.querySelector('.element__like-button');
        this._deleteButton = this._card.querySelector('.element__delete-btn');
        this._imageButton = this._card.querySelector('.element__image-btn');
        this._likeCard = this._likeCard.bind(this);
        this._handleCardDeleteClick = handleCardDeleteClick;
        this._likeCounter = this._card.querySelector('.element__like-counter');
        this._isOwn = userId === owner._id;
        this._handleLikeClick = handleLikeClick;
    }

    _getTemplate() {
        return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true); 
    }

    createCard() {
        this._cardName.textContent = this._name; 
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        
        if (!this._isOwn) {
            this._removeTrashButton();
        }

        this._setEventListeners();

        this.setLike()

        return this._card;
    }

    isLiked() {
        return this._likes.some(like => like._id === this._userId);
    }

    setLike() {
        this._likeCounter.textContent = this._likes.length;
        if (this.isLiked()) {
            this._likeButton.classList.add('element__like-button_active');
        } else {
            this._likeButton.classList.remove('element__like-button_active');

        }
    }
   
    _setEventListeners() {
        this._likeButton.addEventListener('click',() => this._handleLikeClick(this.cardId, this.isLiked(), this));
        this._deleteButton.addEventListener('click',() => this._handleCardDeleteClick(this));
        this._imageButton.addEventListener('click',() => this._handleCardClick(this._link, this._name));
    }

    _likeCard() {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    deleteCard() {
        this._card.remove();
    }

    _removeTrashButton() {
        this._deleteButton.remove();
    }

    updateLikesInfo(likes) {
        this._likes = likes;
        this.setLike();
    }

    getCardId() {
        return this.cardId;
    }
}