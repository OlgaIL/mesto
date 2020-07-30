import {Card} from './card.js';
import {FormValidator} from './FormValidator.js';
import {showPopup, closePopup} from './utilits.js';


const configForm = {
    inputSelector: '.form__edt-text',
	submitSelector: '.form__submit',
	disableSubmitClass: 'form__submit_disable',
	inputErrorClass: 'form__edt-text_type_error'
};

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const elementsList = document.querySelector('.elements__list'); // список карточек

const  formValidEdit = new FormValidator(configForm, '.form');
formValidEdit.enableValidation();
const  formValidAdd = new FormValidator(configForm, '.form_type_add');
formValidAdd.enableValidation();


// Находим кнопки в DOM
const elementEdit = document.querySelector('.lead__edit-button');
const elementAdd = document.querySelector('.lead__add-button');
const formEditElement = document.querySelector('.form');
const nameEditInput = formEditElement['profile-name'];
const textEditInput = formEditElement['profile-text'];
const selectEditPopup = document.querySelector('.popup');


const formAddElement = document.querySelector('.form_type_add');
const linkAddInput = formAddElement['card-link'];
const nameAddInput = formAddElement['card-name'];


const selectAddPopup = formAddElement.closest('.popup');
const elementCloseList = document.querySelectorAll('.form__close');

// Находим тексты в DOM 
const nameInput = document.querySelector('.lead__name');
const jobInput = document.querySelector('.lead__text');



function formSubmitHandlerAdd(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	
	const elementItem = {
		link: '',
		name: ''
	};

	elementItem.link = linkAddInput.value;
	elementItem.name = nameAddInput.value;

	// отображаем на странице
	const card = new Card(elementItem, '#element');
	// Создаём карточку и возвращаем наружу
	const newElement = card.generateCard();
	elementsList.prepend(newElement);
	closePopup(evt.target.closest('.popup'));
}



function openAddElement (e) {
	formAddElement.reset();
	formValidAdd.clearError();
	showPopup(selectAddPopup);
}

function openEditElement (e) {
	initEditPopup();
	formValidEdit.clearError();
	showPopup(selectEditPopup);
}

function initEditPopup () {
	configForm.formSelector = '.form';
	nameEditInput.value=nameInput.textContent;
	textEditInput.value=jobInput.textContent;
}

function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	jobInput.textContent =  textEditInput.value;
	nameInput.textContent  = nameEditInput.value;
	closePopup(evt.target.closest('.popup'));
}



elementAdd.addEventListener('click', openAddElement);
elementEdit.addEventListener('click', openEditElement);

formAddElement.addEventListener('submit', formSubmitHandlerAdd);
formEditElement.addEventListener('submit', formSubmitHandler);



elementCloseList.forEach(function (item){
	item.addEventListener('click', ()=> closePopup(item.closest('.popup')));
});


initialCards.forEach((item) => {
	// Создадим экземпляр карточки
	const card = new Card(item, '#element');
	// Создаём карточку и возвращаем наружу
	const cardElement = card.generateCard();
	// Добавляем в DOM
	elementsList.append(cardElement);
  });