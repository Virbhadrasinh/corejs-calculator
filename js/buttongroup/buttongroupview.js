function getButtonTemplate(options) {
	//it will create template for the button view
	var frag = document.createDocumentFragment();

	var containerDiv = document.createElement("div");
	containerDiv.setAttribute("class", "container");
	frag.appendChild(containerDiv);
	
	var rowDiv = document.createElement("div");
	containerDiv.appendChild(rowDiv);
	
	var colDiv = document.createElement("div");
	colDiv.innerHTML = "clear";
	colDiv.setAttribute("data-actualValue", "clear");
	colDiv.setAttribute("class", "theme-button");
	rowDiv.appendChild(colDiv);
	
	rowDiv = document.createElement("div");
	containerDiv.appendChild(rowDiv);
	
	for (var index = 0; index < options.length; index++) {
		var currentModel = options[index].attributes;
		var colDiv = document.createElement("div");
		colDiv.innerHTML = currentModel.displayValue;
		colDiv.setAttribute("data-actualValue", currentModel.actualValue);
		colDiv.setAttribute("class", "theme-button");
		rowDiv.appendChild(colDiv);
	}

	return frag;
}

function ButtonGropuView(options) {
	this.initialize(options);
}

ButtonGropuView.prototype.initialize = function(options) {
	this.$el = options.el;
	this.render(options.collection);
	this.addEvents(options.eventCallback);
}

ButtonGropuView.prototype.render = function(collection) {
	this.$el.appendChild(getButtonTemplate(collection));
}

ButtonGropuView.prototype.addEvents = function(callback) {
	//it will add button click event 
	if (typeof (this.$el) !== 'undefined') {
		this.$el.addEventListener('click', function(e) {
			callback.call(this, e.target.getAttribute('data-actualvalue'));
		});
	}
}

NS.CAL.buttonGroup.view = ButtonGropuView;