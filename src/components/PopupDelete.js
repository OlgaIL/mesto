import {Popup} from './Popup.js';

export class PopupDelete extends Popup {
	constructor(popupSelector, {formSelector}){
		super(popupSelector);
		this._formSelector = formSelector;
	}

	
	setEventListeners(){
		super.setEventListeners();
		this._formSelector.addEventListener('submit', (evt) => {
			evt.preventDefault();
			if(this._handleFormSubmit()){this._handleFormSubmit();}
		//	this.close();
		});
	}

	setHandlerSubmut(handler){
		this._handleFormSubmit = handler;
	}
}