(function(){function h(a,e){if(a){var b=a.indexOf("{",0);if(-1===b)return a;var f=0,c=[];do{for(var d=0;"\\"===a.charAt(b-d-1);)++d;0<d?(c.push(a.slice(f,b-d/2)),d&1?(c.push("{"),f=b+1):f=i(a,b,e,c)):(c.push(a.slice(f,b)),f=i(a,b,e,c));b=a.indexOf("{",f)}while(-1!==b);c.push(a.slice(f));return c.join("")}return""}function i(a,e,b,f){for(var c=a.indexOf("}",e),d=a.indexOf(":",e),g=-1===d?c:Math.min(c,d),e=a.slice(e+1,g).split("."),g=0;g<e.length;++g)b=b[e[g]];-1!==d&&(a=a.slice(d+1,c),b=h.operations[a](b));
f.push(b);return c+1}h.operations={toLowerCase:function(a){return a.toLowerCase(a)},toUpperCase:function(a){return a.toUpperCase()}};window.plurify=h})();
