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
const AddForm = document.querySelector('.form_type_add');
const ImgPopup =  document.querySelector('.popup__image');
const elementClose = document.querySelectorAll('.form__close');

const elementTemplate = document.querySelector('#element').content;
const elementsList = document.querySelector('.elements__list');


// Находим тексты в DOM
const nameInput = document.querySelector('.lead__name');
const jobInput = document.querySelector('.lead__text');

let SelectPopup={}; //выбранный попап 


function formSubmitHandlerADD(evt){
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	const ImgValidate =  AddForm['pro-link'].value;
//мини-валидация
	if (AddForm['pro-name'].value==='') return false;
	if(!(ImgValidate.startsWith('http') && (ImgValidate.endsWith('.jpg') || ImgValidate.endsWith('.png') || ImgValidate.endsWith('.gif') || ImgValidate.endsWith('.svg')))) {
		AddForm['pro-link'].value='';
		return false;}
	
	let elementItem = {
		link: '',
		name: ''
	};

	elementItem.link = AddForm['pro-link'].value;
	elementItem.name = AddForm['pro-name'].value;

let newElement = elementTemplate.cloneNode(true);
// отображаем на странице
newElementInit(newElement, elementItem);
elementsList.prepend(newElement);
showclosePopup(SelectPopup);
}


function newElementInit(newItem, item){
// наполняем содержимым
newItem.querySelector('.element__image').src = item.link;
newItem.querySelector('.element__image').alt =  item.name;
newItem.querySelector('.element__title').textContent = item.name;
addListeners(newItem);
}


function showEditPopup() {
    let EditForm = document.querySelector('.popup');
	EditForm.classList.toggle('popup_opened');

}


function showPopup(e){
	showclosePopup(SelectPopup);
}

function showclosePopup(obj){
	obj.classList.toggle('popup_opened'); 
}


function addElement(e){
	SelectPopup = AddForm.closest('.popup');
	AddForm.reset();
	showclosePopup(SelectPopup);
}

function editElement(e){
	SelectPopup = document.querySelector('.popup');
	InitEditPopup();
	showclosePopup(SelectPopup);
}

function ShowImage(e){
	SelectPopup = ImgPopup.closest('.popup');
	bigImageInit(e.target);
	showclosePopup(SelectPopup);
}

function bigImageInit(imgObj){
	ImgPopup.src=imgObj.src;
	ImgPopup.alt=imgObj.alt;
	let ImgCaption = SelectPopup.querySelector('.popup__caption');
	ImgCaption.textContent = imgObj.alt;

}



function InitEditPopup(){
	formElement['pro-name'].value=nameInput.textContent;
	formElement['pro-text'].value=jobInput.textContent;
}


function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	jobInput.textContent =  formElement['pro-text'].value;
	nameInput.textContent  = formElement['pro-name'].value;
	showclosePopup(SelectPopup);
}




function addListeners(element) {
	element.querySelector('.element__delete').addEventListener('click', elementDelete);
	element.querySelector('.element__like').addEventListener('click', elementLike);
	element.querySelector('.element__image').addEventListener('click', ShowImage);

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
	let newElement = elementTemplate.cloneNode(true);
	newElementInit(newElement, item);
	// отображаем на странице
	elementsList.append(newElement);
	
	});


elementAdd.addEventListener('click', addElement);
elementEdit.addEventListener('click', editElement);

AddForm.addEventListener('submit', formSubmitHandlerADD);
formElement.addEventListener('submit', formSubmitHandler);

elementClose.forEach(function (item){
	item.addEventListener('click', showPopup);
});