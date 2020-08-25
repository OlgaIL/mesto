import './index.css'; 

import {Card} from '../components/card.js';
import {Section} from '../components/section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {FormValidator} from '../components/FormValidator.js';
import {UserInfo} from '../components/UserInfo.js';
import{configForm, initialCards, elementsList, selectImagePopup, ImgCaption, formAddElement, formEditElement, selectEditPopup, selectAddPopup, userTextInfo} from '../scripts/constants.js';

// Находим кнопки в DOM
const elementEdit = document.querySelector('.lead__edit-button');
const elementAdd = document.querySelector('.lead__add-button');


const  formValidEdit = new FormValidator(configForm, '.form');
formValidEdit.enableValidation();
const  formValidAdd = new FormValidator(configForm, '.form_type_add');
formValidAdd.enableValidation();


function renderCard(item) {
	const card = new Card({
			data: item, 
			handleCardClick: (item) => {
					const popupImg = new PopupWithImage(selectImagePopup,ImgCaption);
					popupImg.open(item);
					popupImg.setEventListeners(item);
		},
	},
	'#element');
	
	// Создаём карточку и возвращаем наружу
	return card.generateCard();
}

// создаем объект  окна с формой добавления карточки
const addFormPopup = new PopupWithForm(selectAddPopup, {
		formSelector: formAddElement,
		handleFormSubmit: (formData) => {
	// при создании экземпляра передаём
	// ему объект с данными формы
	const newCardElment = new Section({data:[]}, elementsList);
	newCardElment.addItem(renderCard(formData));

		}
	});
addFormPopup.setEventListeners();

const newUser = new UserInfo(userTextInfo);

// создаем объект  окна с формой редактирования
const editFormPopup = new PopupWithForm(selectEditPopup, {
	formSelector: formEditElement,
	handleFormSubmit: (formData) => {
		// при создании экземпляра передаём
		// ему объект с данными формы
		newUser.setUserInfo(formData);

	}
});
editFormPopup.setEventListeners();



function openAddElement (e) {
	formValidAdd.clearError();
	addFormPopup.open();
}

function openEditElement (e) {
	formValidEdit.clearError();
	newUser.getUserInfo();
	editFormPopup.open();
}


elementAdd.addEventListener('click', openAddElement);
elementEdit.addEventListener('click', openEditElement);


const cardList = new Section({
	data: initialCards,
	renderer: (item) => {
		cardList.setItem(renderCard(item));
		},
	},
	elementsList
);
cardList.renderItems();



