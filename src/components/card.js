export class Card {
    /** в конструкторе будут динамические данные,
    * для каждого экземпляра свои
	*/
    constructor({data, handleCardClick, handleLikeClick, handleDeleteClick}, userId, cardSelector) {
        /** text и image — приватные поля, они нужны только внутри класса */
        this._name = data.name;
		this._link = data.link;
		this._likes = data.likes;
		this._ownerId = data.owner._id;
		this._cardId = data._id;
		this._myUserId = userId;
		this._handleCardClick = handleCardClick; /** функция открытия окна popup */
		this._handleLikeClick = handleLikeClick; /** функция Like */
		this._handleDeleteClick = handleDeleteClick; /** функция Like */
		this._cardSelector  = cardSelector;
	}
	
	_getTemplate() {
		/** здесь выполним все необходимые операции, чтобы вернуть разметку */
        const elementTemplate = document.querySelector(this._cardSelector).content.querySelector('.element');
		//const elementTemplate = document.querySelector(this._cardSelector).content;
		const newItem = elementTemplate.cloneNode(true);

	  /** вернём DOM-элемент карточки */
		return newItem;
	}

	_getLikesCount(){
		return this._likes.length;
	}

	islikeMe(){
	return !!this._likes.find(like => like._id === this._myUserId);
	}

	_setEventListeners() {
		this._element.querySelector('.element__delete').addEventListener('click', this._handleDeleteClick);
		this._element.querySelector('.element__like').addEventListener('click', this._handleLikeClick);
		this._element.querySelector('.element__image').addEventListener('click', this._handleCardClick);
	}


	deleteElement = () => {
		this._element.remove();
		//this._element = null;
	}


	likeElement(result) {
		this._likes = result.map(currentValue => currentValue);
		this._element.querySelector('.element__like').classList.toggle('element__like_active');
		const Count  = this._element.querySelector('.element__likecount');
		Count.textContent = result.length;
	}


	generateCard() {
		/**  Запишем разметку в приватное поле _element.   Так у других элементов появится доступ к ней.*/
		this._element = this._getTemplate();
		const elementImage = this._element.querySelector('.element__image');
		const elementTitle = this._element.querySelector('.element__title');
		const elementLikeCount = this._element.querySelector('.element__likecount');
		const elementDelete =  this._element.querySelector('.element__delete');
		const elementLike =  this._element.querySelector('.element__like');

		
		/** Добавим данные */
		elementImage.src = this._link;
		elementImage.alt = this._name;
		elementTitle.textContent = this._name;
		elementLikeCount.textContent = this._getLikesCount();
		if (this._myUserId  !== this._ownerId) {elementDelete.classList.add('element__delete_disable')};
		if (this.islikeMe()) elementLike.classList.add('element__like_active');

		this._setEventListeners(); /** добавим обработчики */

		/**  B вернём элемент наружу */
		return this._element;

	}

}



