function CalculatorController(options) {
	// NS.CAL.utility.baseClass.call(this);
	this.initialize(options);
}

CalculatorController.prototype = new NS.CAL.utility.baseClass();
CalculatorController.prototype.constructor = CalculatorController;

CalculatorController.prototype.initialize = function(options) {
	this.$el = options.el;
	this.createchildren(options);

	//it will register custom event listener which are fired by some other controller
	this.addEventListener("specialButtonClicked", this.ckeckConditions, this);
	this.addEventListener("buttonClicked", this.setClickedData, this);
	this.addEventListener("clearData", this.clearDisplayData, this);
}

CalculatorController.prototype.createchildren = function(options) {
	//It will create all required children
	this.model = new NS.CAL.calculator.model(options.calculatorAttr);
	this.view = new NS.CAL.calculator.view({
		el : this.$el
	});
	
	this.buttonGropuController = new NS.CAL.buttonGroup.controller({
		el : this.$el.querySelectorAll('.button-container')[0],
		buttons : buttons
	});
	
	this.displayController = new NS.CAL.display.controller({
		el : this.$el.querySelectorAll('.display-container')[0],
		displayAttr : display
	});
}

CalculatorController.prototype.setClickedData = function(data) {
	this.displayController.set(data.attributes.displayValue);
}

CalculatorController.prototype.clearDisplayData = function() {
	var modelAttributes = this.model.attributes;
	modelAttributes.firstOperand = undefined;
	modelAttributes.operator = undefined;
	modelAttributes.secondOperand = undefined;
	modelAttributes.total = undefined;
	this.displayController.clear();
}

CalculatorController.prototype.ckeckConditions = function(data) {
	//Its the core logic for the calculator 
	var modelAttributes = this.model.attributes;
	var operator = data.attributes.actualValue;
	var textValue = this.displayController.get();
	this.displayController.clear();
	
	if(textValue === "" || textValue === null || typeof(textValue) === "undefined"){
		alert("Please enter some value");
	}else if(typeof(modelAttributes.firstOperand) === "undefined"){
		modelAttributes.firstOperand = parseFloat(textValue);
		modelAttributes.operator = operator;
	}else if(typeof(modelAttributes.firstOperand) !== "undefined" && typeof(modelAttributes.operator) !== "undefined"){
		modelAttributes.secondOperand = parseFloat(textValue);
		modelAttributes.total = this.calculate(modelAttributes.firstOperand, modelAttributes.operator, modelAttributes.secondOperand);
		this.displayController.set(modelAttributes.total);
		
		if(operator === "+" || operator === "-" || operator === "/" || operator === "X"){
			modelAttributes.firstOperand = modelAttributes.total;
			modelAttributes.operator = operator;
			modelAttributes.secondOperand = undefined;
			modelAttributes.total = undefined;
			this.displayController.clear();
		}else if(operator === "="){
			modelAttributes.firstOperand = undefined;
			modelAttributes.operator = undefined;
			modelAttributes.secondOperand = undefined;
			modelAttributes.total = undefined;
		}
	}
}

CalculatorController.prototype.calculate = function(firstOperand, operator, secondOperand) {
	if(operator === "+"){
		return firstOperand + secondOperand;
	}else if(operator === "-"){
		return firstOperand - secondOperand;
	}else if(operator === "/"){
		return firstOperand / secondOperand;
	}else if(operator === "X"){
		return firstOperand * secondOperand;
	}
}

NS.CAL.calculator.controller = CalculatorController;