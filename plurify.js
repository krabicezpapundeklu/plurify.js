/**
* @license Copyright 2011 krabicezpapundeklu. All rights reserved.
* See https://raw.github.com/krabicezpapundeklu/plurify.js/master/LICENSE for full license text.
*/
(function() {
	var plurify = function(input, parameters) {
		return input ? parseFormatString(input, parameters) : "";
	};

	(window["plurify"] = plurify)["operations"] = {};

	function parseExpression(input, parameters) {
		return input.replace(/^\s*([^:}\s]*)\s*([:}])([\s\S]*)/, function(match, parameterName, colonOrBracket, restOfInput) {
			var parameterNameParts = parameterName.split(".");
			var parameter = parameters;

			for(var i = 0; i < parameterNameParts.length; ++i) {
				parameter = parameter[parameterNameParts[i]];
			}

			if(colonOrBracket === ":") {
				restOfInput = restOfInput.replace(/^\s*([^}\s]*)\s*}/, function(match, operation) {
					if(parameter[operation]) {
						parameter = parameter[operation]();
					}
					else {
						parameter = plurify["operations"][operation](parameter);
					}

					return "";
				});
			}

			return parameter + parseFormatString(restOfInput, parameters);
		});
	}

	function parseFormatString(input, parameters) {
		return input.replace(/(\\*){([\s\S]*)/, function(match, backslashes, restOfInput) {
			var unescapedBackslashes = backslashes.slice((backslashes.length + 1) / 2);

			if(backslashes.length & 1) { // "{" is escaped
				return unescapedBackslashes + "{" + parseFormatString(restOfInput, parameters);
			}
			else { // "{" is not escaped
				return unescapedBackslashes + parseExpression(restOfInput, parameters);
			}
		});
	}
})();
