
import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
	constructor(popupSelector, imgCaptionSelector, imgPopupSelector){
		super(popupSelector);
		this._imgCaptionSelector = imgCaptionSelector;
		this._imgPopupSelector = imgPopupSelector;
	}
	
	open (item) {
		super.open();
		this._imgPopupSelector.src = item.link;
		this._imgPopupSelector.alt = item.name;
		this._imgCaptionSelector.textContent = item.name;
	}}
