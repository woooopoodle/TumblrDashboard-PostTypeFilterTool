// ==UserScript==
// @name        Tumblr Dashboard Post Type Filter
// @namespace   poodle
// @include     https://www.tumblr.com/dashboard*
// @version     1
// ==/UserScript==
try{
var styleRule = [".f_audiobutton:before{content:\"\\EA6A\"}",
	".f_chatbutton:before{content:\"\\EA6C\"}",
	".f_linkbutton:before{content:\"\\EA70\"}",
	".f_photobutton:before{content:\"\\EA73\"}",
	".f_quotebutton:before{content:\"\\EA75\"}",
	".f_textbutton:before{content:\"\\EA77\"}",
	".f_videobutton:before{content:\"\\EA79\"}",
	".f_refreshbutton:after{content:\"Update\"}",
	".f_photobutton.f_active { color: #D95E40 }",
	".f_textbutton.f_active { color: #444 }",
	".f_quotebutton.f_active { color:#f2992e }",
	".f_linkbutton.f_active { color: #56bc8a }",
	".f_chatbutton.f_active { color: #529ecc }",
	".f_audiobutton.f_active { color: #a77dc2 }",
	".f_videobutton.f_active { color: #748089 }",
	".f_active {background:rgba(255,255,255,/*0.2*/0.05)}"];

for(var i = 0; i < styleRule.length; i++){
	document.styleSheets[0].insertRule(styleRule[i], 1);
}

var styleRule2 = [".filterwrapper{position: fixed;top:60px;right:50px;width: 250px;background: black;border-radius:6px;padding:5px;color: rgba(255,255,255,0.1);}",
	".filterbutton{width: 40px;height: 40px;background: transparent;display: inline-block;margin: 3px 0px 0px 3px;padding:5px;font-size:10px;cursor:pointer;text-align:center;}",
	".peepr .filterwrapper{right: 650px;}",
	".f_refreshbutton{width: calc(250px - 10px - 6px);height: 20px;margin: 3px;}",
	".filterbutton:hover{background:rgba(255,255,255,0.05); }",
	".f_refreshbutton {width: calc(250px - 10px - 6px);height: 20px;margin: 3px;color: #444;background: rgb(20,20,20);}"]
	
for(var i = 0; i < styleRule2.length; i++)
	document.styleSheets[0].insertRule(styleRule2[i], 1);


document.styleSheets[0].insertRule(
	"[class*=\" f_\"]:not(.f_tab_filter):before, [class^=\"f_\"]:not(.f_tab_filter):before {display: inline-block;line-height: 1;font-size: 36px;line-height: .75;font-family: tumblr-icons,Blank;}",
	1);

	
var filterButtonElementsHTML =
	"<div class=\"filterbutton f_textbutton f_active\" title=\"Text\" >Text</div>" +
	"<div class=\"filterbutton f_photobutton f_active\" title=\"Photo\" onclick=\"toggleFilter(this);\">Photo</div>" +
	"<div class=\"filterbutton f_quotebutton f_active\" title=\"Quote\" onclick=\"toggleFilter(this);\">Quote</div>" +
	"<div class=\"filterbutton f_linkbutton f_active\" title=\"Link\" onclick=\"toggleFilter(this);\">Link</div>" +
	"<div class=\"filterbutton f_chatbutton f_active\" title=\"Chat\" onclick=\"toggleFilter(this);\">Chat</div>" +
	"<div class=\"filterbutton f_audiobutton f_active\" title=\"Audio\" onclick=\"toggleFilter(this);\">Audio</div>" +
	"<div class=\"filterbutton f_videobutton f_active\" title=\"Video\" onclick=\"toggleFilter(this);\">Video</div>" +
	"<div class=\"filterbutton f_refreshbutton\"></div>";

var filterWrapperEm = document.createElement('div');
//filterWrapperEm.classList.addClass("filterwrapper");
filterWrapperEm.setAttribute("class","filterwrapper hidden");

filterWrapperEm.innerHTML += filterButtonElementsHTML;
//filterWrapperEm.childNodes[0].onclick = toggleFilter(filterWrapperEm.childNodes[0]);
//console.log("a");

//filterWrapperEm.addEventListener('click', echo(2))
filterWrapperEm.addEventListener('click', toggleFilter)
document.body.insertBefore(filterWrapperEm, document.body.childNodes[document.body.childNodes.length]);

//button for top bar
var fbuttEm = document.createElement('div');
//fbuttEm.innerHTML += "<div title=\"Post Type Filter\" class=\"tab iconic f_tab_filter\" onclick=\"toggleFilterBox(this);\" >";
fbuttEm.innerHTML += "<div title=\"Post Type Filter\" class=\"tab iconic f_tab_filter\" >";

fbuttEm = fbuttEm.childNodes[0];

fbuttEm.onclick = function(){
	//document.body.getElemendById();
	//console.log(filterWrapperEm);
	if(filterWrapperEm.className.contains("hidden"))
		filterWrapperEm.classList.remove("hidden");
	else
		filterWrapperEm.classList.add("hidden");
};

var tabBar = document.getElementById("user_tools");
tabBar.insertBefore(fbuttEm, tabBar.childNodes[tabBar.childNodes.length - 2]);

document.styleSheets[0].insertRule(
	".f_tab_filter{background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAhCAYAAAA74pBqAAAABGdBTUEAALGPC/xhBQAAAZZJREFUSA3dlr1KA0EUhXc14k9lIxHTpHAFG1GwCxYW4guEgK2PYK0PkEa08AEsrERJZWcpCGJlpyAWGjCFqfwBlfUbWZa5M7PrTrQIDpzMveeee3Z+wiZB4BhxHE+CZ6CPD5J1hzylBtJIBjOkY5IKBsnnDE6kWWbTQlUwyTJbLtgvZJYZ5zKOoi5UBRPLjL4tMFKwX8iEGatqUN0QCo/k2wyTYbBJ375HryUNMVmB3QORVbWJS6hTmw46cNvK7IVg1CHwpWbVNv/CSD24JC7Adymmvr/NuuZye8hjerrqNisE1cSgyVxLYtd0CLnrKHTCMLwp8fFAUSHA+Mkh1Kk2+jOd0OP+vgB9pb+K/882w7xzMLf5mSem5vXrdPuDWY3vYjVLY67sKkuY8EPMRxgugAjUQVPlVh/kPOhltJSZdaA4XcNH1pPyiVfKE+Y2VctOfp+zqt7Wq66Vqf8UF8A+B6dPSh6kkR6w1Qq48zy8R91DxBiVwXFBwza6hrVN4UiCaJFpDSyBKVAGb+AenIMT0OI99/4F8BYUhlPAAqcAAAAASUVORK5CYII=') no-repeat /*center*/ 50% 6px / 13px  transparent !important;-webkit-transform:rotate(180deg) !important;transform:rotate(180deg) !important;-moz-transform: scaleY(-1) !important;-webkit-transform: scaleY(-1) !important;transform: scaleY(-1) !important;width: 37px;opacity: 0.15;cursor:pointer}",
	1);
document.styleSheets[0].insertRule(
	".f_tab_filter:hover{opacity:0.5}",
	1);



} catch(e){console.log(e);}

function toggleFilter(em) {
	
	if(em.className.contains("f_active"))
		em.classList.remove("f_active");
	else
		em.classList.add("f_active");
}

function toggleFilterBox(em) {
	
	if(em.className.contains("f_active"))
		em.classList.remove("f_active");
	else
		em.classList.add("f_active");
}

function echo(em){console.log("a");/*xs = document.body;*/}