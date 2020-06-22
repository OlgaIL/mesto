const elementEdit = document.querySelector('.lead__edit-button');
const elementClose = document.querySelector('.form__close');


// Находим форму в DOM
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.lead__name');
let jobInput = document.querySelector('.lead__text');


function showEditPopup() {
    let EditForm = document.querySelector('.popup');
    EditForm.classList.toggle('popup_opened');
    if(EditForm.classList.contains('popup_opened')) InitEditPopup();
}


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


elementEdit.addEventListener('click', showEditPopup);
elementClose.addEventListener('click', showEditPopup);
formElement.addEventListener('submit', formSubmitHandler);
