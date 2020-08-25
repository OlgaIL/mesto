
export class Popup {
    // в конструкторе будут динамические данные,
    // для каждого экземпляра свои
    constructor(popupSelector) {
		this._popupSelector  = popupSelector;
	}

	_handleEscClose = (evt) => {
		if (evt.key === 'Escape') this.close();
	}


	open () {
		this._popupSelector.classList.add('popup_opened');
		document.addEventListener('keydown', this._handleEscClose);
		this._popupSelector.addEventListener('click', this._checkPopup);
	}

	_checkPopup = (evt) => {
		if (evt.target === evt.currentTarget) {this.close();}
	}

	close () {
	document.removeEventListener('keydown', this._handleEscClose);
	this._popupSelector.classList.remove('popup_opened');
	this._popupSelector.removeEventListener('click', this._checkPopup);
	}


	setEventListeners(){
		const elementClose = this._popupSelector.querySelector('.form__close');
		elementClose.addEventListener('click', () => this.close());
	}

}

