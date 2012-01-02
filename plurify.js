/**
* @license Copyright 2011-2012 krabicezpapundeklu. All rights reserved.
* See https://raw.github.com/krabicezpapundeklu/plurify.js/master/LICENSE for full license text.
*/
(function() {
	var plurify = function(input, parameters) {
		return input ? parseFormatString(input, parameters) : "";
	};

	(window["plurify"] = plurify)["operations"] = {};

	function parseFormatItem(input, parameters) {
		var matches = /^\s*([^:}\s]*)\s*([:}])([\s\S]*)/.exec(input);

		if(matches === null) {
			throw "Unterminated format item: {" + input + ".";
		}

		var parameterName = matches[1];
		var colonOrBracket = matches[2];
		var restOfInput = matches[3];

		var parameterNameParts = parameterName.split(".");
		var parameter = parameters;

		for(var i = 0; i < parameterNameParts.length; ++i) {
			parameter = parameter[parameterNameParts[i]];
		}

		if(colonOrBracket === ":") {
			restOfInput = restOfInput.replace(/^\s*([^}\s]*)\s*}/, function(match, operationName) {
				if(parameter[operationName]) {
					parameter = parameter[operationName]();
				}
				else {
					parameter = plurify["operations"][operationName](parameter);
				}

				return "";
			});
		}

		return parameter + parseFormatString(restOfInput, parameters);
	}

	function parseFormatString(input, parameters) {
		return input.replace(/(\\*){([\s\S]*)/, function(match, backslashes, restOfInput) {
			var unescapedBackslashes = backslashes.slice((backslashes.length + 1) / 2);

			if(backslashes.length & 1) { // "{" is escaped
				return unescapedBackslashes + "{" + parseFormatString(restOfInput, parameters);
			}
			else { // "{" is not escaped
				return unescapedBackslashes + parseFormatItem(restOfInput, parameters);
			}
		});
	}
})();
