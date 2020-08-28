export class Api {
    constructor(apiData) {
        this.baseUrl = apiData.baseUrl;
		this.headers = apiData.headers; /** объект */
	}


	getInitialCards() {
		return fetch(`${this.baseUrl}cards`, {
			headers: this.headers
		})
			.then(res => {
			if (res.ok) {   return res.json(); 	}
			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`)
		});
		
	}

	getInitialUser() {
		return fetch(`${this.baseUrl}users/me`, {
			headers: this.headers
		})
			.then(res => {
			if (res.ok) {   return res.json(); 	}
			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`)
		});
		
	}

	putUserInfo(item) {
		return fetch(`${this.baseUrl}users/me`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify(item)
		}
		)
			.then(res => {
			if (res.ok) {   return res.json(); 	}
			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`)
		});
		
	}


	putAvatarInfo(avatar) {
		return fetch(`${this.baseUrl}users/me/avatar`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({'avatar' : avatar})
		}	
		)
			.then(res => {
			if (res.ok) {   return res.json(); 	}
			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`)
		});
		
	}


	deleteCard (id) {
		return fetch(`${this.baseUrl}cards/${id}`, {
			method: 'DELETE',
			headers: this.headers
		})
		.then(res => {
			if (res.ok) {
				return res.json()
			}
		return Promise.reject('что-то не так!!')
		})
	
	}
	
	createCard (item) { 
		return fetch(`${this.baseUrl}cards`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(item)
		})
		.then(res => res.json())
		}
	

	putLike (id) {
			return fetch(`${this.baseUrl}cards/likes/${id}`, {
				method: 'PUT',
				headers: this.headers
			})
			.then(res => {
				if (res.ok) {
					return res.json()
				}
			return Promise.reject('что-то не так!!')
			})
		
		}

	deleteLike (id) {
			return fetch(`${this.baseUrl}cards/likes/${id}`, {
				method: 'DELETE',
				headers: this.headers
			})
			.then(res => {
				if (res.ok) {
					return res.json()
				}
			return Promise.reject('что-то не так!!')
			})
		
		}


}

