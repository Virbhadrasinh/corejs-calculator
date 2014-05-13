//Its a model for storing specific details for the calculator
function CalculatorModel(options) {
	this.attributes = {
		type : "",
		height : 0,
		width : 0,
		color : "",
		bodyColor : "",
		border : ""
	};
	this.initialize(options);
}

CalculatorModel.prototype.initialize = function(options) {
	//it will override the default values of the model
	if (typeof (options) !== 'undefined') {
		var attributes = this.attributes;
		for ( var key in options) {
			if (this.checkType(key, options[key]) === true) {
				attributes[key] = options[key];
			} else {
				throw new Error("buttonModel.initialize : required value for "
						+ key + " is not in correct formate");
			}
		}
	}
}

CalculatorModel.prototype.checkType = function(key, value) {
	//it will check the type of value and accordingly decide that provided button property is valid or not 
	if ((key === "type" || key === "color" || key === "bodyColor" || key === "border")
			&& typeof (value) === "string") {
		return true;
	} else if ((key === "height" || key === "width")
			&& (value !== "" && !isNaN(value) && Math.round(value) === value)) {
		return true;
	} else {
		return false;
	}
}

NS.CAL.calculator.model = CalculatorModel;