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


// Находим кнопки в DOM
const elementEdit = document.querySelector('.lead__edit-button');
const elementAdd = document.querySelector('.lead__add-button');
const formElement = document.querySelector('.form');
const nameEditInput = formElement['profile-name'];
const textEditInput = formElement['profile-text'];

const formAddElement = document.querySelector('.form_type_add');
const linkAddInput = formAddElement['card-link'];
const nameAddInput = formAddElement['card-name'];

const imgPopup =  document.querySelector('.popup__image');
const elementCloseList = document.querySelectorAll('.form__close');

const elementTemplate = document.querySelector('#element').content;
const elementsList = document.querySelector('.elements__list');


// Находим тексты в DOM  -?? переименовать?
const nameInput = document.querySelector('.lead__name');
const jobInput = document.querySelector('.lead__text');
const ImgCaption = document.querySelector('.popup__caption');

function formSubmitHandlerADD(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	
	const elementItem = {
		link: '',
		name: ''
	};

	elementItem.link = linkAddInput.value;
	elementItem.name = nameAddInput.value;

	// отображаем на странице
	let newElement = newElementInit(elementItem);
	elementsList.prepend(newElement);
	showclosePopup(evt.target.closest('.popup'));
}

function newElementInit(item) {
	let newItem = elementTemplate.cloneNode(true);
	let cardImageElement = newItem.querySelector('.element__image');
	let cardTitleElement = newItem.querySelector('.element__title');

	// наполняем содержимым
	cardImageElement.src = item.link;
	cardImageElement.alt =  item.name;
	cardTitleElement.textContent = item.name;

	//addListeners(newItem);
	newItem.querySelector('.element__delete').addEventListener('click', elementDelete);
	newItem.querySelector('.element__like').addEventListener('click', elementLike);
	newItem.querySelector('.element__image').addEventListener('click', bigImageInit);
	return newItem;
}

function bigImageInit(e) {
	const selectPopup = imgPopup.closest('.popup');
	const imgObj = e.target;
	imgPopup.src=imgObj.src;
	imgPopup.alt=imgObj.alt;
	ImgCaption.textContent = imgObj.alt;
	showclosePopup(selectPopup);
}

function showPopup(e){
	showclosePopup(e.target.closest('.popup'));
}

function showclosePopup(obj) {
	obj.classList.toggle('popup_opened'); 
}

function addElement(e) {
	const selectPopup = formAddElement.closest('.popup');
	formAddElement.reset();
	showclosePopup(selectPopup);
}

function editElement(e) {
	const selectPopup = document.querySelector('.popup');
	InitEditPopup();
	showclosePopup(selectPopup);
}

function InitEditPopup() {
	nameEditInput.value=nameInput.textContent;
	textEditInput.value=jobInput.textContent;
}

function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	jobInput.textContent =  textEditInput.value;
	nameInput.textContent  = nameEditInput.value;
	showclosePopup(evt.target.closest('.popup'));
}

function elementDelete(e) {
	const element = e.target.closest('.element');
	element.remove();
}

function elementLike(e) {
	const element = e.target;
	element.classList.toggle('element__like_active');
	
}

initialCards.forEach(function (item) {
	// клонируем содержимое тега template
	let newElement = newElementInit(item);
	// отображаем на странице
	elementsList.append(newElement);
});

elementAdd.addEventListener('click', addElement);
elementEdit.addEventListener('click', editElement);

formAddElement.addEventListener('submit', formSubmitHandlerADD);
formElement.addEventListener('submit', formSubmitHandler);

elementCloseList.forEach(function (item){
	item.addEventListener('click', showPopup);
});