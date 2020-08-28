
export class UserInfo {
    constructor(userData) {
		this._name  = userData.name;
		this._about = userData.about;
		this._avatar = userData.avatar;
	}

	getUserInfo () {
		return {
		userName: this._name.textContent,
		userDescription: this._about.textContent
		}
	}

	setUserInfo (formData) {
		this._about.textContent = formData.about;
		this._name.textContent = formData.name;
		this.userId = formData._id;
	}

	setAvatar (formData) {
	//	console.log (formData);
		this._avatar.src = formData.avatar;
		this._avatar.alt = this._name.textContent;
			}

	getAvatar () {
		return {
			link: this._avatar.src
			}
	}
		



}