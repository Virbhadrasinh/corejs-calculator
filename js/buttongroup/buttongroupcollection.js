//Its a collection for buttons. It contains all the button models and persist it against unique id
function ButtonGroupCollection(options) {
	this.model = NS.CAL.buttonGroup.model;
	this.attributes = {};
	this.initialize(options);
}

ButtonGroupCollection.prototype.initialize = function(options) {
	if (typeof (options) !== 'undefined' && options instanceof Array) {
		for (var index = 0; index < options.length; index++) {
			this.add(new NS.CAL.buttonGroup.model(options[index]));
		}
	} else {
		throw new Error('ButtonModel.initialize : options are not in correct formate');
	}
}

ButtonGroupCollection.prototype.add = function(model) {
	//It will check the model class and add it to collection
	if (model instanceof this.model) {
		this.attributes["id-" + model.attributes.actualValue] = model;
	}
}

ButtonGroupCollection.prototype.get = function(key) {
	//it will return particular model depending upon the provided key
	return this.attributes["id-" + key];
}

ButtonGroupCollection.prototype.getAll = function() {
	//It will return all models of the collection in Array structure
	var attributes = [];
	for ( var key in this.attributes) {
		attributes.push(this.attributes[key]);
	}
	return attributes;
}

NS.CAL.buttonGroup.collection = ButtonGroupCollection;