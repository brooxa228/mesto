const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 


const popupElement = document.querySelector('.popup')
const popupEditElement = document.getElementById('popup-edit-profile')
const popupOpenEditButton = document.querySelector('.profile__edit-button')
const popupCloseEditButton = popupEditElement.querySelector('.popup__close')
const popupAddElement = document.getElementById('popup-add-post')
const popupOpenAddButton = document.querySelector('.profile__add-button')
const popupCloseAddButton = popupAddElement.querySelector('.popup__close')
const popupAddSaveButton = popupAddElement.querySelector('.popup__save')
const popupImage = document.getElementById('popup-image')
const popupCloseImageButton = popupImage.querySelector('.popup__close')

let nameInput = popupEditElement.querySelector('#edit-profile-form input[name="name"]')
let jobInput = popupElement.querySelector('#edit-profile-form input[name="job"]')
const formEditElement = popupElement.querySelector('#edit-profile-form')
let nameProfile = document.querySelector('.profile__title')
let jobProfile = document.querySelector('.profile__subtitle')

const openPopup = (popup) => {
  popup.classList.add('popup_open')
}

const openImagePopup = function() {
  openPopup(popupImage)
}

const openEditPopup = function() {
  nameInput.value = nameProfile.textContent
  jobInput.value = jobProfile.textContent
  openPopup(popupEditElement)
}

const openAddPopup = function() {
  openPopup(popupAddElement)
}

const closePopup = (popup) => {
  popup.classList.remove('popup_open')
}

const closeImagePopup = function() {
  closePopup(popupImage)
}

const closeEditPopup = function() {
  closePopup(popupEditElement)
}

const closeAddPopup = function() {
  closePopup(popupAddElement)
}

const openCardPopup = function() {
  openPopup()
}

function handleEditFormSubmit(evt) {
  evt.preventDefault()
  nameProfile.textContent = nameInput.value
  jobProfile.textContent = jobInput.value
  closePopup(popupEditElement)
}

function createImage(name, link) {
  const image = document.querySelector('.popup__image');
  const imageSubtitle = document.querySelector('.popup__image-title')
  image.src = link;
  image.alt = name;
  imageSubtitle.textContent = name;
}

const сardsContainer = document.querySelector('.elements__list')

function createCard({ name, link}) {
  const сardTemplate = document.querySelector('#initial-cards-template').content.querySelector('.element')
  const card = сardTemplate.cloneNode(true)
  const cardTitle = card.querySelector('.element__title')
  cardTitle.textContent = name
  const cardPic = card.querySelector('.element__pic')
  cardPic.src = link
  card.querySelector('.popup__delete-btn').addEventListener('click', () => {
    card.remove()
  })
 const likeButton = card.querySelector('.element__like-button')
  card.querySelector('.element__like-button').addEventListener('click', () => {
    likeButton.classList.toggle('element__like-button_active') 
  })
  cardPic.addEventListener('click', () => {
    createImage(name, link)
    openPopup(popupImage)
  })
  return card
}



function renderCards() {
  initialCards.forEach((card , index) => {
    const cardHtml = createCard(card, index)
    сardsContainer.prepend(cardHtml)
  })
}
renderCards()

let formAddElement = document.querySelector('#add-post-form')
let nameAddInput = popupAddElement.querySelector('#add-post-form input[name="postName"]')
let linkAddInput = popupAddElement.querySelector('#add-post-form input[name="postLink"]')


function handleAddFormSubmit(evt) {
  evt.preventDefault()
  const newCard = createCard({
    name: nameAddInput.value, 
    link: linkAddInput.value
  })
  сardsContainer.prepend(newCard)
  closePopup(popupAddElement)
}


popupCloseImageButton.addEventListener('click', closeImagePopup)
popupAddElement.addEventListener('submit', handleAddFormSubmit)
formEditElement.addEventListener('submit', handleEditFormSubmit)
popupOpenEditButton.addEventListener('click', openEditPopup)
popupCloseEditButton.addEventListener('click', closeEditPopup)
popupOpenAddButton.addEventListener('click', openAddPopup)
popupCloseAddButton.addEventListener('click', closeAddPopup)