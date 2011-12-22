(function(window) {
	function parseExpression(input, position, parameters, builder) {
		var closeBracket = input.indexOf("}", position);
		builder.push(parameters[input.slice(position + 1, closeBracket)]);
		return closeBracket + 1;
	}

	window.plurify = function(input, parameters) {
		if(input) {
			var position = 0;
			var openBracket = input.indexOf("{", position);

			if(openBracket === -1) {
				return input;
			}

			var builder = [];

			do {
				builder.push(input.slice(position, openBracket));
				position = parseExpression(input, openBracket, parameters, builder);
				openBracket = input.indexOf("{", position);
			}
			while(openBracket !== -1);

			builder.push(input.slice(position));

			return builder.join("");
		}

		return "";
	}

})(window);
