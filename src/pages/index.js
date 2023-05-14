import './index.css';
import Card from '../components/Card.js'; 
import FormValidator from '../components/FormValidator.js'; 
import Section from '../components/Section.js';
import initialCards from '../utils/cards.js'
import {validationConfig} from '../utils/validate.js' 
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../utils/api';

import {
  editForm,
  nameInput,
  jobInput,
  buttonEditProfile,
  buttonAddCard,
  userNameSelector,
  userJobSelector,
  addForm,
  buttonSwitchAvatar,
  avatarForm,
  userAvatarSelector,
} from '../utils/constants.js'

import PopupWithConfirmation from '../components/PopupWithConfirmation';

let userId = ''

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '72fdf757-2801-4805-9cb8-fdc4e55a2b8c',
    'Content-Type': 'application/json'
  }
}); 

const user = new UserInfo({userNameSelector, userJobSelector, userAvatarSelector}); //передал селектор

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(userData);
    user.setAvatarInfo(userData);
    userId = userData._id;
    cardContainer.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  }); 


function handleLikeClick(cardId, isLiked, card) {
  api.changeLikeStatus(cardId, isLiked)
    .then(({likes}) => {
      card.updateLikesInfo(likes)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}


const formValidatorAddCard = new FormValidator(validationConfig, addForm)
const formValidatorEditProfile = new FormValidator(validationConfig, editForm)
const formValidatorUpdateAvatar = new FormValidator(validationConfig, avatarForm)

const cardContainer = new Section({items: initialCards, renderer: createCard}, '.elements__list');

const addPopup = new PopupWithForm('#popup-add-card', handleAddFormSubmit, 'Добавление...');
addPopup.setEventListeners(); 

const confirmPopup = new PopupWithConfirmation('#popup-with-confirmation', handleConfirmationFormSubmit)
confirmPopup.setEventListeners();

const editPopup = new PopupWithForm('#popup-edit-profile', handleEditFormSubmit, 'Сохранение...');
editPopup.setEventListeners(); 

const imagePopup = new PopupWithImage('#popup-image');
imagePopup.setEventListeners(); 

const avatarPopup = new PopupWithForm('#popup-avatar-update', handleUpdateAvatarSubmit, 'Сохранение...')
avatarPopup.setEventListeners();

function handleConfirmationFormSubmit(card) {
  card.deleteCard();
  return api.deleteCard(card.getCardId())
    .then(() => {
      card.deleteCard();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

function handleUpdateAvatarSubmit(avatarData) {
  return api.patchAvatarInfo(avatarData)
    .then((avatarData) => {
      user.setAvatarInfo(avatarData);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

function handleEditFormSubmit(userData) {
  return api.patchUserInfo(userData)
    .then((userData) => {
      user.setUserInfo(userData);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
};

function handleAddFormSubmit(cardData) {
  return api.postNewCard(cardData)
    .then((newCard) => {
      const cardElement = createCard(newCard); 
      cardContainer.addItem(cardElement);  
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
};

function handleCardDeleteClick(card) {
  confirmPopup.open(card);
};

function handleOpenEditPopup() {
  editPopup.open();
  const {name, about} = user.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  formValidatorEditProfile.resetValidation();
};


function handleOpenAddCardPopup() {
  addPopup.open();
  addForm.reset();
  formValidatorAddCard.resetValidation();
};


function handleOpenUpdateAvatarPopup() {
  avatarPopup.open();
  avatarForm.reset();
  formValidatorUpdateAvatar.resetValidation();
};


buttonEditProfile.addEventListener('click', handleOpenEditPopup);
buttonAddCard.addEventListener('click', handleOpenAddCardPopup);
buttonSwitchAvatar.addEventListener('click', handleOpenUpdateAvatarPopup);


function createCard(cardData) { 
  const newCard = new Card(cardData, '#initial-cards-template', handleCardClick, handleCardDeleteClick, userId, handleLikeClick); 
  return newCard.createCard();
};


function handleCardClick(link, name) {
  imagePopup.open(link, name);
};


formValidatorAddCard.enableValidation();
formValidatorEditProfile.enableValidation();
formValidatorUpdateAvatar.enableValidation();

