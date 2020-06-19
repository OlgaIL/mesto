function showEditPopup() {
    let EditForm = document.querySelector('.popup');
    EditForm.classList.toggle('popup_opened');
    if(EditForm.classList.contains('popup_opened')) InitEditPopup();
}

let elementEdit = document.querySelector('.lead__edit-button');
elementEdit.addEventListener('click', showEditPopup);

let elementClose = document.querySelector('.form__close');
elementClose.addEventListener('click', showEditPopup);

// Находим форму в DOM
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.lead__name');
let jobInput = document.querySelector('.lead__text');

function InitEditPopup(){
	formElement['pro-name'].value=nameInput.textContent;
	formElement['pro-text'].value=jobInput.textContent;
}


function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	jobInput.textContent =  formElement['pro-text'].value;
	nameInput.textContent  = formElement['pro-name'].value;
	showEditPopup();
}

formElement.addEventListener('submit', formSubmitHandler);
