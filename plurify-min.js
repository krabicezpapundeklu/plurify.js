/*
 Copyright 2011-2012 krabicezpapundeklu. All rights reserved.
 See https://raw.github.com/krabicezpapundeklu/plurify.js/master/LICENSE for full license text.
*/
(function(){function h(a,c){return a?f(a,c):""}function i(a,c){var b=j.exec(a);if(null===b)throw"Unterminated format item: {"+a+".";for(var k=b[2],e=b[3],b=b[1].split("."),d=c,g=0;g<b.length;++g)d=d[b[g]];":"===k&&(e=e.replace(l,function(b,a){var c=d[a]||h.operations[a];if(c)d=c.call(d,d);else throw"Invalid operation: "+a+".";return""}));return d+f(e,c)}function f(a,c){return a.replace(m,function(b,a,e){b=a.slice((a.length+1)/2);return a.length&1?b+"{"+f(e,c):b+i(e,c)})}var j=/^\s*([^:}\s]*)\s*([:}])([\s\S]*)/,
m=/(\\*){([\s\S]*)/,l=/^\s*([^}\s]*)\s*}/;(window.plurify=h).operations={}})();
