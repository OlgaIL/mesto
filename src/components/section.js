export class Section {
	constructor({data, renderer}, containerSelector) {
		this._renderedItems = data;
		this._renderer = renderer; 
		this._container = containerSelector;
	}

	renderItems() {
		this._renderedItems.forEach(item => this._renderer(item));
	}
	
	setItem(element) {
		this._container.append(element);
	}

	addItem(element) {
		this._container.prepend(element);
	}
	
}