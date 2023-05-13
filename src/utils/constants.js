const popupEditProfile = document.querySelector('#popup-edit-profile');


const editForm = document.querySelector('#edit-profile-form');
const nameInput = popupEditProfile.querySelector('[name="name"]');
const jobInput = popupEditProfile.querySelector('[name="about"]');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const userNameSelector = '.profile__title'; //записал по селектору
const userJobSelector = '.profile__subtitle';
const userAvatarSelector = '.profile__avatar';

const addForm = document.querySelector('#add-card-form');

const avatarForm = document.querySelector('#update-avatar-form')

const popupUpdateAvatar = document.querySelector('#popup-avatar-update')
const buttonSwitchAvatar = document.querySelector('.profile__avatar-button')

const popupWithConfirmation = document.querySelector('#popup-with-confirmation')
const confirmationForm = document.querySelector('.confirmation-form')

const buttonDeleteCard = document.querySelector('.element__delete-btn') 


export {
    editForm,
    nameInput,
    jobInput,
    buttonEditProfile,
    buttonAddCard,
    userNameSelector,
    userJobSelector,
    addForm,
    popupUpdateAvatar,
    buttonSwitchAvatar,
    avatarForm,
    userAvatarSelector,
    popupWithConfirmation,
    confirmationForm,
    buttonDeleteCard
}