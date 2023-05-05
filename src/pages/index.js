import './index.css';
import Card from '../components/Card.js' 
import FormValidator from '../components/FormValidator.js' 
import Section from '../components/Section.js';
import initialCards from '../utils/cards.js'
import {validationConfig} from '../utils/validate.js' 
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  editForm,
  nameInput,
  jobInput,
  buttonEditProfile,
  buttonAddCard,
  userNameSelector,
  userJobSelector,
  addForm,
} from '../utils/constants.js'

const formValidatorAddCard = new FormValidator(validationConfig, addForm)
const formValidatorEditProfile = new FormValidator(validationConfig, editForm)

const cardContainer = new Section({items: initialCards, renderer: createCard}, '.elements__list')

const addPopup = new PopupWithForm('#popup-add-card', handleAddFormSubmit);
addPopup.setEventListeners(); 

const editPopup = new PopupWithForm('#popup-edit-profile', handleEditFormSubmit);
editPopup.setEventListeners(); 

const imagePopup = new PopupWithImage('#popup-image');
imagePopup.setEventListeners(); 

const user = new UserInfo({userNameSelector, userJobSelector}); //передал селектор

function handleEditFormSubmit(userData) {
  user.setUserInfo(userData);
};

function handleAddFormSubmit(cardData) {
  const cardElement = createCard(cardData); 
  cardContainer.addItem(cardElement);
};

function handleOpenEditPopup() {
  editPopup.open();
  const {name, job} = user.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  formValidatorEditProfile.resetValidation();
};

function handleOpenAddCardPopup() {
  addPopup.open();
  addForm.reset();
  formValidatorAddCard.resetValidation();
};

buttonEditProfile.addEventListener('click', handleOpenEditPopup);
buttonAddCard.addEventListener('click', handleOpenAddCardPopup);

cardContainer.renderItems()

function createCard(cardData) { 
    const newCard = new Card(cardData, '#initial-cards-template', handleCardClick) 
    return newCard.createCard()
};

function handleCardClick(link, name) {
  imagePopup.open(link, name);
};

formValidatorAddCard.enableValidation();
formValidatorEditProfile.enableValidation();