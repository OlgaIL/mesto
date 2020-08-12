import{imgPopup, selectImagePopup, ImgCaption} from './constants.js';
import {showPopup} from './utilits.js';

export class Card {
    // в конструкторе будут динамические данные,
    // для каждого экземпляра свои
    constructor(data, cardSelector) {
        // text и image — приватные поля, 
        // они нужны только внутри класса
        this._name = data.name;
		this._link = data.link;
		this._cardSelector  = cardSelector;
	}
	
	_getTemplate() {
		// здесь выполним все необходимые операции, чтобы вернуть разметку
		//const cardElement = document.querySelector('.card-template').content.querySelector('.card').cloneNode(true);
		
		const elementTemplate = document.querySelector(this._cardSelector).content;
		const newItem = elementTemplate.cloneNode(true);

	  // вернём DOM-элемент карточки
		return newItem;
	}


	_setEventListeners() {
		this._element.querySelector('.element__delete').addEventListener('click', () => {
			this._deleteElement();
		});

		this._element.querySelector('.element__like').addEventListener('click', () => {
			this._likeElement();
		});

		this._element.querySelector('.element__image').addEventListener('click', () => {
			this._initBigImage();
		});

	}


	_deleteElement() {
			const element = event.target.closest('.element');
			element.remove();
	}

	_likeElement() {
		event.target.classList.toggle('element__like_active');
	}

	_initBigImage() {
		imgPopup.src = this._link;
		imgPopup.alt = this._name;
		ImgCaption.textContent = this._name;
		showPopup(selectImagePopup);
	}

	generateCard() {
		// Запишем разметку в приватное поле _element.  // Так у других элементов появится доступ к ней.
		this._element = this._getTemplate();
		this._setEventListeners(); // добавим обработчики 
		// Добавим данные
		this._element.querySelector('.element__image').src = this._link;
		this._element.querySelector('.element__title').textContent = this._name;
		this._element.querySelector('.element__image').alt = this._name;
		

		// Вернём элемент наружу
		return this._element;
	}

}



