
const imgPopup =  document.querySelector('.popup__image');
const selectImagePopup = imgPopup.closest('.popup');

const ImgCaption = document.querySelector('.popup__caption');
const elementsList = document.querySelector('.elements__list'); // список карточек

const formAddElement = document.querySelector('.form_type_add');
const formEditElement = document.querySelector('.form');
const formDeleteElement = document.querySelector('.form_type_delete');
const formAvatarElement = document.querySelector('.form_type_avatar');

const selectEditPopup = document.querySelector('.popup');
const selectAddPopup = formAddElement.closest('.popup');
const selectDelPopup = formDeleteElement.closest('.popup');
const selectAvatarPopup = formAvatarElement.closest('.popup');

const nameEditInput = formEditElement['name'];
const textEditInput = formEditElement['about'];
const linkAvatarInput = formAvatarElement['link'];


const userTextInfo  = {
	name: document.querySelector('.lead__name'),
    about: document.querySelector('.lead__text'),
    avatar: document.querySelector('.lead__avatar')
}

export {imgPopup, selectImagePopup, ImgCaption, elementsList, formAddElement, formEditElement, selectEditPopup, selectAddPopup, formDeleteElement, selectDelPopup};
export {formAvatarElement, selectAvatarPopup, linkAvatarInput};
export{nameEditInput, textEditInput, userTextInfo};

const configForm = {
    inputSelector: '.form__edt-text',
	submitSelector: '.form__submit',
	disableSubmitClass: 'form__submit_disable',
	inputErrorClass: 'form__edt-text_type_error'
};

export {configForm};