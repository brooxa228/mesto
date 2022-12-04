const popupElement = document.querySelector('.popup')
const popupAddElement = document.querySelector('.popup_add-element')
const popupAddCloseButton = document.querySelector('.popup__close')
const popupAddOpenButton = document.querySelector('.profile__add-button')
let userName = 'Жак-Ив Кусто'
let userJob = 'Исследователь океана'
const postsWrapper = document.querySelector('#posts')
const galleryWrapper = document.querySelector('#gallery')

const posts = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      like: false
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      like: false
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      like: false
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      like: false
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      like: false
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      like: false
    }
  ]; 


function openModal(element) {
    const modalWindow = document.querySelector(element)
    modalWindow.classList.add('popup_open')
    render() 
}


function openImage(postId) {
    const openImageLink = posts[postId].link
    const openImageName =  posts[postId].name
    const galleryHtml = `
      <img src="${openImageLink}" class="popup__image" alt="${openImageName}">
      <p class="popup__image-title">${openImageName}</p>
      <button class="popup__close" type="button" onclick="closeModal('#popup-image-container')"></button>
    `
    galleryWrapper.innerHTML =  galleryHtml
    openModal('#popup-image-container')
}



function closeModal(element) {
    const modalWindow = document.querySelector(element)
    modalWindow.classList.remove('popup_open')
}


const editProfileForm = document.querySelector('#edit-profile-form')
const nameInput = document.querySelector('#edit-profile-form input[name="name"]')
const jobInput = document.querySelector('#edit-profile-form input[name="job"]')
const addPostForm = document.querySelector('#add-post-form')
const postNameInput = document.querySelector('#add-post-form input[name="postName"]')
const postLinkInput = document.querySelector('#add-post-form input[name="postLink"]')



function addPost(evt) {
    evt.preventDefault(); 
    const newPost = {
        name: postNameInput.value ,
        link: postLinkInput.value ,
        like: false
      };
    posts.unshift(newPost)  
    render()
    closeModal('#popup-add-post')
    postNameInput.value = ''
    postLinkInput.value = ''
}

addPostForm.addEventListener('submit', addPost); 

function saveProfile(evt) {
    evt.preventDefault();
    userName = nameInput.value 
    userJob = jobInput.value 
    render()
    closeModal('#popup-edit-profile')
}

editProfileForm.addEventListener('submit', saveProfile); 



const userNameElement = document.querySelector('.profile__title')
const userJobElement = document.querySelector('.profile__subtitle')

function render () {
    
    userNameElement.textContent = userName
    userJobElement.textContent = userJob
    nameInput.value = userName
    jobInput.value = userJob
    
    let postListHtml = '';
    if (posts.length === 0) {
        postListHtml = `<p>Посты отсутствуют</p>`
    } else {
        posts.forEach((post, key) => {
            let likeClass = post.like ? 'element__like-button_active' : '' 
            postListHtml += `
            <div class="element">
              <img src="${post.link}" alt="${post.name}" class="element__pic" onclick="openImage(${key})">
              <div class="element__like-container">
                <h3 class="element__title">${post.name}</h3>
                <button class="element__like-button ${likeClass}" type="button" onclick="likePost(${key})"></button>
              </div>  
              <button class="element__delete-button" type="button" onclick="removePost(${key})"></button>
            </div>`
        })
    }
    postsWrapper.innerHTML = postListHtml
}

function removePost(postId) {
    posts.splice(postId, 1)
    render()
}

function likePost(postId) {
    posts[postId].like = !posts[postId].like
    render()
}

render()

const popupImageContainer = document.querySelector('#popup-image-container')
const popupImage = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__image-title')
