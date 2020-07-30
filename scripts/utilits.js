function showPopup(obj) {
	document.addEventListener('keydown', checkKey);
	obj.classList.add('popup_opened'); 
	obj.addEventListener('click', checkPopup);

}

function closePopup (obj) {
	document.removeEventListener('keydown', checkKey);
	obj.classList.remove('popup_opened');
	obj.removeEventListener('click', checkPopup);
}

function checkKey (e){
	const popupOpened  = document.querySelector('.popup_opened');
	if (e.key === 'Escape') closePopup(popupOpened);
}

function checkPopup (e){
	if (e.target === e.currentTarget) closePopup(e.currentTarget);;
}

export {showPopup, closePopup};