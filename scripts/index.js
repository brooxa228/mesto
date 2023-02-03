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



const popupEditElement = document.getElementById('popup-edit-profile')
const popupOpenEditButton = document.querySelector('.profile__edit-button')
const popupCloseEditButton = popupEditElement.querySelector('.popup__close')
const popupAddElement = document.getElementById('popup-add-post')
const popupOpenAddButton = document.querySelector('.profile__add-button')
const popupCloseAddButton = popupAddElement.querySelector('.popup__close')
const popupAddSaveButton = popupAddElement.querySelector('.popup__save')
const popupImage = document.getElementById('popup-image')
const popupCloseImageButton = popupImage.querySelector('.popup__close')
const formAddElement = popupAddElement.querySelector('#add-post-form')

const nameInput = popupEditElement.querySelector('#edit-profile-form input[name="name"]')
const jobInput = popupEditElement.querySelector('#edit-profile-form input[name="job"]')
const formEditElement = popupEditElement.querySelector('#edit-profile-form')
const nameProfile = document.querySelector('.profile__title')
const jobProfile = document.querySelector('.profile__subtitle')

const image = document.querySelector('.popup__image');
const imageSubtitle = document.querySelector('.popup__image-title')


const openPopup = (popup) => {
  popup.classList.add('popup_open')
  document.addEventListener('keydown', closePopupByEsc)
  document.addEventListener('click', closePopupByClick)
}

const openImagePopup = function() {
  openPopup(popupImage)
}

const openEditPopup = function() {
  nameInput.value = nameProfile.textContent
  jobInput.value = jobProfile.textContent
  declineValidation(formEditElement, validationConfig)
  openPopup(popupEditElement)
}

const openAddPopup = function() {
  formAddElement.reset()
  declineValidation(formAddElement, validationConfig)
  openPopup(popupAddElement)
}

const closePopup = (popup) => {
  popup.classList.remove('popup_open')
  document.removeEventListener('keydown', closePopupByEsc)
  document.removeEventListener('click', closePopupByClick)
}

const openCardPopup = function() {
  openPopup()
}

const closePopupByEsc = function(e) {
    if (e.key ==='Escape') closePopup(document.querySelector('.popup_open'))
}

const closePopupByClick = function(e) {
    if (e.target.classList.contains('popup')) closePopup(e.target)
    if (e.target.classList.contains('popup__close')) closePopup(e.target.closest('.popup'))
}

function handleEditFormSubmit(evt) {
  evt.preventDefault()
  nameProfile.textContent = nameInput.value
  jobProfile.textContent = jobInput.value
  closePopup(popupEditElement)
}

function setImageData(name, link) {
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
  cardPic.alt = cardTitle.textContent
  card.querySelector('.popup__delete-btn').addEventListener('click', () => {
    card.remove()
  })
 const likeButton = card.querySelector('.element__like-button')
    likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like-button_active') 
  })
  cardPic.addEventListener('click', () => {
    setImageData(name, link)
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


const nameAddInput = popupAddElement.querySelector('#add-post-form input[name="postName"]')
const linkAddInput = popupAddElement.querySelector('#add-post-form input[name="postLink"]')


function handleAddFormSubmit(evt) {
  evt.preventDefault()
  const newCard = createCard({
    name: nameAddInput.value, 
    link: linkAddInput.value
  })
  сardsContainer.prepend(newCard)
  closePopup(popupAddElement)
  nameAddInput.value ='';
  linkAddInput.value = '';
}


formAddElement.addEventListener('submit', handleAddFormSubmit)
formEditElement.addEventListener('submit', handleEditFormSubmit)
popupOpenEditButton.addEventListener('click', openEditPopup)
popupOpenAddButton.addEventListener('click', openAddPopup)


