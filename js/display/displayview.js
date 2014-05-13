function getDisplayTemplate(options) {
	var frag = document.createDocumentFragment();

	var div = document.createElement("div");
	frag.appendChild(div);

	var input = document.createElement("input");
	input.type = "text";
	input.setAttribute("disabled", "disabled");
	input.setAttribute("class", "theme-display");
	input.setAttribute("disabled", "disabled");
	input.setAttribute("readonly", "readonly");
	div.appendChild(input);
	return frag;
}

function DisplayView(options) {
	this.initialize(options);
}

DisplayView.prototype.initialize = function(options) {
	this.$el = options.el;
	this.render(options.displayAttr);
}

DisplayView.prototype.render = function(collection) {
	this.$el.appendChild(getDisplayTemplate(collection));
}

DisplayView.prototype.setData = function(value) {
	//it will set data to the input box and check if dot is already there; it will not allowed to add it again 
	var inputEle = this.$el.querySelectorAll('div > input')[0];
	if(value === "." && inputEle.value.indexOf(".") != -1){
		//do nothing
	}else{
		inputEle.value += ""+value;
	}
}

DisplayView.prototype.getData = function() {
	//it return the text box current value
	var inputEle = this.$el.querySelectorAll('div > input')[0];
	return inputEle.value;
}

DisplayView.prototype.clearData = function(callback) {
	//it will clear text box value
	var inputEle = this.$el.querySelectorAll('div > input')[0];
	inputEle.value = "";
}

NS.CAL.display.view = DisplayView;