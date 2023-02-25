

export default class FormValidator {

    constructor(config, formElement) {
        this._inactiveButtonClass = config.inactiveButtonClass
        this._inputErrorClass = config.inputErrorClass
        this._errorClass = config.errorClass

        this._formElement = formElement
        this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector))
        this._buttonElement = this._formElement.querySelector(config.submitButtonSelector)
    }

    _checkInputValidity(inputElement) {
        if(inputElement.validity.valid) {
            this._hideInputError(inputElement)
        } else {
            this._showInputError(inputElement)
        }
    }

    _getInvalidInput() {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid
        })
    }

    _showInputError(inputElement){
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`)

        inputElement.classList.add(this._inputErrorClass)
        errorElement.textContent = inputElement.validationMessage
        errorElement.classList.add(this._errorClass)
        console.log('+')
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`)

        errorElement.classList.remove(this._errorClass)
        errorElement.textContent = ''
        inputElement.classList.remove(this._inputErrorClass)
        console.log('-')
    }

    _enableSubmitButton = () => {
        this._buttonElement.classList.remove(this._inactiveButtonClass)
        this._buttonElement.disabled = false

    }

    _disableSubmitButton = () => {
        this._buttonElement.classList.add(this._inactiveButtonClass)
        this._buttonElement.disabled = true
    }

    _toggleButtonState(inputList) { 
        if (this._getInvalidInput(inputList)) {
            this._disableSubmitButton()
        } else {
            this._enableSubmitButton()
        }
    }

    _setEventListeners() {            
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState(this._inputList, this._buttonElement)
            })
        })
    }
    
    enableValidation() {
        this._setEventListeners()
    }

    declineValidation() {
        this._inputList.forEach((input) => {
            this._hideInputError(input)
        })
        this._toggleButtonState()
    }
}

// // const checkInputValidity = (input, config) => {
    
// //     if(input.validity.valid) {
// //         hideError(input, config)
// //     } else {
// //         showError(input, config)
// //     }
// // }

// // const toggleButtonState = (inputs, saveButton, config) => {
// //     const isFormValid = inputs.every(input => input.validity.valid)     

// //     if(isFormValid) {
// //         saveButton.classList.remove(config.inactiveButtonClass)
// //         saveButton.disabled = ''
// //     } else {
// //         saveButton.classList.add(config.inactiveButtonClass)
// //         saveButton.disabled = 'disabled'
// //     }
// // }

// const enableValidation = (config) => {
//     const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config

//     const forms = [...document.querySelectorAll(formSelector)]

//     forms.forEach(form => {
//         const inputs = [...form.querySelectorAll(inputSelector)]
//         const saveButton = form.querySelector(submitButtonSelector)
    
//         form.addEventListener('submit', (e) => {
//             e.preventDefault()
    
//         })
    
//         inputs.forEach(input => {
//             input.addEventListener('input', () => {    
//             checkInputValidity(input, restConfig)
//             toggleButtonState(inputs, saveButton, restConfig)         
//             })
//         })
//     })
// }

// const showError = (input, config) => {
//     const error = document.querySelector(`#${input.name}-error`)
//     error.textContent = input.validationMessage
//     error.classList.add(config.errorClass)
//     input.classList.add(config.inputErrorClass) 
// }

// const hideError = (input, config) => {
//     const error = document.querySelector(`#${input.name}-error`)
//     error.classList.remove(config.errorClass)
//     input.classList.remove(config.inputErrorClass)
// }

// const declineValidation = (form, config) => {
//     const inputs = [...form.querySelectorAll(config.inputSelector)]
//     const saveButton = form.querySelector(config.submitButtonSelector)
//     toggleButtonState(inputs, saveButton, config) 
//     inputs.forEach(input => {
//         hideError(input, config)
//     })
// } 



// enableValidation(validationConfig); 


 

