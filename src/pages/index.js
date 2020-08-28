import './index.css'; 
import {Card} from '../components/card.js';
import {Section} from '../components/section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupDelete} from '../components/PopupDelete.js';

import {FormValidator} from '../components/FormValidator.js';
import {UserInfo} from '../components/UserInfo.js';
import{configForm, elementsList, selectImagePopup, imgPopup, ImgCaption, formAddElement, formEditElement, selectEditPopup, selectDelPopup, formDeleteElement, selectAddPopup, userTextInfo, nameEditInput, textEditInput} from '../scripts/constants.js';
import {formAvatarElement, selectAvatarPopup, linkAvatarInput} from '../scripts/constants.js';

import {Api} from '../components/api.js';

/**  Находим кнопки в DOM */
const elementEdit = document.querySelector('.lead__edit-button');
const elementAdd = document.querySelector('.lead__add-button');
const elementEditAvatar= document.querySelector('.lead__avatar-cover');



/** валидация */
const  formValidEdit = new FormValidator(configForm, '.form');
formValidEdit.enableValidation();
const  formValidAdd = new FormValidator(configForm, '.form_type_add');
formValidAdd.enableValidation();
const formAvatarEdit =  new FormValidator(configForm, '.form_type_avatar');
formAvatarEdit.enableValidation();

/** создаем объект  окна с формой добавления карточки */
const addFormPopup = new PopupWithForm(selectAddPopup, {
		formSelector: formAddElement,
		handleFormSubmit: (formData) => {
				/**  при создании экземпляра передаём  ему объект с данными формы */
				preLoader(true, selectAddPopup);
				api.createCard(formData)
				.then((result) => {
					const newCardElment = new Section({data:[]}, elementsList);
					newCardElment.addItem(renderCard(result, newUser.userId));
					addFormPopup.close();
				})
				.catch(err=>console.log(err))
				.finally(() => preLoader(false, selectAddPopup));
		}
	});


const editAvatarPopup = new PopupWithForm (selectAvatarPopup, {
	formSelector: formAvatarElement,
	handleFormSubmit: (formData) => {
		preLoader(true, selectAvatarPopup);
		/** при создании экземпляра передаём  ему объект с данными формы */
		api.putAvatarInfo(formData.link)
		.then(() =>{ 
			newUser.setAvatar({avatar : formData.link});
			editAvatarPopup.close();
			
		})
		.catch(err=>console.log(err))
		.finally(() => preLoader(false, selectAvatarPopup));
	}
});

/** создаем объект  окна с формой редактирования */
const editFormPopup = new PopupWithForm(selectEditPopup, {
	formSelector: formEditElement,
	handleFormSubmit: (formData) => {
		preLoader(true, selectEditPopup);
		/** при создании экземпляра передаём  ему объект с данными формы */
		api.putUserInfo(formData)
		.then(() =>{ 
			newUser.setUserInfo(formData);
			editFormPopup.close();
		})
		.catch(err=>console.log(err))
		.finally(()=>preLoader(false, selectEditPopup));
	}
});

const deleteFormPopup= new PopupDelete(selectDelPopup, {
	formSelector: formDeleteElement
});

		

const popupImg = new PopupWithImage(selectImagePopup, ImgCaption, imgPopup);
popupImg.setEventListeners();


const renderCard = (item, userId) => {
	const card = new Card({
		data: item, 
		handleCardClick: () => {
				popupImg.open(item);
		},
		handleLikeClick: () => {
			if(card.islikeMe()){
				api.deleteLike(item._id)
					.then((result) =>card.likeElement(result.likes))
					.catch(err=>console.log(err));
			}else{
				api.putLike(item._id)
					.then((result) =>card.likeElement(result.likes))
					.catch(err=>console.log(err));
			};
		},

		handleDeleteClick: () => {
			// здесь будет функция про delete
			deleteFormPopup.open();
			deleteFormPopup.setHandlerSubmut(() => {
				preLoader(true, selectDelPopup);
				api.deleteCard(item._id)
				.then(() =>{ 
					card.deleteElement();
					deleteFormPopup.close();
				})
				.catch(err=>console.log(err))
				.finally(() =>preLoader(false, selectDelPopup));
			});
		},
	}, userId, '#element');
	/** Создаём карточку и возвращаем наружу */
	return card.generateCard();
}

function preLoader (load, popupSelector) {
	const selectSubmit = popupSelector.querySelector('.form__submit');
	if(popupSelector === selectDelPopup){
		selectSubmit.value = load ? 'Удаляется...' : 'Да';
		}else{
		selectSubmit.value = load ? 'Сохраняется...' : 'Сохранить';
	}
}

function openAddElement (e) {
	formValidAdd.clearError();
	addFormPopup.open();
}

function openEditAvatarElement(e){
	formAvatarEdit.clearError();
	linkAvatarInput.value = newUser.getAvatar().link;
	editAvatarPopup.open();
}

function openEditElement (e) {
	formValidEdit.clearError();
	nameEditInput.value = newUser.getUserInfo().userName;
	textEditInput.value = newUser.getUserInfo().userDescription;
	editFormPopup.open();
}


elementAdd.addEventListener('click', openAddElement);
elementEdit.addEventListener('click', openEditElement);
elementEditAvatar.addEventListener('click', openEditAvatarElement);


addFormPopup.setEventListeners();
editFormPopup.setEventListeners();
deleteFormPopup.setEventListeners();
editAvatarPopup.setEventListeners();

/** 	Токен: b5b09145-9ffa-43dc-a8a7-afd53c9e00bd
		Идентификатор группы: cohort-14
*/

const api= new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/',
	headers: {
		authorization: 'b5b09145-9ffa-43dc-a8a7-afd53c9e00bd',
		'Content-Type': 'application/json'
	}
});

const newUser = new UserInfo(userTextInfo);

Promise.all([api.getInitialUser(),api.getInitialCards()])
	.then((result) =>{
		const [userInfo, items] = result;
		newUser.setUserInfo(userInfo);
		newUser.setAvatar(userInfo);
	
		const cardList = new Section({
			data: items,
			renderer: (item) => {
				cardList.setItem(renderCard(item, newUser.userId));
				},
			},
			elementsList
		);
		cardList.renderItems();
	})
	.catch(err=>console.log(err));








