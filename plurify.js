(function() {
	var plurify = function(input, parameters) {
		if(input) {
			var openBracket = input.indexOf("{", 0);

			if(openBracket === -1) {
				return input;
			}

			var position = 0;
			var builder = [];

			do {
				var backslashes = 0;

				while(input.charAt(openBracket - backslashes - 1) === "\\") {
					++backslashes;
				}

				if(backslashes > 0) {
					builder.push(input.slice(position, openBracket - backslashes / 2));

					if(backslashes & 1) {
						builder.push("{");
						position = openBracket + 1;
					}
					else {
						position = parseExpression(input, openBracket, parameters, builder);
					}
				}
				else {
					builder.push(input.slice(position, openBracket));
					position = parseExpression(input, openBracket, parameters, builder);
				}

				openBracket = input.indexOf("{", position);
			}
			while(openBracket !== -1);

			builder.push(input.slice(position));

			return builder.join("");
		}

		return "";
	}

	plurify["operations"] = {
		"toLowerCase": function(x) {
			return x.toLowerCase(x);
		},

		"toUpperCase": function(x) {
			return x.toUpperCase();
		}
	}

	window["plurify"] = plurify;

	function parseExpression(input, position, parameters, builder) {
		var closeBracket = input.indexOf("}", position);
		var colon = input.indexOf(":", position);

		var parameterNameEnd = colon === -1 ? closeBracket : Math.min(closeBracket, colon);

		var parameterNameParts = input.slice(position + 1, parameterNameEnd).split(".");
		var parameter = parameters;

		for(var i = 0; i < parameterNameParts.length; ++i) {
			parameter = parameter[parameterNameParts[i]];
		}

		if(colon !== -1) {
			var operation = input.slice(colon + 1, closeBracket);
			parameter = plurify["operations"][operation](parameter);
		}

		builder.push(parameter);

		return closeBracket + 1;
	}
})();
