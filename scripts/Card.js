export default class Card {
    constructor (data, templateSelector, handleCardCLick) {
      this._templateSelector = templateSelector
      this._name = data.name
      this._link = data.link
      this._handleCardCLick = handleCardCLick
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true)

        return cardElement
    }   

    createCard() {
        this._element = this._getTemplate();
        this._cardTitle = this._element.querySelector('.element__title')
        this._cardPic = this._element.querySelector('.element__pic')
        this._likeButton = this._element.querySelector('.element__like-button')
        this._deleteButton = this._element.querySelector('.popup__delete-btn')

        this._cardTitle.textContent = this._name
        this._cardPic.src = this._link
        this._cardPic.alt = this._name

        this._addEventListeners()

        return this._element
    }

    _likeToggle() {
        this._likeButton.classList.toggle('element__like-button_active')
    }

    _deleteCard() {
        this._element.remove()
    }

    _addEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._likeToggle()
        })

        this._deleteButton.addEventListener('click', () => {
            this._deleteCard()
        })

        this._cardPic.addEventListener('click', () => {
            this._handleCardCLick(this._name, this._link)
        })
    }
}