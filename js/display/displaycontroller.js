function DisplayController(options) {
	this.initialize(options);
}

DisplayController.prototype = new NS.CAL.utility.baseClass();
DisplayController.prototype.constructor = DisplayController;

DisplayController.prototype.initialize = function(options) {
	this.createchildren(options);
}

DisplayController.prototype.createchildren = function(options) {
	this.model = new NS.CAL.display.model(options.displayAttr);
	this.view = new NS.CAL.display.view({
		el : options.el,
		displayAttr : this.model.attributes
	});
}

DisplayController.prototype.set = function(displayValue) {
	//api for set data 
	this.view.setData(displayValue);
}

DisplayController.prototype.get = function() {
	//api for get data
	return this.view.getData();
}

DisplayController.prototype.clear = function() {
	//api for clear data
	this.view.clearData();
}

NS.CAL.display.controller = DisplayController;