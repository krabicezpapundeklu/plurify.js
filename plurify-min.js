/*
 plurify.js, 0.9
 Copyright 2011-2012 krabicezpapundeklu. All rights reserved.
 See https://raw.github.com/krabicezpapundeklu/plurify.js/master/LICENSE for full license text.
*/
window.plurify=function(){function g(a,b){if(a)return h(a,b);throw"Missing format string.";}function l(a,b){var c=m.exec(a);if(null===c)throw"Unterminated format item: {"+a+".";for(var e=c[1],f=c[2],c=c[3],j=e.split("."),d=k(b,e),i=0;i<j.length;++i)d=k(d[j[i]],e);d=d||"";":"===f&&(c=c.replace(n,function(c,a){var b=d[a]||g.operations[a];if(b)d=b.call(d,d);else throw"Invalid operation: "+a+".";return""}));return d+h(c,b)}function h(a,b){return a.replace(o,function(a,e,f){a=e.slice((e.length+1)/2);return e.length&
1?a+"{"+h(f,b):a+l(f,b)})}function k(a,b){if("undefined"===typeof a)throw"Invalid parameter name: "+b+".";return a}var m=/^\s*([^:}\s]*)\s*([:}])([\s\S]*)/,o=/(\\*){([\s\S]*)/,n=/^\s*([^}\s]*)\s*}/;g.operations={};return g}();
