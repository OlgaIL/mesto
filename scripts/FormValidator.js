export class FormValidator {

	constructor(configForm, formSelector) {

        this._formSelector = document.querySelector(formSelector);
		this._inputSelector = configForm.inputSelector;
		this._submitSelector  = configForm.submitSelector;
		this._disableSubmitClass = configForm.disableSubmitClass;
		this._inputErrorClass = configForm.inputErrorClass;
		
	}


	_getInputList(){
	return Array.from(this._formSelector.querySelectorAll(this._inputSelector));
	}

	_getButton(){
		return this._formSelector.querySelector(this._submitSelector);
	}

	_hasInvalidInput () {
		const inputList = this._getInputList();
		// проходим по этому массиву методом some
		//const formSelectElement = document.querySelector(this._formSelector);
		//const inputList = Array.from(formSelectElement.querySelectorAll(this._inputSelector));

		return inputList.some((inputElement) => {
			// Если поле не валидно, колбэк вернёт true - Обход массива прекратится и вся фунцкция  вернёт true
			return !inputElement.validity.valid;
		});
	}

	_toggleButtonState () {
		const buttonSubmit = this._getButton();
		// Если есть хотя бы один невалидный инпут
		if (this._hasInvalidInput()) {
			// сделай кнопку неактивной
			buttonSubmit.classList.add(this._disableSubmitClass);
			buttonSubmit.setAttribute("disabled", "true");
		} else {
			// иначе сделай кнопку активной
			buttonSubmit.classList.remove(this._disableSubmitClass);
			buttonSubmit.removeAttribute("disabled");
		}
	}

	_checkInputValidity (inputElement) {
		//const inputElement = this._getInputList();

		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_showInputError (inputElement, errorMessage) {
		// Находим элемент ошибки внутри самой функции
		const errorElement = this._formSelector.querySelector(`#${inputElement.name}-error`);
		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = errorMessage;
	}


	_hideInputError (inputElement) {
		// Находим элемент ошибки
		const errorElement = this._formSelector.querySelector(`#${inputElement.name}-error`);
		inputElement.classList.remove(this._inputErrorClass);
		errorElement.textContent = '';
	}


	enableValidation () {
		const inputList =this._getInputList();
		//	const buttonSubmit = this._getButton();

		this._toggleButtonState();
		this._formSelector.addEventListener('submit', (evt) => {
					evt.preventDefault();
		});

		inputList.forEach((inputElement) => {
			// каждому полю добавим обработчик события input
			inputElement.addEventListener('input', () => {
				// Внутри колбэка вызовем checkInputValidity,
					this._checkInputValidity(inputElement);
					this._toggleButtonState();
				});
			});
	}

	clearError () {
		const inputList =this._getInputList();
		inputList.forEach((inputElement) => {
			this._hideInputError(inputElement);
		});
		// и проверить статус кнопки
		const buttonSubmit = this._getButton();
		this._toggleButtonState();
	}


}


