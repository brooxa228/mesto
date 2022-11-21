const popupElement = document.querySelector('.popup')
const popupCLoseButtonElement = popupElement.querySelector('.popup__close')
const popupOpenButtonElement = document.querySelector('.profile__edit-button')

function togglePopupVisibility () {
    popupElement.classList.toggle('profile__open-popup')
}

popupOpenButtonElement.addEventListener('click', togglePopupVisibility); 
popupCLoseButtonElement.addEventListener('click', togglePopupVisibility); 







let formElement = document.querySelector('#popup__form')
let nameInput = document.querySelector('#popup__form input[name="name"]')
let jobInput = document.querySelector('#popup__form input[name="job"]')

function formSubmitHandler (evt) {
    evt.preventDefault();
    userName = nameInput.value 
    userJob = jobInput.value 
    render()
    togglePopupVisibility()
}

formElement.addEventListener('submit', formSubmitHandler); 





let userName = 'Жак-Ив Кусто'
let userJob = 'Исследователь океана'

const userNameElement = document.querySelector('.profile__title')
const userJobElement = document.querySelector('.profile__subtitle')

function render () {
    userNameElement.textContent = userName
    userJobElement.textContent = userJob
}

render()





