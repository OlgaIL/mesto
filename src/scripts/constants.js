
const imgPopup =  document.querySelector('.popup__image');
const selectImagePopup = imgPopup.closest('.popup');

const ImgCaption = document.querySelector('.popup__caption');
const elementsList = document.querySelector('.elements__list'); // список карточек

const formAddElement = document.querySelector('.form_type_add');
const formEditElement = document.querySelector('.form');


const selectEditPopup = document.querySelector('.popup');
const selectAddPopup = formAddElement.closest('.popup');

const nameEditInput = formEditElement['name'];
const textEditInput = formEditElement['text'];

const userTextInfo  = {
	name: document.querySelector('.lead__name'),
	text: document.querySelector('.lead__text')
}

export {imgPopup, selectImagePopup, ImgCaption, elementsList, formAddElement, formEditElement, selectEditPopup, selectAddPopup};
export{nameEditInput, textEditInput, userTextInfo};

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
export {configForm, initialCards};