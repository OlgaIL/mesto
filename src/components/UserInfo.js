
import{nameEditInput, textEditInput} from '../scripts/constants.js';

export class UserInfo {
    constructor({name, text}) {
		this._name  = name;
		this._text = text;
	}

	getUserInfo () {
	//configForm.formSelector = '.form';
	nameEditInput.value=this._name.textContent;
	textEditInput.value=this._text.textContent;
	}

	setUserInfo (formData) {
		this._text.textContent =  formData.text;
		this._name.textContent = formData.name;
	}

}