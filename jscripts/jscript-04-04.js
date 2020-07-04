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


const elementEdit = document.querySelector('.lead__edit-button');
const elementAdd = document.querySelector('.lead__add-button');



// Находим тексты в DOM
let nameInput = document.querySelector('.lead__name');
let jobInput = document.querySelector('.lead__text');






const elementTemplate = document.querySelector('#element').content;
const elementsList = document.querySelector('.elements__list');

initialCards.forEach(function (item) {
// клонируем содержимое тега template
let newElement = elementTemplate.cloneNode(true);
// наполняем содержимым
newElement.querySelector('.element__image').src = item.link;
newElement.querySelector('.element__image').alt = item.name;
newElement.querySelector('.element__title').textContent = item.name;

addListeners(newElement);
// отображаем на странице
elementsList.append(newElement);
//console.log(elementTemplate);
});


//const FormTemplate = document.querySelector('#form').content;
//const elementPage = document.querySelector('.page');

//создать форму
/*
function InitFormPopup(FormObject){
	let newForm = FormTemplate.cloneNode(true);
	newForm.querySelector('.form__title').textContent = FormObject.title;

	if(FormObject.type=='add'){
			newForm.querySelectorAll('.form__edt-text')[0].placeholder = FormObject.placeholders[0];
			newForm.querySelectorAll('.form__edt-text')[1].placeholder = FormObject.placeholders[1];
	}

	newForm.querySelector('.form__submit').value = FormObject.namebutton;
	elementPage.after(newForm);
}

InitFormPopup(initialForm[1]);*/

let formElement = document.querySelector('.form');
let elementClose = document.querySelectorAll('.form__close');

elementClose.forEach(function (item){
	item.addEventListener('click', showPopup);
});



function showEditPopup() {
    let EditForm = document.querySelector('.popup');
	EditForm.classList.toggle('popup_opened');
	
	//определить какая форма
	if(EditForm.classList.contains('popup_opened')) InitEditPopup();

	//InitFormPopup(initialForm[1]);
}

const AddForm = document.querySelector('.form_type_add');
AddForm.addEventListener('submit', formSubmitHandlerADD);
const ImgPopup =  document.querySelector('.popup__image');



function showPopup(e){
	const buttonForm = e.target.classList.value;
	let SelectPopup={};

	switch (buttonForm) {
		case 'lead__add-button':
			SelectPopup = AddForm.closest('.popup');
			AddForm.reset();
			break;
		case 'lead__edit-button':
			SelectPopup = document.querySelector('.popup');
			InitEditPopup();
			break;
		case 'element__image':
			SelectPopup = ImgPopup.closest('.popup');
			console.log(e.target);
			
			ImgPopup.src=e.target.src;
			ImgPopup.alt=e.target.alt;
			let ImgCaption = SelectPopup.querySelector('.popup__caption');
			ImgCaption.textContent = e.target.alt;

			
			break;
		default:
			SelectPopup = e.target.closest('.popup');
		}

	showclosePopup(SelectPopup);
}


function showclosePopup(obj){
	obj.classList.toggle('popup_opened'); 
	console.log(obj);
}


function formSubmitHandlerADD(evt){
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	const ImgValidate =  AddForm['pro-link'].value;
	
	if(!(ImgValidate.startsWith('http') && (ImgValidate.endsWith('.jpg') || ImgValidate.endsWith('.png') || ImgValidate.endsWith('.gif') || ImgValidate.endsWith('.svg')))) {
		AddForm['pro-link'].value='';
		return false;}

	let newElement = elementTemplate.cloneNode(true);


// наполняем содержимым
newElement.querySelector('.element__image').src = AddForm['pro-link'].value;
newElement.querySelector('.element__image').alt =  AddForm['pro-name'].value;
newElement.querySelector('.element__title').textContent =  AddForm['pro-name'].value;

addListeners(newElement);

// отображаем на странице
elementsList.prepend(newElement);

//AddForm['pro-link'].value='';
//AddForm['pro-name'].value='';

	SelectPopup = AddForm.closest('.popup');
	showclosePopup(SelectPopup);


}

function InitEditPopup(){
	formElement['pro-name'].value=nameInput.textContent;
	formElement['pro-text'].value=jobInput.textContent;
}


function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	jobInput.textContent =  formElement['pro-text'].value;
	nameInput.textContent  = formElement['pro-name'].value;
	// переписать в глобальную переменную!!!!!!!!!
	SelectPopup = document.querySelector('.popup');
	showclosePopup(SelectPopup);
}


elementAdd.addEventListener('click', showPopup);
elementEdit.addEventListener('click', showPopup);
//elementClose.addEventListener('click', showPopup);
formElement.addEventListener('submit', formSubmitHandler);




function addListeners(element) {
	element.querySelector('.element__delete').addEventListener('click', elementDelete);
	element.querySelector('.element__like').addEventListener('click', elementLike);
	element.querySelector('.element__image').addEventListener('click', showPopup);

  }
  


function elementDelete(e) {
	const element = e.target.closest('.element');
	element.remove();
  }

  function elementLike(e) {
	const element = e.target;
	element.classList.toggle('element__like_active');
	
  }