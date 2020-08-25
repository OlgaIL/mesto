import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
	constructor(popupSelector, {formSelector, handleFormSubmit}){
		super(popupSelector);
		this._formSelector = formSelector;
		this._handleFormSubmit = handleFormSubmit;
	}

	_getInputValues(){
		// достаём все элементы полей
		this._inputList = this._formSelector.querySelectorAll('.form__edt-text');
		// создаём пустой объект
		this._formValues = {};

		// добавляем в этот объект значения всех полей
		this._inputList.forEach(input => {
		this._formValues[input.name] = input.value;
		});
		// возвращаем объект значений
		return this._formValues;
	}

	setEventListeners(){
		super.setEventListeners();
		this._formSelector.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this._getInputValues());
			this.close();
		});
	}

	close () {
		super.close();
		this._formSelector.reset();
	}

}