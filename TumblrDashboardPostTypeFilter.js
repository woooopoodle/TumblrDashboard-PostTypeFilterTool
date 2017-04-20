// ==UserScript==
// @name        Tumblr Dashboard Post Type Filter
// @namespace   https://github.com/woooopoodle
// @include     https://www.tumblr.com/dashboard*
// @include     https://www.tumblr.com/likes*
// @include     https://www.tumblr.com/liked/by/*
// @include     https://www.tumblr.com/posts*
// @include     https://www.tumblr.com/tagged*
// @include     https://www.tumblr.com/blog*
// @version     0.5
// ==/UserScript==

var postTypes = ["text", "photo", "quote", "link", "chat", "audio", "video", "animated", "photoset", "reblog", "recommended"];

var f_Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAhCAYAAAA74pBqAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMzQDW3oAAAFCSURBVEhL7ZSxSgNBFEVXRCxs7CKksQlYWCikE9L5A6KpJaWtrT9gIcQvsNDKwoT8gI2VqK1gZSGCjY2ooOJ63sxbRt3szM4abPTAKfLefRcCySQh0jRt4g6e4g2+4gNe4h6u4YTGh0OghkdYhlts6+lXWNTxWlIR3Om5g+E4Xph1HAda4WC4YXfRrGiFg+GV3UXxhFNaYWGwYFbx9LXCwXDd7ryc4yI2cBW35bNWOBjK78nHC85q3A/Bnjkp5lijYQgP7E0huxoNQzhU1tVoGML/ZYZfLCMgz82SeoI+DjHLfraRld3jT3nHupSNivk/VCav5CiYk7JlLPtUn6E8ht/dxLHs5zGJW/iMPqL+AW17U0j5MoED39MdXTaNRV83rkzgaN/e5qhU1rG3OSqVtextjkplM/hozh1v2NHIEJLkA/qbKwCo1MpJAAAAAElFTkSuQmCC";

//new stylesheets
var cssMainSheet = createStyleSheet();
var cssMiscRulesSheet = createStyleSheet();

initStyleSheets();

//filter element
var filterWrapperEm = document.createElement('div');
filterWrapperEm.setAttribute("class", "filterwrapper hidden");

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
	"<div class=\"filterbutton f_setbutton f_active\" title=\"Photoset\" >Photoset</div>" +
	"<div class=\"filterbutton f_reblogbutton f_active\" title=\"Reblogs\" >Reblogs</div>" +
	"<div class=\"filterbutton f_recombutton f_active\" title=\"Tracked Tag Posts\" >Tracked</div></div>" +
	"<div class=\"filterbutton f_refreshbutton\"></div>";

filterWrapperEm.innerHTML += filterButtonElementsHTML;

buttonsEm = filterWrapperEm.childNodes[1];

for(var i = 0; i < buttonsEm.childNodes.length; i++)
	buttonsEm.childNodes[i].addEventListener('click', toggleFilter);

document.body.insertBefore(filterWrapperEm, document.body.childNodes[document.body.childNodes.length]);

filterWrapperEm.childNodes[0].addEventListener('click', toggleFilterType);

//button element for top bar
var fbuttEm = document.createElement('div');
fbuttEm.innerHTML += "<div title=\"Post Type Filter\" class=\"tab iconic f_tab_filter\" >";

fbuttEm = fbuttEm.childNodes[0];

fbuttEm.addEventListener('click', toggleFilterBox);

var tabBar = document.getElementById("user_tools");
tabBar.insertBefore(fbuttEm, tabBar.childNodes[tabBar.childNodes.length - 2]);

cssMiscRulesSheet.insertRule(
	".f_tab_filter{background: url('" + f_Image + "') no-repeat 50% 4px / 13px transparent;width: 37px;opacity: 0.5;cursor:pointer}",
	1);
cssMiscRulesSheet.insertRule(
	".f_tab_filter:hover{opacity:0.5}",
	1);

//update button shenanigans
fUpdateEm = filterWrapperEm.childNodes[filterWrapperEm.childNodes.length - 1];

fUpdateEm.addEventListener("click", refresh);

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
	while(cssMainSheet.cssRules.length != 0)
		cssMainSheet.deleteRule(0);
	
	//make stuff
	var buttons = buttonsEm.childNodes;
	//console.log(buttonsEm);
	var ruleFragment = [".is_text ", ".is_photo:not(.is_animated) ", ".is_quote ", ".is_link ", ".is_chat ", ".is_audio ", ".is_video ", ".is_animated ", ".is_photoset ", ".is_reblog", ".is_recommended"];
	var newRule = "";
	
	var isPeepr = document.body.className.contains("peepr");
	var isFirst = true;
	//compose new rule part 1
	for(var i = 0; i < buttons.length; i++){
	
		if(!buttons[i].classList.contains("f_active")){
			if(!isFirst)
				newRule += ", "; //separator
			
			newRule += isPeepr ? ".peepr-drawer-container " : ".left_column "; //apply css rule to peepr posts if active, else apply to regular dash posts
			
			newRule += ruleFragment[i];
			
			isFirst = false;
		}
	}
	
	//compose new rule part 2
	var newRule2 = "";
	if(filterType)
		newRule2 += "{display:none !important}";
	else
		newRule2 += "{opacity:0.15 !important; pointer-events:none !important; max-height: 45px !important; overflow:hidden !important}";
	
	newRule += newRule2;
	
	//insert rule
	console.log(newRule);
	if(!isFirst)
		cssMainSheet.insertRule(newRule, 0);
	} catch(e){console.log(e);}
}

function toggleFilterType(ev){
	filterType = !filterType; //
	
	if(ev.target.className.contains("f_active"))
		ev.target.classList.remove("f_active");
	else
		ev.target.classList.add("f_active");
}

function createStyleSheet() {
	var style = document.createElement("style");
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);

	return style.sheet;
}

function initStyleSheets(){
	var filterBoxWidthRule = "174px";
		
	var cssMiscRules = [".f_audiobutton:before{content:\"\\EA6A\"}",
		".f_chatbutton:before{content:\"\\EA6C\"}",
		".f_linkbutton:before{content:\"\\EA70\"}",
		".f_photobutton:before{content:\"\\EA73\"}",
		".f_quotebutton:before{content:\"\\EA75\"}",
		".f_textbutton:before{content:\"\\EA77\"}",
		".f_videobutton:before{content:\"\\EA79\"}",
		".f_gifbutton:before{content:\"\\EA82\"}",
		".f_setbutton:before{content:\"\\EAAA\"}",
		".f_reblogbutton:before{content:\"\\EA8F\"}",
		".f_recombutton:before{content:\"\\EA99\"}",
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
		".f_reblogbutton.f_active { color: #529ecc }",
		".f_recombutton.f_active { color: #56bc8a/*yellow*/ }",
		".f_active {background:rgba(255,255,255,0.05)}"];

	var cssMiscRules2 = [".filterwrapper{position: fixed;top:60px;right:50px;width: " + filterBoxWidthRule + "; background: black;border-radius:6px;padding:5px;color: rgba(255,255,255,0.1);opacity:1;transition:opacity 0.3s}",
		".filterbutton{width: 40px;height: 40px;background: transparent;display: inline-block;margin: 3px 0px 0px 3px;padding:5px;font-size:10px;cursor:pointer;text-align:center;}",
		".peepr .filterwrapper{right: 650px; z-index:999}",
		".f_refreshbutton{width: calc(" + filterBoxWidthRule + " - 10px - 6px) !important;height: 20px !important;margin: 3px !important;}",
		".filterbutton:hover{background:rgba(255,255,255,0.05); }",
		".f_refreshbutton {width: calc(" + filterBoxWidthRule + " - 10px - 6px);height: 20px;margin: 3px;color: #444;background: rgb(20,20,20);}",
		".f_togglebutton {width:40px!important; height:20px !important;margin: 3px;color: #444;background: rgb(20,20,20);}",
		".is_text, .is_photo, .is_quote ,.is_link, .is_chat, .is_audio, .is_video, .is_animated, .is_photoset{transition: opacity 0.25s}",
		".post_permalink{pointer-events:all !important}",
		".hidden.filterwrapper{opacity:0}"]

	cssMiscRulesSheet.insertRule(
		"[class*=\" f_\"]:not(.f_tab_filter):before, [class^=\"f_\"]:not(.f_tab_filter):before {display: inline-block;line-height: 1;font-size: 36px;line-height: .75;font-family: tumblr-icons,Blank;}",
		0);

	for(var i = 0; i < cssMiscRules.length; i++)
		cssMiscRulesSheet.insertRule(cssMiscRules[i], 1);
		
	for(var i = 0; i < cssMiscRules2.length; i++)
		cssMiscRulesSheet.insertRule(cssMiscRules2[i], 1);

}