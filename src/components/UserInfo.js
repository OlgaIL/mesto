
export class UserInfo {
    constructor({name, text}) {
		this._name  = name;
		this._text = text;
	}

	getUserInfo () {
		return {
		userName: this._name.textContent,
		userDescription: this._text.textContent
		}
	}

	setUserInfo (formData) {
		this._text.textContent = formData.text;
		this._name.textContent = formData.name;
	}

}