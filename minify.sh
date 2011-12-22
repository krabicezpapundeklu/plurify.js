#!/bin/bash
curl --data-ascii "compilation_level=ADVANCED_OPTIMIZATIONS&output_format=text&output_info=compiled_code" --data-urlencode js_code@plurify.js --output plurify-min.js http://closure-compiler.appspot.com/compile
