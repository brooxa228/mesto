export default class FormValidator{
    constructor(config, formElement) {
        this._formElement = formElement;
        this._inputs = Array.from(this._formElement.querySelectorAll(config.inputSelector));
        this._saveButton = this._formElement.querySelector(config.submitButtonSelector);
        this._config = config;
    }

    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
        this._inputs.forEach(input => {
            input.addEventListener('input', () => {
    
                this._toggleButtonState();
    
                if (input.checkValidity()) {
                    this._hideInputError(input);   
                }
                else {
                    this._showInputError(input);
                };
            });
        });
    }
    
    _toggleButtonState() {
        if (this._checkInputValidity()) {
            this._saveButton.disabled = true;
        } else {
            this._saveButton.disabled = false;
        } 
    }

    _checkInputValidity() {
        return this._inputs.some(input => !input.checkValidity());
    }

    _hideInputError(input) {
        const error = this._formElement.querySelector(`.${input.name}-error`);
        error.classList.remove(this._config.errorClass);
        input.classList.remove(this._config.inputErrorClass);
    }

    _showInputError(input) {
        const error = this._formElement.querySelector(`.${input.name}-error`);
        error.textContent = input.validationMessage;
        error.classList.add(this._config.errorClass);
        input.classList.add(this._config.inputErrorClass);
    }

    resetValidation() {
        this._toggleButtonState();
        this._inputs.forEach(input => {
            this._hideInputError(input);   
        });
    }
}