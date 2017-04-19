// ==UserScript==
// @name        Tumblr Dashboard Post Type Filter
// @namespace   https://github.com/woooopoodle
// @include     https://www.tumblr.com/dashboard*
// @include     https://www.tumblr.com/likes*
// @include     https://www.tumblr.com/liked/by/*
// @include     https://www.tumblr.com/posts*
// @include     https://www.tumblr.com/tagged*
// @include     https://www.tumblr.com/blog*
// @version     0.1
// ==/UserScript==

var filterBoxWidthRule = "174px";
	
var styleRule = [".f_audiobutton:before{content:\"\\EA6A\"}",
	".f_chatbutton:before{content:\"\\EA6C\"}",
	".f_linkbutton:before{content:\"\\EA70\"}",
	".f_photobutton:before{content:\"\\EA73\"}",
	".f_quotebutton:before{content:\"\\EA75\"}",
	".f_textbutton:before{content:\"\\EA77\"}",
	".f_videobutton:before{content:\"\\EA79\"}",
	".f_gifbutton:before{content:\"\\EA82\"}",
	".f_setbutton:before{content:\"\\EAAA\"}",
	".f_refreshbutton:after{content:\"Update\"}",".f_refreshbutton:before{content:\"\\Ea86\";font-size:24px!important}",
	".f_togglebutton:after{content:\"Hide\"}",
	".f_active.f_togglebutton:after{content:\"Shrink\"}",
	".f_photobutton.f_active { color: #D95E40 }",
	".f_textbutton.f_active { color: #444 }",
	".f_quotebutton.f_active { color:#f2992e }",
	".f_linkbutton.f_active { color: #56bc8a }",
	".f_chatbutton.f_active { color: #529ecc }",
	".f_audiobutton.f_active { color: #a77dc2 }",
	".f_videobutton.f_active { color: #748089 }",
	".f_gifbutton.f_active { color: red }",
	".f_setbutton.f_active { color: cyan }",
	".f_active {background:rgba(255,255,255,0.05)}"];

for(var i = 0; i < styleRule.length; i++)
	document.styleSheets[0].insertRule(styleRule[i], 1);

var styleRule2 = [".filterwrapper{position: fixed;top:60px;right:50px;width: " + filterBoxWidthRule + "; background: black;border-radius:6px;padding:5px;color: rgba(255,255,255,0.1);}",
	".filterbutton{width: 40px;height: 40px;background: transparent;display: inline-block;margin: 3px 0px 0px 3px;padding:5px;font-size:10px;cursor:pointer;text-align:center;}",
	".peepr .filterwrapper{right: 650px; z-index:999}",
	".f_refreshbutton{width: calc(" + filterBoxWidthRule + " - 10px - 6px) !important;height: 20px !important;margin: 3px !important;}",
	".filterbutton:hover{background:rgba(255,255,255,0.05); }",
	".f_refreshbutton {width: calc(" + filterBoxWidthRule + " - 10px - 6px);height: 20px;margin: 3px;color: #444;background: rgb(20,20,20);}",
	".f_togglebutton {width:40px!important; height:20px !important;margin: 3px;color: #444;background: rgb(20,20,20);}",
	".is_text, .is_photo, .is_quote ,.is_link, .is_chat, .is_audio, .is_video, .is_animated, .is_photoset{transition: opacity 0.25s}",
	".post_permalink{pointer-events:all !important}"]
	
for(var i = 0; i < styleRule2.length; i++)
	document.styleSheets[0].insertRule(styleRule2[i], 1);


document.styleSheets[0].insertRule(
	"[class*=\" f_\"]:not(.f_tab_filter):before, [class^=\"f_\"]:not(.f_tab_filter):before {display: inline-block;line-height: 1;font-size: 36px;line-height: .75;font-family: tumblr-icons,Blank;}",
	1);

	
var filterButtonElementsHTML =
	"<div class=\"filterbutton f_active f_togglebutton\" style=\"\"></div>" +
	"<div><div class=\"filterbutton f_textbutton f_active\" title=\"Text\" >Text</div>" +
	"<div class=\"filterbutton f_photobutton f_active\" title=\"Photo\" >Photo</div>" +
	"<div class=\"filterbutton f_quotebutton f_active\" title=\"Quote\" >Quote</div>" +
	"<div class=\"filterbutton f_linkbutton f_active\" title=\"Link\" >Link</div>" +
	"<div class=\"filterbutton f_chatbutton f_active\" title=\"Chat\" >Chat</div>" +
	"<div class=\"filterbutton f_audiobutton f_active\" title=\"Audio\" >Audio</div>" +
	"<div class=\"filterbutton f_videobutton f_active\" title=\"Video\" >Video</div>" +
	"<div class=\"filterbutton f_gifbutton f_active\" title=\"Gif\" >Gif</div>" +
	"<div class=\"filterbutton f_setbutton f_active\" title=\"Photoset\" >Photoset</div></div>" +
	"<div class=\"filterbutton f_refreshbutton\"></div>";

var filterWrapperEm = document.createElement('div');
filterWrapperEm.setAttribute("class","filterwrapper hidden");

filterWrapperEm.innerHTML += filterButtonElementsHTML;

buttonsEm = filterWrapperEm.childNodes[1];

for(var i = 0; i < buttonsEm.childNodes.length; i++)
	buttonsEm.childNodes[i].addEventListener('click', toggleFilter);
document.body.insertBefore(filterWrapperEm, document.body.childNodes[document.body.childNodes.length]);

filterWrapperEm.childNodes[0].addEventListener('click', toggleFilterType);

//button for top bar
var fbuttEm = document.createElement('div');
fbuttEm.innerHTML += "<div title=\"Post Type Filter\" class=\"tab iconic f_tab_filter\" >";

fbuttEm = fbuttEm.childNodes[0];

fbuttEm.addEventListener('click', toggleFilterBox);

var tabBar = document.getElementById("user_tools");
tabBar.insertBefore(fbuttEm, tabBar.childNodes[tabBar.childNodes.length - 2]);

document.styleSheets[0].insertRule(
	".f_tab_filter{background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAhCAYAAAA74pBqAAAABGdBTUEAALGPC/xhBQAAAZZJREFUSA3dlr1KA0EUhXc14k9lIxHTpHAFG1GwCxYW4guEgK2PYK0PkEa08AEsrERJZWcpCGJlpyAWGjCFqfwBlfUbWZa5M7PrTrQIDpzMveeee3Z+wiZB4BhxHE+CZ6CPD5J1hzylBtJIBjOkY5IKBsnnDE6kWWbTQlUwyTJbLtgvZJYZ5zKOoi5UBRPLjL4tMFKwX8iEGatqUN0QCo/k2wyTYbBJ375HryUNMVmB3QORVbWJS6hTmw46cNvK7IVg1CHwpWbVNv/CSD24JC7Adymmvr/NuuZye8hjerrqNisE1cSgyVxLYtd0CLnrKHTCMLwp8fFAUSHA+Mkh1Kk2+jOd0OP+vgB9pb+K/882w7xzMLf5mSem5vXrdPuDWY3vYjVLY67sKkuY8EPMRxgugAjUQVPlVh/kPOhltJSZdaA4XcNH1pPyiVfKE+Y2VctOfp+zqt7Wq66Vqf8UF8A+B6dPSh6kkR6w1Qq48zy8R91DxBiVwXFBwza6hrVN4UiCaJFpDSyBKVAGb+AenIMT0OI99/4F8BYUhlPAAqcAAAAASUVORK5CYII=') no-repeat /*center*/ 50% 6px / 13px  transparent !important;-webkit-transform:rotate(180deg) !important;transform:rotate(180deg) !important;-moz-transform: scaleY(-1) !important;-webkit-transform: scaleY(-1) !important;transform: scaleY(-1) !important;width: 37px;opacity: 0.15;cursor:pointer}",
	1);
document.styleSheets[0].insertRule(
	".f_tab_filter:hover{opacity:0.5}",
	1);

//update button shenanigans
fUpdateEm = filterWrapperEm.childNodes[filterWrapperEm.childNodes.length - 1];

fUpdateEm.addEventListener("click", refresh);

//new stylesheet
var filterSheet = (function() {
	var style = document.createElement("style");
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);

	return style.sheet;
})();

var filterType = false;

function toggleFilter(em) {
	
	if(em.target.className.contains("f_active"))
		em.target.classList.remove("f_active");
	else
		em.target.classList.add("f_active");
}

function toggleFilterBox(em) {
	if(filterWrapperEm.className.contains("hidden"))
		filterWrapperEm.classList.remove("hidden");
	else
		filterWrapperEm.classList.add("hidden");
}

function refresh(ev) {try{
	
	//Clear all previous rules
	while(filterSheet.cssRules.length != 0)
		filterSheet.deleteRule(0);
	
	//make stuff
	var buttons = buttonsEm.childNodes;
	//console.log(buttonsEm);
	var ruleFragment = [".is_text ", ".is_photo:not(.is_animated) ", ".is_quote ", ".is_link ", ".is_chat ", ".is_audio ", ".is_video ", ".is_animated ", ".is_photoset "];
	var newRule = "";
	
	var isFirst = true;
	//compose new rule part 1
	for(var i = 0; i < buttons.length; i++){
	
		if(!buttons[i].classList.contains("f_active")){
			if(!isFirst)
				newRule += ", "; //separator
			
			newRule += ruleFragment[i];
			
			isFirst = false;
		}
	}
	
	//compose new rule part 2
	var newRule2 = "";
	if(filterType)
		newRule2 += "{display:none !important}";
	else
		newRule2 += "{opacity:0.25 !important; pointer-events:none !important; max-height: 75px !important; overflow:hidden !important}";
	
	newRule += newRule2;
	
	//insert rule
	console.log(newRule);
	if(!isFirst)
		filterSheet.insertRule(newRule, 0);
	} catch(e){console.log(e);}
}

function toggleFilterType(ev){
	filterType = !filterType; //
	
	if(ev.target.className.contains("f_active"))
		ev.target.classList.remove("f_active");
	else
		ev.target.classList.add("f_active");
}