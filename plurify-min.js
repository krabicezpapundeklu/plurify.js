/*
 Copyright 2011-2012 krabicezpapundeklu. All rights reserved.
 See https://raw.github.com/krabicezpapundeklu/plurify.js/master/LICENSE for full license text.
*/
window.plurify=function(){function f(a,c){return a?g(a,c):""}function i(a,c){var b=j.exec(a);if(null===b)throw"Unterminated format item: {"+a+".";for(var k=b[2],e=b[3],b=b[1].split("."),d=c,h=0;h<b.length;++h)d=d[b[h]];":"===k&&(e=e.replace(l,function(b,a){var c=d[a]||f.operations[a];if(c)d=c.call(d,d);else throw"Invalid operation: "+a+".";return""}));return d+g(e,c)}function g(a,c){return a.replace(m,function(b,a,e){b=a.slice((a.length+1)/2);return a.length&1?b+"{"+g(e,c):b+i(e,c)})}var j=/^\s*([^:}\s]*)\s*([:}])([\s\S]*)/,
m=/(\\*){([\s\S]*)/,l=/^\s*([^}\s]*)\s*}/;f.operations={};return f}();
