import {Card} from './card.js';
import {Section} from './section.js';
import {FormValidator} from './FormValidator.js';
import {showPopup, closePopup} from './utilits.js';
import{configForm, initialCards, elementsList} from './constants.js';







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

function renderCard(item) {
	const card = new Card(item, '#element');
	// Создаём карточку и возвращаем наружу
	return card.generateCard();
}

function selectPopup (e){
return e.target.closest('.popup');
}

function formSubmitHandlerAdd(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	
	const elementItem = {
		link: '',
		name: ''
	};

	elementItem.link = linkAddInput.value;
	elementItem.name = nameAddInput.value;

	// отображаем на странице
	const newElement = renderCard(elementItem);
	elementsList.prepend(newElement);

	closePopup(selectPopup(evt));
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
	//closePopup(evt.target.closest('.popup'));
	closePopup(selectPopup(evt));
}



elementAdd.addEventListener('click', openAddElement);
elementEdit.addEventListener('click', openEditElement);

formAddElement.addEventListener('submit', formSubmitHandlerAdd);
formEditElement.addEventListener('submit', formSubmitHandler);



elementCloseList.forEach(function (item){
	item.addEventListener('click', ()=> closePopup(item.closest('.popup')));
});



const cardList = new Section({
	data: initialCards,
	renderer: (item) => {
		const card = new Card(item, '#element');
		const cardElement = card.generateCard();
		cardList.setItem(cardElement);
		},
	},
	elementsList
);

cardList.renderItems();