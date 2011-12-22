(function() {
	function parseExpression(input, position, parameters, builder) {
		var closeBracket = input.indexOf("}", position);
		var parameterNameParts = input.slice(position + 1, closeBracket).split(".");
		var parameter = parameters;

		for(var i = 0; i < parameterNameParts.length; ++i) {
			parameter = parameter[parameterNameParts[i]];
		}

		builder.push(parameter);

		return closeBracket + 1;
	}

	window["plurify"] = function(input, parameters) {
		if(input) {
			var position = 0;
			var openBracket = input.indexOf("{", position);

			if(openBracket === -1) {
				return input;
			}

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
})();
