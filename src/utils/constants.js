const popupEditProfile = document.querySelector('#popup-edit-profile');

const editForm = document.querySelector('#edit-profile-form');
const nameInput = popupEditProfile.querySelector('[name="name"]');
const jobInput = popupEditProfile.querySelector('[name="job"]');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const userNameSelector = '.profile__title'; //записал по селектору
const userJobSelector = '.profile__subtitle';

const addForm = document.querySelector('#add-card-form');

export {
    editForm,
    nameInput,
    jobInput,
    buttonEditProfile,
    buttonAddCard,
    userNameSelector,
    userJobSelector,
    addForm,
}