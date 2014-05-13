/* Creation of name space */
window.NS = {
	CAL : {
		calculator : {
			model : function() {},
			view : function() {},
			controller : function() {}
		},
		buttonGroup : {
			model : function() {},
			collection : function() {},
			view : function() {},
			controller : function() {}
		},
		display : {
			model : function() {},
			view : function() {},
			controller : function() {}
		},
		utility : {
			baseClass : function() {},
			eventListeners : {}
		}
	}
};

var _listeners = NS.CAL.utility.eventListeners;
function BaseClass() {}

BaseClass.prototype = {
	constructor : BaseClass,
	addEventListener : function(type, listener, context) {
		// register all custom events
		if (typeof (_listeners[type]) === "undefined") {
			_listeners[type] = [];
		}
		_listeners[type].push(listener.bind(context));
	},
	fireEvent : function(event, data) {
		// invoke registered callback when particular custom event get fired
		if (typeof (event) === "string") {
			event = {type : event};
		}
		if (!event.target) {
			event.target = this;
		}

		if (!event.type) {
			throw new Error("BaseClass.fireEvent : Type of event object is missing(falsy event)");
		}

		if (_listeners[event.type] instanceof Array) {
			var listeners = _listeners[event.type];
			for (var i = 0, len = listeners.length; i < len; i++) {
				listeners[i].call(this, data);
			}
		}
	},
	removeEventListener : function(type, listener) {
		// remove registered custom events
		if (_listeners[type] instanceof Array) {
			var listeners = _listeners[type];
			for (var i = 0, len = listeners.length; i < len; i++) {
				if (listeners[i] === listener) {
					listeners.splice(i, 1);
					break;
				}
			}
		}
	}
};

NS.CAL.utility.baseClass = BaseClass;