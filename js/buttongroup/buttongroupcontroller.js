function ButtonGroupController(options) {
	this.initialize(options);
}

//extending ButtonGroupController from BaseClass and reassigning its own constructor to it.
ButtonGroupController.prototype = new NS.CAL.utility.baseClass();
ButtonGroupController.prototype.constructor = ButtonGroupController;

ButtonGroupController.prototype.initialize = function(options) {
	//it will initialize the controller class and create required children.
	this.createchildren(options);
}

ButtonGroupController.prototype.createchildren = function(options) {
	this.collection = new NS.CAL.buttonGroup.collection(options.buttons);
	this.view = new NS.CAL.buttonGroup.view({
		el : options.el,
		eventCallback : this.eventCallback.bind(this),
		collection : this.collection.getAll()
	});
}

ButtonGroupController.prototype.eventCallback = function(key) {
	//its the event callback and depending upon the type of button clicked it will fire different custom events 
	if (key === "clear") {
		this.fireEvent("clearData");
	} else {
		var buttonData = this.collection.get(key);
		var buttonType = buttonData.attributes.type;
		if (buttonType === "number"
				|| (buttonType === "special" && buttonData.attributes.actualValue === ".")) {
			this.fireEvent("buttonClicked", buttonData);
		} else if (buttonData.attributes.type === "special") {
			this.fireEvent("specialButtonClicked", buttonData);
		}
	}
}

NS.CAL.buttonGroup.controller = ButtonGroupController;