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
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`)

        errorElement.classList.remove(this._errorClass)
        errorElement.textContent = ''
        inputElement.classList.remove(this._inputErrorClass)
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

    resetValidation() {
        this._inputList.forEach((input) => {
            this._hideInputError(input)
        })
        this._toggleButtonState()
    }
}


 

