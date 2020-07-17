
function showInputError (formElement, inputElement, errorMessage, inputErrorClass) {
	// Находим элемент ошибки внутри самой функции
	const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
	inputElement.classList.add(inputErrorClass);
	errorElement.textContent = errorMessage;
}

function hideInputError (formElement, inputElement, inputErrorClass) {
	// Находим элемент ошибки
	const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
	inputElement.classList.remove(inputErrorClass);
	errorElement.textContent = '';
}

// Функция checkInputValidity  принимает formElement и inputElement,

function checkInputValidity (formElement, inputElement, inputErrorClass) {
	if (!inputElement.validity.valid) {
		// showInputError  получает параметром форму, в которой находится проверяемое поле, и само это поле
		showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
	} else {
		// hideInputError  получает параметром форму, в которой  находится проверяемое поле, и само это поле
		hideInputError(formElement, inputElement, inputErrorClass);
	}
}


function hasInvalidInput (inputList) {
	// проходим по этому массиву методом some
	return inputList.some((inputElement) => {
		// Если поле не валидно, колбэк вернёт true - Обход массива прекратится и вся фунцкция  вернёт true
		return !inputElement.validity.valid;
	});
}

  // Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

function toggleButtonState (inputList, buttonElement, disableClass) {
	// Если есть хотя бы один невалидный инпут
	if (hasInvalidInput(inputList)) {
		// сделай кнопку неактивной
		buttonElement.classList.add(disableClass);
		buttonElement.setAttribute("disabled", "true");
	} else {
		// иначе сделай кнопку активной
		buttonElement.classList.remove(disableClass);
		buttonElement.removeAttribute("disabled");
	}
}

function initValidation ({formSelectorList, inputSelector, submitSelector, disableSubmitClass, inputErrorClass}) {

	formSelectorList.forEach((FormElement) =>{

		const formSelectElement = document.querySelector(FormElement);
		const inputList = Array.from(formSelectElement.querySelectorAll(inputSelector));
		const buttonSubmit = formSelectElement.querySelector(submitSelector);

		// Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
		toggleButtonState(inputList, buttonSubmit, disableSubmitClass);
		formSelectElement.addEventListener('submit', (evt) => {
				evt.preventDefault();
		});
		
		inputList.forEach((inputElement) => {
			// каждому полю добавим обработчик события input
			inputElement.addEventListener('input', () => {
				// Внутри колбэка вызовем checkInputValidity,
				// передав ей форму и проверяемый элемент
				checkInputValidity(formSelectElement, inputElement, inputErrorClass);
				toggleButtonState(inputList, buttonSubmit, disableSubmitClass);
			});
		});

	});

}

// очистить форму от ошибок

function clearError (formElement) {
	const inputList = Array.from(formElement.querySelectorAll(configForm.inputSelector));
	inputList.forEach((inputElement) => {
		hideInputError(formElement, inputElement, configForm.inputErrorClass);
	});
	// и проверить статус кнопки
	const buttonSubmit = formElement.querySelector(configForm.submitSelector);
	toggleButtonState(inputList, buttonSubmit, configForm.disableSubmitClass);
}
