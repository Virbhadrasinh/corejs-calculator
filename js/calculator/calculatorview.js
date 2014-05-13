function getCalculatorTemplate() {
	var frag = document.createDocumentFragment();

	var div = document.createElement("div");
	div.setAttribute( "class", "display-container" );
	frag.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute( "class", "button-container" );
	frag.appendChild(div);
	return frag;
}

function CalculatorView(options) {
	this.initialize(options);
}

CalculatorView.prototype.initialize = function(options) {
	this.render(options);
}

CalculatorView.prototype.render = function(options) {
	options.el.setAttribute( "class", "theme-calculator" );
	options.el.appendChild(getCalculatorTemplate());
}

NS.CAL.calculator.view = CalculatorView;