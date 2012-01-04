/**
* @license plurify.js, 0.9
* Copyright 2011-2012 krabicezpapundeklu. All rights reserved.
* See https://raw.github.com/krabicezpapundeklu/plurify.js/master/LICENSE for full license text.
*/
window["plurify"] = (function() {
	var FormatItemRegex = /^\s*([^:}\s]*)\s*([:}])([\s\S]*)/;
	var FormatStringRegex = /(\\*){([\s\S]*)/;
	var OperationRegex = /^\s*([^}\s]*)\s*}/;

	function parseFormatItem(input, parameters) {
		var matches = FormatItemRegex.exec(input);

		if(matches === null) {
			throw "Unterminated format item: {" + input + ".";
		}

		var parameterName = matches[1];
		var colonOrBracket = matches[2];
		var restOfInput = matches[3];

		var parameterNameParts = parameterName.split(".");
		var parameter = validateParameter(parameters, parameterName);

		for(var i = 0; i < parameterNameParts.length; ++i) {
			parameter = validateParameter(parameter[parameterNameParts[i]], parameterName);
		}

		parameter = parameter || "";

		if(colonOrBracket === ":") {
			restOfInput = restOfInput.replace(OperationRegex, function(match, operationName) {
				var operation = parameter[operationName] || plurify["operations"][operationName];

				if(operation) {
					parameter = operation.call(parameter, parameter);
				}
				else {
					throw "Invalid operation: " + operationName + ".";
				}

				return "";
			});
		}

		return parameter + parseFormatString(restOfInput, parameters);
	}

	function parseFormatString(input, parameters) {
		return input.replace(FormatStringRegex, function(match, backslashes, restOfInput) {
			var unescapedBackslashes = backslashes.slice((backslashes.length + 1) / 2);

			if(backslashes.length & 1) { // "{" is escaped
				return unescapedBackslashes + "{" + parseFormatString(restOfInput, parameters);
			}
			else { // "{" is not escaped
				return unescapedBackslashes + parseFormatItem(restOfInput, parameters);
			}
		});
	}

	function validateParameter(parameter, parameterName) {
		if(typeof parameter === "undefined") {
			throw "Invalid parameter name: " + parameterName + ".";
		}

		return parameter;
	}

	var plurify = function(input, parameters) {
		if(input) {
			return parseFormatString(input, parameters);
		}

		throw "Missing format string.";
	};

	plurify["operations"] = {};

	return plurify;
})();
