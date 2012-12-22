CodeMirror.defineMode("clike",function(a,b){function k(a,b){var c=a.next();if(g[c]){var h=g[c](a,b);if(h!==!1)return h}if(c=='"'||c=="'")return b.tokenize=l(c),b.tokenize(a,b);if(/[\[\]{}\(\),;\:\.]/.test(c))return j=c,null;if(/\d/.test(c))return a.eatWhile(/[\w\.]/),"number";if(c=="/"){if(a.eat("*"))return b.tokenize=m,m(a,b);if(a.eat("/"))return a.skipToEnd(),"comment"}if(i.test(c))return a.eatWhile(i),"operator";a.eatWhile(/[\w\$_]/);var k=a.current();return d.propertyIsEnumerable(k)?(e.propertyIsEnumerable(k)&&(j="newstatement"),"keyword"):f.propertyIsEnumerable(k)?"atom":"word"}function l(a){return function(b,c){var d=!1,e,f=!1;while((e=b.next())!=null){if(e==a&&!d){f=!0;break}d=!d&&e=="\\"}if(f||!d&&!h)c.tokenize=null;return"string"}}function m(a,b){var c=!1,d;while(d=a.next()){if(d=="/"&&c){b.tokenize=null;break}c=d=="*"}return"comment"}function n(a,b,c,d,e){this.indented=a,this.column=b,this.type=c,this.align=d,this.prev=e}function o(a,b,c){return a.context=new n(a.indented,b,c,null,a.context)}function p(a){var b=a.context.type;if(b==")"||b=="]"||b=="}")a.indented=a.context.indented;return a.context=a.context.prev}var c=a.indentUnit,d=b.keywords||{},e=b.blockKeywords||{},f=b.atoms||{},g=b.hooks||{},h=b.multiLineStrings,i=/[+\-*&%=<>!?|\/]/,j;return{startState:function(a){return{tokenize:null,context:new n((a||0)-c,0,"top",!1),indented:0,startOfLine:!0}},token:function(a,b){var c=b.context;a.sol()&&(c.align==null&&(c.align=!1),b.indented=a.indentation(),b.startOfLine=!0);if(a.eatSpace())return null;j=null;var d=(b.tokenize||k)(a,b);if(d=="comment"||d=="meta")return d;c.align==null&&(c.align=!0);if(j!=";"&&j!=":"||c.type!="statement")if(j=="{")o(b,a.column(),"}");else if(j=="[")o(b,a.column(),"]");else if(j=="(")o(b,a.column(),")");else if(j=="}"){while(c.type=="statement")c=p(b);c.type=="}"&&(c=p(b));while(c.type=="statement")c=p(b)}else j==c.type?p(b):(c.type=="}"||c.type=="top"||c.type=="statement"&&j=="newstatement")&&o(b,a.column(),"statement");else p(b);return b.startOfLine=!1,d},indent:function(a,b){if(a.tokenize!=k&&a.tokenize!=null)return 0;var d=a.context,e=b&&b.charAt(0);d.type=="statement"&&e=="}"&&(d=d.prev);var f=e==d.type;return d.type=="statement"?d.indented+(e=="{"?0:c):d.align?d.column+(f?0:1):d.indented+(f?0:c)},electricChars:"{}"}}),function(){function a(a){var b={},c=a.split(" ");for(var d=0;d<c.length;++d)b[c[d]]=!0;return b}function c(a,b){return b.startOfLine?(a.skipToEnd(),"meta"):!1}function d(a,b){var c;while((c=a.next())!=null)if(c=='"'&&!a.eat('"')){b.tokenize=null;break}return"string"}var b="auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";CodeMirror.defineMIME("text/x-csrc",{name:"clike",keywords:a(b),blockKeywords:a("case do else for if switch while struct"),atoms:a("null"),hooks:{"#":c}}),CodeMirror.defineMIME("text/x-c++src",{name:"clike",keywords:a(b+" asm dynamic_cast namespace reinterpret_cast try bool explicit new "+"static_cast typeid catch operator template typename class friend private "+"this using const_cast inline public throw virtual delete mutable protected "+"wchar_t"),blockKeywords:a("catch class do else finally for if struct switch try while"),atoms:a("true false null"),hooks:{"#":c}}),CodeMirror.defineMIME("text/x-java",{name:"clike",keywords:a("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while"),blockKeywords:a("catch class do else finally for if switch try while"),atoms:a("true false null"),hooks:{"@":function(a,b){return a.eatWhile(/[\w\$_]/),"meta"}}}),CodeMirror.defineMIME("text/x-csharp",{name:"clike",keywords:a("abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),blockKeywords:a("catch class do else finally for foreach if struct switch try while"),atoms:a("true false null"),hooks:{"@":function(a,b){return a.eat('"')?(b.tokenize=d,d(a,b)):(a.eatWhile(/[\w\$_]/),"meta")}}})}(),CodeMirror.defineMode("coffeescript",function(a){function c(a){return new RegExp("^(("+a.join(")|(")+"))\\b")}function r(a,c){if(a.sol()){var k=c.scopes[0].offset;if(a.eatSpace()){var l=a.indentation();return l>k?"indent":l<k?"dedent":null}k>0&&v(a,c)}if(a.eatSpace())return null;var p=a.peek();if(a.match("###"))return c.tokenize=t,c.tokenize(a,c);if(p==="#")return a.skipToEnd(),"comment";if(a.match(/^-?[0-9\.]/,!1)){var r=!1;a.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i)&&(r=!0),a.match(/^-?\d+\.\d*/)&&(r=!0),a.match(/^-?\.\d+/)&&(r=!0);if(r)return a.peek()=="."&&a.backUp(1),"number";var u=!1;a.match(/^-?0x[0-9a-f]+/i)&&(u=!0),a.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/)&&(u=!0),a.match(/^-?0(?![\dx])/i)&&(u=!0);if(u)return"number"}if(a.match(n))return c.tokenize=s(a.current(),"string"),c.tokenize(a,c);if(a.match(o)){if(a.current()!="/"||a.match(/^.*\//,!1))return c.tokenize=s(a.current(),"string-2"),c.tokenize(a,c);a.backUp(1)}return a.match(h)||a.match(g)?"punctuation":a.match(f)||a.match(d)||a.match(j)?"operator":a.match(e)?"punctuation":a.match(q)?"atom":a.match(m)?"keyword":a.match(i)?"variable":(a.next(),b)}function s(c,d){var e=c.length==1;return function(g,h){while(!g.eol()){g.eatWhile(/[^'"\/\\]/);if(g.eat("\\")){g.next();if(e&&g.eol())return d}else{if(g.match(c))return h.tokenize=r,d;g.eat(/['"\/]/)}}return e&&(a.mode.singleLineStringErrors?d=b:h.tokenize=r),d}}function t(a,b){while(!a.eol()){a.eatWhile(/[^#]/);if(a.match("###")){b.tokenize=r;break}a.eatWhile("#")}return"comment"}function u(b,c,d){d=d||"coffee";var e=0;if(d==="coffee"){for(var f=0;f<c.scopes.length;f++)if(c.scopes[f].type==="coffee"){e=c.scopes[f].offset+a.indentUnit;break}}else e=b.column()+b.current().length;c.scopes.unshift({offset:e,type:d})}function v(a,b){if(b.scopes.length==1)return;if(b.scopes[0].type==="coffee"){var c=a.indentation(),d=-1;for(var e=0;e<b.scopes.length;++e)if(c===b.scopes[e].offset){d=e;break}if(d===-1)return!0;while(b.scopes[0].offset!==c)b.scopes.shift();return!1}return b.scopes.shift(),!1}function w(a,c){var d=c.tokenize(a,c),e=a.current();if(e===".")return d=c.tokenize(a,c),e=a.current(),d==="variable"?"variable":b;if(e==="@")return a.eat("@"),"keyword";e==="return"&&(c.dedent+=1),((e==="->"||e==="=>")&&!c.lambda&&c.scopes[0].type=="coffee"&&a.peek()===""||d==="indent")&&u(a,c);var f="[({".indexOf(e);return f!==-1&&u(a,c,"])}".slice(f,f+1)),k.exec(e)&&u(a,c),e=="then"&&v(a,c),d==="dedent"&&v(a,c)?b:(f="])}".indexOf(e),f!==-1&&v(a,c)?b:(c.dedent>0&&a.eol()&&c.scopes[0].type=="coffee"&&(c.scopes.length>1&&c.scopes.shift(),c.dedent-=1),d))}var b="error",d=new RegExp("^[\\+\\-\\*/%&|\\^~<>!?]"),e=new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"),f=new RegExp("^((->)|(=>)|(\\+\\+)|(\\+\\=)|(\\-\\-)|(\\-\\=)|(\\*\\*)|(\\*\\=)|(\\/\\/)|(\\/\\=)|(==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//))"),g=new RegExp("^((\\.\\.)|(\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"),h=new RegExp("^((\\.\\.\\.)|(//=)|(>>=)|(<<=)|(\\*\\*=))"),i=new RegExp("^[_A-Za-z$][_A-Za-z$0-9]*"),j=c(["and","or","not","is","isnt","in","instanceof","typeof"]),k=["for","while","loop","if","unless","else","switch","try","catch","finally","class"],l=["break","by","continue","debugger","delete","do","in","of","new","return","then","this","throw","when","until"],m=c(k.concat(l));k=c(k);var n=new RegExp("^('{3}|\"{3}|['\"])"),o=new RegExp("^(/{3}|/)"),p=["Infinity","NaN","undefined","null","true","false","on","off","yes","no"],q=c(p),x={startState:function(a){return{tokenize:r,scopes:[{offset:a||0,type:"coffee"}],lastToken:null,lambda:!1,dedent:0}},token:function(a,b){var c=w(a,b);return b.lastToken={style:c,content:a.current()},a.eol()&&a.lambda&&(b.lambda=!1),c},indent:function(a,b){return a.tokenize!=r?0:a.scopes[0].offset}};return x}),CodeMirror.defineMIME("text/x-coffeescript","coffeescript"),CodeMirror.defineMode("css",function(a){function d(a,b){return c=b,a}function e(a,b){var c=a.next();if(c=="@")return a.eatWhile(/[\w\\\-]/),d("meta",a.current());if(c=="/"&&a.eat("*"))return b.tokenize=f,f(a,b);if(c=="<"&&a.eat("!"))return b.tokenize=g,g(a,b);if(c!="=")return c!="~"&&c!="|"||!a.eat("=")?c=='"'||c=="'"?(b.tokenize=h(c),b.tokenize(a,b)):c=="#"?(a.eatWhile(/[\w\\\-]/),d("atom","hash")):c=="!"?(a.match(/^\s*\w*/),d("keyword","important")):/\d/.test(c)?(a.eatWhile(/[\w.%]/),d("number","unit")):/[,.+>*\/]/.test(c)?d(null,"select-op"):/[;{}:\[\]]/.test(c)?d(null,c):(a.eatWhile(/[\w\\\-]/),d("variable","variable")):d(null,"compare");d(null,"compare")}function f(a,b){var c=!1,f;while((f=a.next())!=null){if(c&&f=="/"){b.tokenize=e;break}c=f=="*"}return d("comment","comment")}function g(a,b){var c=0,f;while((f=a.next())!=null){if(c>=2&&f==">"){b.tokenize=e;break}c=f=="-"?c+1:0}return d("comment","comment")}function h(a){return function(b,c){var f=!1,g;while((g=b.next())!=null){if(g==a&&!f)break;f=!f&&g=="\\"}return f||(c.tokenize=e),d("string","string")}}var b=a.indentUnit,c;return{startState:function(a){return{tokenize:e,baseIndent:a||0,stack:[]}},token:function(a,b){if(a.eatSpace())return null;var d=b.tokenize(a,b),e=b.stack[b.stack.length-1];if(c=="hash"&&e!="rule")d="string-2";else if(d=="variable")if(e=="rule")d="number";else if(!e||e=="@media{")d="tag";return e=="rule"&&/^[\{\};]$/.test(c)&&b.stack.pop(),c=="{"?e=="@media"?b.stack[b.stack.length-1]="@media{":b.stack.push("{"):c=="}"?b.stack.pop():c=="@media"?b.stack.push("@media"):e=="{"&&c!="comment"&&b.stack.push("rule"),d},indent:function(a,c){var d=a.stack.length;return/^\}/.test(c)&&(d-=a.stack[a.stack.length-1]=="rule"?2:1),a.baseIndent+d*b},electricChars:"}"}}),CodeMirror.defineMIME("text/css","css"),CodeMirror.defineMode("htmlembedded",function(a,b){function g(a,b){return a.match(c,!1)?(b.token=h,e.token(a,b.scriptState)):f.token(a,b.htmlState)}function h(a,b){return a.match(d,!1)?(b.token=g,f.token(a,b.htmlState)):e.token(a,b.scriptState)}var c=b.scriptStartRegex||/^<%/i,d=b.scriptEndRegex||/^%>/i,e,f;return{startState:function(){return e=e||CodeMirror.getMode(a,b.scriptingModeSpec),f=f||CodeMirror.getMode(a,"htmlmixed"),{token:b.startOpen?h:g,htmlState:f.startState(),scriptState:e.startState()}},token:function(a,b){return b.token(a,b)},indent:function(a,b){return a.token==g?f.indent(a.htmlState,b):e.indent(a.scriptState,b)},copyState:function(a){return{token:a.token,htmlState:CodeMirror.copyState(f,a.htmlState),scriptState:CodeMirror.copyState(e,a.scriptState)}},electricChars:"/{}:"}}),CodeMirror.defineMIME("application/x-ejs",{name:"htmlembedded",scriptingModeSpec:"javascript"}),CodeMirror.defineMIME("application/x-aspx",{name:"htmlembedded",scriptingModeSpec:"text/x-csharp"}),CodeMirror.defineMIME("application/x-jsp",{name:"htmlembedded",scriptingModeSpec:"text/x-java"}),CodeMirror.defineMode("htmlmixed",function(a,b){function f(a,b){var f=c.token(a,b.htmlState);return f=="tag"&&a.current()==">"&&b.htmlState.context&&(/^script$/i.test(b.htmlState.context.tagName)?(b.token=h,b.localState=d.startState(c.indent(b.htmlState,"")),b.mode="javascript"):/^style$/i.test(b.htmlState.context.tagName)&&(b.token=i,b.localState=e.startState(c.indent(b.htmlState,"")),b.mode="css")),f}function g(a,b,c){var d=a.current(),e=d.search(b);return e>-1&&a.backUp(d.length-e),c}function h(a,b){return a.match(/^<\/\s*script\s*>/i,!1)?(b.token=f,b.curState=null,b.mode="html",f(a,b)):g(a,/<\/\s*script\s*>/,d.token(a,b.localState))}function i(a,b){return a.match(/^<\/\s*style\s*>/i,!1)?(b.token=f,b.localState=null,b.mode="html",f(a,b)):g(a,/<\/\s*style\s*>/,e.token(a,b.localState))}var c=CodeMirror.getMode(a,{name:"xml",htmlMode:!0}),d=CodeMirror.getMode(a,"javascript"),e=CodeMirror.getMode(a,"css");return{startState:function(){var a=c.startState();return{token:f,localState:null,mode:"html",htmlState:a}},copyState:function(a){if(a.localState)var b=CodeMirror.copyState(a.token==i?e:d,a.localState);return{token:a.token,localState:b,mode:a.mode,htmlState:CodeMirror.copyState(c,a.htmlState)}},token:function(a,b){return b.token(a,b)},indent:function(a,b){return a.token==f||/^\s*<\//.test(b)?c.indent(a.htmlState,b):a.token==h?d.indent(a.localState,b):e.indent(a.localState,b)},compareStates:function(a,b){return c.compareStates(a.htmlState,b.htmlState)},electricChars:"/{}:"}}),CodeMirror.defineMIME("text/html","htmlmixed"),CodeMirror.defineMode("javascript",function(a,b){function g(a,b,c){return b.tokenize=c,c(a,b)}function h(a,b){var c=!1,d;while((d=a.next())!=null){if(d==b&&!c)return!1;c=!c&&d=="\\"}return c}function k(a,b,c){return i=a,j=c,b}function l(a,b){var c=a.next();if(c=='"'||c=="'")return g(a,b,m(c));if(/[\[\]{}\(\),;\:\.]/.test(c))return k(c);if(c=="0"&&a.eat(/x/i))return a.eatWhile(/[\da-f]/i),k("number","number");if(/\d/.test(c))return a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),k("number","number");if(c=="/")return a.eat("*")?g(a,b,n):a.eat("/")?(a.skipToEnd(),k("comment","comment")):b.reAllowed?(h(a,"/"),a.eatWhile(/[gimy]/),k("regexp","string-2")):(a.eatWhile(f),k("operator",null,a.current()));if(c=="#")return a.skipToEnd(),k("error","error");if(f.test(c))return a.eatWhile(f),k("operator",null,a.current());a.eatWhile(/[\w\$_]/);var d=a.current(),i=e.propertyIsEnumerable(d)&&e[d];return i&&b.kwAllowed?k(i.type,i.style,d):k("variable","variable",d)}function m(a){return function(b,c){return h(b,a)||(c.tokenize=l),k("string","string")}}function n(a,b){var c=!1,d;while(d=a.next()){if(d=="/"&&c){b.tokenize=l;break}c=d=="*"}return k("comment","comment")}function p(a,b,c,d,e,f){this.indented=a,this.column=b,this.type=c,this.prev=e,this.info=f,d!=null&&(this.align=d)}function q(a,b){for(var c=a.localVars;c;c=c.next)if(c.name==b)return!0}function r(a,b,c,e,f){var g=a.cc;s.state=a,s.stream=f,s.marked=null,s.cc=g,a.lexical.hasOwnProperty("align")||(a.lexical.align=!0);for(;;){var h=g.length?g.pop():d?D:C;if(h(c,e)){while(g.length&&g[g.length-1].lex)g.pop()();return s.marked?s.marked:c=="variable"&&q(a,e)?"variable-2":b}}}function t(){for(var a=arguments.length-1;a>=0;a--)s.cc.push(arguments[a])}function u(){return t.apply(null,arguments),!0}function v(a){var b=s.state;if(b.context){s.marked="def";for(var c=b.localVars;c;c=c.next)if(c.name==a)return;b.localVars={name:a,next:b.localVars}}}function x(){s.state.context||(s.state.localVars=w),s.state.context={prev:s.state.context,vars:s.state.localVars}}function y(){s.state.localVars=s.state.context.vars,s.state.context=s.state.context.prev}function z(a,b){var c=function(){var c=s.state;c.lexical=new p(c.indented,s.stream.column(),a,null,c.lexical,b)};return c.lex=!0,c}function A(){var a=s.state;a.lexical.prev&&(a.lexical.type==")"&&(a.indented=a.lexical.indented),a.lexical=a.lexical.prev)}function B(a){return function(c){return c==a?u():a==";"?t():u(arguments.callee)}}function C(a){return a=="var"?u(z("vardef"),L,B(";"),A):a=="keyword a"?u(z("form"),D,C,A):a=="keyword b"?u(z("form"),C,A):a=="{"?u(z("}"),K,A):a==";"?u():a=="function"?u(R):a=="for"?u(z("form"),B("("),z(")"),N,B(")"),A,C,A):a=="variable"?u(z("stat"),G):a=="switch"?u(z("form"),D,z("}","switch"),B("{"),K,A,A):a=="case"?u(D,B(":")):a=="default"?u(B(":")):a=="catch"?u(z("form"),x,B("("),S,B(")"),C,A,y):t(z("stat"),D,B(";"),A)}function D(a){return o.hasOwnProperty(a)?u(F):a=="function"?u(R):a=="keyword c"?u(E):a=="("?u(z(")"),E,B(")"),A,F):a=="operator"?u(D):a=="["?u(z("]"),J(D,"]"),A,F):a=="{"?u(z("}"),J(I,"}"),A,F):u()}function E(a){return a.match(/[;\}\)\],]/)?t():t(D)}function F(a,b){if(a=="operator"&&/\+\+|--/.test(b))return u(F);if(a=="operator")return u(D);if(a==";")return;if(a=="(")return u(z(")"),J(D,")"),A,F);if(a==".")return u(H,F);if(a=="[")return u(z("]"),D,B("]"),A,F)}function G(a){return a==":"?u(A,C):t(F,B(";"),A)}function H(a){if(a=="variable")return s.marked="property",u()}function I(a){a=="variable"&&(s.marked="property");if(o.hasOwnProperty(a))return u(B(":"),D)}function J(a,b){function c(d){return d==","?u(a,c):d==b?u():u(B(b))}return function(e){return e==b?u():t(a,c)}}function K(a){return a=="}"?u():t(C,K)}function L(a,b){return a=="variable"?(v(b),u(M)):u()}function M(a,b){if(b=="=")return u(D,M);if(a==",")return u(L)}function N(a){return a=="var"?u(L,P):a==";"?t(P):a=="variable"?u(O):t(P)}function O(a,b){return b=="in"?u(D):u(F,P)}function P(a,b){return a==";"?u(Q):b=="in"?u(D):u(D,B(";"),Q)}function Q(a){a!=")"&&u(D)}function R(a,b){if(a=="variable")return v(b),u(R);if(a=="(")return u(z(")"),x,J(S,")"),A,C,y)}function S(a,b){if(a=="variable")return v(b),u()}var c=a.indentUnit,d=b.json,e=function(){function a(a){return{type:a,style:"keyword"}}var b=a("keyword a"),c=a("keyword b"),d=a("keyword c"),e=a("operator"),f={type:"atom",style:"atom"};return{"if":b,"while":b,"with":b,"else":c,"do":c,"try":c,"finally":c,"return":d,"break":d,"continue":d,"new":d,"delete":d,"throw":d,"var":a("var"),"const":a("var"),let:a("var"),"function":a("function"),"catch":a("catch"),"for":a("for"),"switch":a("switch"),"case":a("case"),"default":a("default"),"in":e,"typeof":e,"instanceof":e,"true":f,"false":f,"null":f,"undefined":f,NaN:f,Infinity:f}}(),f=/[+\-*&%=<>!?|]/,i,j,o={atom:!0,number:!0,variable:!0,string:!0,regexp:!0},s={state:null,column:null,marked:null,cc:null},w={name:"this",next:{name:"arguments"}};return A.lex=!0,{startState:function(a){return{tokenize:l,reAllowed:!0,kwAllowed:!0,cc:[],lexical:new p((a||0)-c,0,"block",!1),localVars:null,context:null,indented:0}},token:function(a,b){a.sol()&&(b.lexical.hasOwnProperty("align")||(b.lexical.align=!1),b.indented=a.indentation());if(a.eatSpace())return null;var c=b.tokenize(a,b);return i=="comment"?c:(b.reAllowed=i=="operator"||i=="keyword c"||!!i.match(/^[\[{}\(,;:]$/),b.kwAllowed=i!=".",r(b,c,i,j,a))},indent:function(a,b){if(a.tokenize!=l)return 0;var d=b&&b.charAt(0),e=a.lexical,f=e.type,g=d==f;return f=="vardef"?e.indented+4:f=="form"&&d=="{"?e.indented:f=="stat"||f=="form"?e.indented+c:e.info=="switch"&&!g?e.indented+(/^(?:case|default)\b/.test(b)?c:2*c):e.align?e.column+(g?0:1):e.indented+(g?0:c)},electricChars:":{}"}}),CodeMirror.defineMIME("text/javascript","javascript"),CodeMirror.defineMIME("application/json",{name:"javascript",json:!0}),CodeMirror.defineMode("mysql",function(a){function d(a){return new RegExp("^(?:"+a.join("|")+")$","i")}function h(a,b){var d=a.next();c=null;if(d=="$"||d=="?")return a.match(/^[\w\d]*/),"variable-2";if(d=="<"&&!a.match(/^[\s\u00a0=]/,!1))return a.match(/^[^\s\u00a0>]*>?/),"atom";if(d=='"'||d=="'")return b.tokenize=i(d),b.tokenize(a,b);if(d=="`")return b.tokenize=j(d),b.tokenize(a,b);if(/[{}\(\),\.;\[\]]/.test(d))return c=d,null;if(d!="-"){if(g.test(d))return a.eatWhile(g),null;if(d==":")return a.eatWhile(/[\w\d\._\-]/),"atom";a.eatWhile(/[_\w\d]/);if(a.eat(":"))return a.eatWhile(/[\w\d_\-]/),"atom";var h=a.current(),k;return e.test(h)?null:f.test(h)?"keyword":"variable"}ch2=a.next();if(ch2=="-")return a.skipToEnd(),"comment"}function i(a){return function(b,c){var d=!1,e;while((e=b.next())!=null){if(e==a&&!d){c.tokenize=h;break}d=!d&&e=="\\"}return"string"}}function j(a){return function(b,c){var d=!1,e;while((e=b.next())!=null){if(e==a&&!d){c.tokenize=h;break}d=!d&&e=="\\"}return"variable-2"}}function k(a,b,c){a.context={prev:a.context,indent:a.indent,col:c,type:b}}function l(a){a.indent=a.context.indent,a.context=a.context.prev}var b=a.indentUnit,c,e=d(["str","lang","langmatches","datatype","bound","sameterm","isiri","isuri","isblank","isliteral","union","a"]),f=d(["ACCESSIBLE","ALTER","AS","BEFORE","BINARY","BY","CASE","CHARACTER","COLUMN","CONTINUE","CROSS","CURRENT_TIMESTAMP","DATABASE","DAY_MICROSECOND","DEC","DEFAULT","DESC","DISTINCT","DOUBLE","EACH","ENCLOSED","EXIT","FETCH","FLOAT8","FOREIGN","GRANT","HIGH_PRIORITY","HOUR_SECOND","IN","INNER","INSERT","INT2","INT8","INTO","JOIN","KILL","LEFT","LINEAR","LOCALTIME","LONG","LOOP","MATCH","MEDIUMTEXT","MINUTE_SECOND","NATURAL","NULL","OPTIMIZE","OR","OUTER","PRIMARY","RANGE","READ_WRITE","REGEXP","REPEAT","RESTRICT","RIGHT","SCHEMAS","SENSITIVE","SHOW","SPECIFIC","SQLSTATE","SQL_CALC_FOUND_ROWS","STARTING","TERMINATED","TINYINT","TRAILING","UNDO","UNLOCK","USAGE","UTC_DATE","VALUES","VARCHARACTER","WHERE","WRITE","ZEROFILL","ALL","AND","ASENSITIVE","BIGINT","BOTH","CASCADE","CHAR","COLLATE","CONSTRAINT","CREATE","CURRENT_TIME","CURSOR","DAY_HOUR","DAY_SECOND","DECLARE","DELETE","DETERMINISTIC","DIV","DUAL","ELSEIF","EXISTS","FALSE","FLOAT4","FORCE","FULLTEXT","HAVING","HOUR_MINUTE","IGNORE","INFILE","INSENSITIVE","INT1","INT4","INTERVAL","ITERATE","KEYS","LEAVE","LIMIT","LOAD","LOCK","LONGTEXT","MASTER_SSL_VERIFY_SERVER_CERT","MEDIUMINT","MINUTE_MICROSECOND","MODIFIES","NO_WRITE_TO_BINLOG","ON","OPTIONALLY","OUT","PRECISION","PURGE","READS","REFERENCES","RENAME","REQUIRE","REVOKE","SCHEMA","SELECT","SET","SPATIAL","SQLEXCEPTION","SQL_BIG_RESULT","SSL","TABLE","TINYBLOB","TO","TRUE","UNIQUE","UPDATE","USING","UTC_TIMESTAMP","VARCHAR","WHEN","WITH","YEAR_MONTH","ADD","ANALYZE","ASC","BETWEEN","BLOB","CALL","CHANGE","CHECK","CONDITION","CONVERT","CURRENT_DATE","CURRENT_USER","DATABASES","DAY_MINUTE","DECIMAL","DELAYED","DESCRIBE","DISTINCTROW","DROP","ELSE","ESCAPED","EXPLAIN","FLOAT","FOR","FROM","GROUP","HOUR_MICROSECOND","IF","INDEX","INOUT","INT","INT3","INTEGER","IS","KEY","LEADING","LIKE","LINES","LOCALTIMESTAMP","LONGBLOB","LOW_PRIORITY","MEDIUMBLOB","MIDDLEINT","MOD","NOT","NUMERIC","OPTION","ORDER","OUTFILE","PROCEDURE","READ","REAL","RELEASE","REPLACE","RETURN","RLIKE","SECOND_MICROSECOND","SEPARATOR","SMALLINT","SQL","SQLWARNING","SQL_SMALL_RESULT","STRAIGHT_JOIN","THEN","TINYTEXT","TRIGGER","UNION","UNSIGNED","USE","UTC_TIME","VARBINARY","VARYING","WHILE","XOR","FULL","COLUMNS","MIN","MAX","STDEV","COUNT"]),g=/[*+\-<>=&|]/;return{startState:function(a){return{tokenize:h,context:null,indent:0,col:0}},token:function(a,b){a.sol()&&(b.context&&b.context.align==null&&(b.context.align=!1),b.indent=a.indentation());if(a.eatSpace())return null;var d=b.tokenize(a,b);d!="comment"&&b.context&&b.context.align==null&&b.context.type!="pattern"&&(b.context.align=!0);if(c=="(")k(b,")",a.column());else if(c=="[")k(b,"]",a.column());else if(c=="{")k(b,"}",a.column());else if(/[\]\}\)]/.test(c)){while(b.context&&b.context.type=="pattern")l(b);b.context&&c==b.context.type&&l(b)}else c=="."&&b.context&&b.context.type=="pattern"?l(b):/atom|string|variable/.test(d)&&b.context&&(/[\}\]]/.test(b.context.type)?k(b,"pattern",a.column()):b.context.type=="pattern"&&!b.context.align&&(b.context.align=!0,b.context.col=a.column()));return d},indent:function(a,c){var d=c&&c.charAt(0),e=a.context;if(/[\]\}]/.test(d))while(e&&e.type=="pattern")e=e.prev;var f=e&&d==e.type;return e?e.type=="pattern"?e.col:e.align?e.col+(f?0:1):e.indent+(f?0:b):0}}}),CodeMirror.defineMIME("text/x-mysql","mysql"),function(){function a(a){var b={},c=a.split(" ");for(var d=0;d<c.length;++d)b[c[d]]=!0;return b}function b(a){return function(b,c){return b.match(a)?c.tokenize=null:b.skipToEnd(),"string"}}var c={name:"clike",keywords:a("abstract and array as break case catch class clone const continue declare default do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach function global goto if implements interface instanceof namespace new or private protected public static switch throw trait try use var while xor die echo empty exit eval include include_once isset list require require_once return print unset __halt_compiler self static parent"),blockKeywords:a("catch do else elseif for foreach if switch try while"),atoms:a("true false null TRUE FALSE NULL"),multiLineStrings:!0,hooks:{$:function(a,b){return a.eatWhile(/[\w\$_]/),"variable-2"},"<":function(a,c){return a.match(/<</)?(a.eatWhile(/[\w\.]/),c.tokenize=b(a.current().slice(3)),c.tokenize(a,c)):!1},"#":function(a,b){while(!a.eol()&&!a.match("?>",!1))a.next();return"comment"},"/":function(a,b){if(a.eat("/")){while(!a.eol()&&!a.match("?>",!1))a.next();return"comment"}return!1}}};CodeMirror.defineMode("php",function(a,b){function h(a,b){var c=b.mode=="php";a.sol()&&b.pending!='"'&&(b.pending=null);if(b.curMode==d){if(a.match(/^<\?\w*/))return b.curMode=g,b.curState=b.php,b.curClose="?>",b.mode="php","meta";if(b.pending=='"'){while(!a.eol()&&a.next()!='"');var i="string"}else if(b.pending&&a.pos<b.pending.end){a.pos=b.pending.end;var i=b.pending.style}else var i=d.token(a,b.curState);b.pending=null;var j=a.current(),k=j.search(/<\?/);return k!=-1?(i=="string"&&/\"$/.test(j)&&!/\?>/.test(j)?b.pending='"':b.pending={end:a.pos,style:i},a.backUp(j.length-k)):i=="tag"&&a.current()==">"&&b.curState.context&&(/^script$/i.test(b.curState.context.tagName)?(b.curMode=e,b.curState=e.startState(d.indent(b.curState,"")),b.curClose=/^<\/\s*script\s*>/i,b.mode="javascript"):/^style$/i.test(b.curState.context.tagName)&&(b.curMode=f,b.curState=f.startState(d.indent(b.curState,"")),b.curClose=/^<\/\s*style\s*>/i,b.mode="css")),i}return(!c||b.php.tokenize==null)&&a.match(b.curClose,c)?(b.curMode=d,b.curState=b.html,b.curClose=null,b.mode="html",c?"meta":h(a,b)):b.curMode.token(a,b.curState)}var d=CodeMirror.getMode(a,{name:"xml",htmlMode:!0}),e=CodeMirror.getMode(a,"javascript"),f=CodeMirror.getMode(a,"css"),g=CodeMirror.getMode(a,c);return{startState:function(){var a=d.startState();return{html:a,php:g.startState(),curMode:b.startOpen?g:d,curState:b.startOpen?g.startState():a,curClose:b.startOpen?/^\?>/:null,mode:b.startOpen?"php":"html",pending:null}},copyState:function(a){var b=a.html,c=CodeMirror.copyState(d,b),e=a.php,f=CodeMirror.copyState(g,e),h;return a.curState==b?h=c:a.curState==e?h=f:h=CodeMirror.copyState(a.curMode,a.curState),{html:c,php:f,curMode:a.curMode,curState:h,curClose:a.curClose,mode:a.mode,pending:a.pending}},token:h,indent:function(a,b){return a.curMode!=g&&/^\s*<\//.test(b)||a.curMode==g&&/^\?>/.test(b)?d.indent(a.html,b):a.curMode.indent(a.curState,b)},electricChars:"/{}:"}}),CodeMirror.defineMIME("application/x-httpd-php","php"),CodeMirror.defineMIME("application/x-httpd-php-open",{name:"php",startOpen:!0}),CodeMirror.defineMIME("text/x-php",c)}(),CodeMirror.defineMode("xml",function(a,b){function h(a,b){function c(c){return b.tokenize=c,c(a,b)}var d=a.next();if(d=="<"){if(a.eat("!"))return a.eat("[")?a.match("CDATA[")?c(k("atom","]]>")):null:a.match("--")?c(k("comment","-->")):a.match("DOCTYPE",!0,!0)?(a.eatWhile(/[\w\._\-]/),c(l(1))):null;if(a.eat("?"))return a.eatWhile(/[\w\._\-]/),b.tokenize=k("meta","?>"),"meta";g=a.eat("/")?"closeTag":"openTag",a.eatSpace(),f="";var e;while(e=a.eat(/[^\s\u00a0=<>\"\'\/?]/))f+=e;return b.tokenize=i,"tag"}if(d=="&"){var h;return a.eat("#")?a.eat("x")?h=a.eatWhile(/[a-fA-F\d]/)&&a.eat(";"):h=a.eatWhile(/[\d]/)&&a.eat(";"):h=a.eatWhile(/[\w\.\-:]/)&&a.eat(";"),h?"atom":"error"}return a.eatWhile(/[^&<]/),null}function i(a,b){var c=a.next();return c==">"||c=="/"&&a.eat(">")?(b.tokenize=h,g=c==">"?"endTag":"selfcloseTag","tag"):c=="="?(g="equals",null):/[\'\"]/.test(c)?(b.tokenize=j(c),b.tokenize(a,b)):(a.eatWhile(/[^\s\u00a0=<>\"\'\/?]/),"word")}function j(a){return function(b,c){while(!b.eol())if(b.next()==a){c.tokenize=i;break}return"string"}}function k(a,b){return function(c,d){while(!c.eol()){if(c.match(b)){d.tokenize=h;break}c.next()}return a}}function l(a){return function(b,c){var d;while((d=b.next())!=null){if(d=="<")return c.tokenize=l(a+1),c.tokenize(b,c);if(d==">"){if(a==1){c.tokenize=h;break}return c.tokenize=l(a-1),c.tokenize(b,c)}}return"meta"}}function o(){for(var a=arguments.length-1;a>=0;a--)m.cc.push(arguments[a])}function p(){return o.apply(null,arguments),!0}function q(a,b){var c=d.doNotIndent.hasOwnProperty(a)||m.context&&m.context.noIndent;m.context={prev:m.context,tagName:a,indent:m.indented,startOfLine:b,noIndent:c}}function r(){m.context&&(m.context=m.context.prev)}function s(a){if(a=="openTag")return m.tagName=f,p(v,t(m.startOfLine));if(a=="closeTag"){var b=!1;return m.context?b=m.context.tagName!=f:b=!0,b&&(n="error"),p(u(b))}return p()}function t(a){return function(b){return b=="selfcloseTag"||b=="endTag"&&d.autoSelfClosers.hasOwnProperty(m.tagName.toLowerCase())?p():b=="endTag"?(q(m.tagName,a),p()):p()}}function u(a){return function(b){return a&&(n="error"),b=="endTag"?(r(),p()):(n="error",p(arguments.callee))}}function v(a){return a=="word"?(n="attribute",p(w,v)):a=="endTag"||a=="selfcloseTag"?o():(n="error",p(v))}function w(a){return a=="equals"?p(x,v):(d.allowMissing||(n="error"),a=="endTag"||a=="selfcloseTag"?o():p())}function x(a){return a=="string"?p(y):a=="word"&&d.allowUnquoted?(n="string",p()):(n="error",a=="endTag"||a=="selfCloseTag"?o():p())}function y(a){return a=="string"?p(y):o()}var c=a.indentUnit,d=b.htmlMode?{autoSelfClosers:{br:!0,img:!0,hr:!0,link:!0,input:!0,meta:!0,col:!0,frame:!0,base:!0,area:!0},doNotIndent:{pre:!0},allowUnquoted:!0,allowMissing:!1}:{autoSelfClosers:{},doNotIndent:{},allowUnquoted:!1,allowMissing:!1},e=b.alignCDATA,f,g,m,n;return{startState:function(){return{tokenize:h,cc:[],indented:0,startOfLine:!0,tagName:null,context:null}},token:function(a,b){a.sol()&&(b.startOfLine=!0,b.indented=a.indentation());if(a.eatSpace())return null;n=g=f=null;var c=b.tokenize(a,b);b.type=g;if((c||g)&&c!="comment"){m=b;for(;;){var d=b.cc.pop()||s;if(d(g||c))break}}return b.startOfLine=!1,n||c},indent:function(a,b,d){var f=a.context;if(a.tokenize!=i&&a.tokenize!=h||f&&f.noIndent)return d?d.match(/^(\s*)/)[0].length:0;if(e&&/<!\[CDATA\[/.test(b))return 0;f&&/^<\//.test(b)&&(f=f.prev);while(f&&!f.startOfLine)f=f.prev;return f?f.indent+c:0},compareStates:function(a,b){if(a.indented!=b.indented||a.tokenize!=b.tokenize)return!1;for(var c=a.context,d=b.context;;c=c.prev,d=d.prev){if(!c||!d)return c==d;if(c.tagName!=d.tagName)return!1}},electricChars:"/"}}),CodeMirror.defineMIME("application/xml","xml"),CodeMirror.defineMIME("text/html",{name:"xml",htmlMode:!0})