export class Card {
    /** в конструкторе будут динамические данные,
    * для каждого экземпляра свои
	*/
    constructor({data,handleCardClick}, cardSelector) {
        /** text и image — приватные поля, они нужны только внутри класса */
        this._name = data.name;
		this._link = data.link;
		this._handleCardClick = handleCardClick; /** функция открытия окна popup */
		this._cardSelector  = cardSelector;
	}
	
	_getTemplate() {
		/** здесь выполним все необходимые операции, чтобы вернуть разметку */
		//const cardElement = document.querySelector('.card-template').content.querySelector('.card').cloneNode(true);
		
		const elementTemplate = document.querySelector(this._cardSelector).content;
		const newItem = elementTemplate.cloneNode(true);

	  /** вернём DOM-элемент карточки */
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
			this._handleCardClick({name: this._name, link: this._link});
		});

	}


	_deleteElement() {
			const element = event.target.closest('.element');
			element.remove();
	}

	_likeElement() {
		event.target.classList.toggle('element__like_active');
	}


	generateCard() {
		/**  Запишем разметку в приватное поле _element.   Так у других элементов появится доступ к ней.*/
		this._element = this._getTemplate();
		const elementImage = this._element.querySelector('.element__image');
		const elementTitle = this._element.querySelector('.element__title');
		this._setEventListeners(); /** добавим обработчики */
		/** Добавим данные */
		elementImage.src = this._link;
		elementImage.alt = this._name;
		elementTitle.textContent = this._name;
		/**  Вернём элемент наружу */
		return this._element;
	}

}



