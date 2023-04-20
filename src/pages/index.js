import './index.css';
import Card from '../components/Card.js' 
import FormValidator from '../components/FormValidator.js' 
import Section from '../components/Section.js';
import initialCards from '../utils/cards.js'
import {validationConfig} from '../utils/validate.js' 
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const editProfilePopup = document.querySelector('#popup-edit-profile');

const editForm = document.querySelector('#edit-profile-form');
const nameInput = editProfilePopup.querySelector('[name="name"]');
const jobInput = editProfilePopup.querySelector('[name="job"]');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const userNameSelector = '.profile__title'; //записал по селектору
const userJobSelector = '.profile__subtitle';

const addForm = document.querySelector('#add-card-form');

const addFormValidator = new FormValidator(validationConfig, addForm)
const editFormValidator = new FormValidator(validationConfig, editForm)

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
  editFormValidator.resetValidation();
};

function handleOpenAddCardPopup() {
  addPopup.open();
  addForm.reset();
  addFormValidator.resetValidation();
};

editProfileButton.addEventListener('click', handleOpenEditPopup);
addCardButton.addEventListener('click', handleOpenAddCardPopup);

cardContainer.renderItems()

function createCard(cardData) { 
    const newCard = new Card(cardData, '#initial-cards-template', handleCardClick) 
    return newCard.createCard()
};

function handleCardClick(link, name) {
  imagePopup.open(link, name);
};

addFormValidator.enableValidation();
editFormValidator.enableValidation();