//Its a model for storing specific button details
function ButtonModel(options) {
	this.attributes = {
		type : "",
		actualValue : 0,
		displayValue : ""
	};
	this.initialize(options);
}

ButtonModel.prototype.initialize = function(options) {
	//it will override the default values of the model
	if (typeof (options) !== 'undefined') {
		var attributes = this.attributes;
		for ( var key in options) {
			if (this.checkType(key, options[key]) === true) {
				attributes[key] = options[key];
			} else {
				throw new Error("buttonModel.initialize : required value for " + key + " is not in correct formate");
			}
		}
	}
}

ButtonModel.prototype.checkType = function(key, value) {
	//it will check the type of value and accordingly decide that provided button property is valid or not 
	if ((key === "type" || key === "displayValue") && typeof (value) === "string") {
		return true;
	} else if (key === "actualValue" && (value !== "" && !isNaN(value) && Math.round(value) === value)) {
		return true;
	} else if (key === "actualValue" && (value === "/" || value === "X" || value === "-" || value === "+" || value === "." || value === "=")) {
		return true;
	} else {
		return false;
	}
}

NS.CAL.buttonGroup.model = ButtonModel;