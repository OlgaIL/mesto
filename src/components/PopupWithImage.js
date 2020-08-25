
import{imgPopup} from '../scripts/constants.js';
import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
	constructor(popupSelector, ImgCaptionSelector){
		super(popupSelector);
		this._ImgCaptionSelector = ImgCaptionSelector;
	}
	
	open (item) {
		super.open();
		imgPopup.src = item.link;
		imgPopup.alt = item.name;
		this._ImgCaptionSelector.textContent = item.name;
	}}
