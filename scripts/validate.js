const checkInputValidity = (input, config) => {
    
    if(input.validity.valid) {
        hideError(input, config)
    } else {
        showError(input, config)
    }
}

const toggleButtonState = (inputs, saveButton, config) => {
    const isFormValid = inputs.every(input => input.validity.valid)     

    if(isFormValid) {
        saveButton.classList.remove(config.inactiveButtonClass)
        saveButton.disabled = ''
    } else {
        saveButton.classList.add(config.inactiveButtonClass)
        saveButton.disabled = 'disabled'
    }
}

const enableValidation = (config) => {
    const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config

    const forms = [...document.querySelectorAll(formSelector)]

    forms.forEach(form => {
        const inputs = [...form.querySelectorAll(inputSelector)]
        const saveButton = form.querySelector(submitButtonSelector)
    
        form.addEventListener('submit', (e) => {
            e.preventDefault()
    
        })
    
        inputs.forEach(input => {
            input.addEventListener('input', () => {    
            checkInputValidity(input, restConfig)
            toggleButtonState(inputs, saveButton, restConfig)         
            })
        })
    })
}

const showError = (input, config) => {
    const error = document.querySelector(`#${input.name}-error`)
    error.textContent = input.validationMessage
    error.classList.add(config.errorClass)
    input.classList.add(config.inputErrorClass) 
}

const hideError = (input, config) => {
    const error = document.querySelector(`#${input.name}-error`)
    error.classList.remove(config.errorClass)
    input.classList.remove(config.inputErrorClass)
}

const declineValidation = (form, config) => {
    const inputs = [...form.querySelectorAll(config.inputSelector)]
    const saveButton = form.querySelector(config.submitButtonSelector)
    toggleButtonState(inputs, saveButton, config) 
    inputs.forEach(input => {
        hideError(input, config)
    })
} 

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


enableValidation(validationConfig); 


 

