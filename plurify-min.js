/*
 Copyright 2011 krabicezpapundeklu. All rights reserved.
 See https://raw.github.com/krabicezpapundeklu/plurify.js/master/LICENSE for full license text.
*/
(function(){function e(a,c){return a?f(a,c):""}function i(a,c){return a.replace(/^\s*([^:}\s]*)\s*([:}])([\s\S]*)/,function(g,b,a,h){for(var g=b.split("."),d=c,b=0;b<g.length;++b)d=d[g[b]];":"===a&&(h=h.replace(/^\s*([^}\s]*)\s*}/,function(b,a){d=d[a]?d[a]():e.operations[a](d);return""}));return d+f(h,c)})}function f(a,c){return a.replace(/(\\*){([\s\S]*)/,function(a,b,e){a=b.slice((b.length+1)/2);return b.length&1?a+"{"+f(e,c):a+i(e,c)})}(window.plurify=e).operations={}})();
