function onWOWOptionClick(info, tab) {
  //console.log("Info: " + JSON.stringify(info));

  var wowSelectedMenuItemLabel =  wowTitleMenuID["mid-" + info.menuItemId];

  for(var i=0;i<wowMappingsObject.length;i++) {
	var wowMapping = wowMappingsObject[i];

	if (wowMapping["label"] == wowSelectedMenuItemLabel) {
        var finalUrl = wowMapping["wowTemplate"].replace("${SOURCE_TEXT}", escape(info.selectionText == null ? info.linkUrl : info.selectionText));
		window.open(finalUrl, '_blank');
		return;
	}
  }

  console.log("WOW mapping not found for '" + info.title + "'. (ouch!)");
}

var parentMenuId = chrome.contextMenus.create(
	{
		"title": "Web Open With...", 
		"contexts": ["all"]
    });

var wowMappingsSaved = localStorage["wowMappings"];
if (!wowMappingsSaved) {
	return;
}

wowMappingsObject = JSON.parse(wowMappingsSaved);
wowTitleMenuID = [];

for(var i=0;i<wowMappingsObject.length;i++) {
	var wowMapping = wowMappingsObject[i];

	var newMenuItemId = chrome.contextMenus.create(
	{
			"title": wowMapping["label"], 
	 		"parentId": parentMenuId,
			"contexts": wowMapping["contexts"],
			"targetUrlPatterns": wowMapping["targetUrlPatterns"],
			"onclick": onWOWOptionClick
	});

    wowTitleMenuID["mid-" + newMenuItemId] = wowMapping["label"];
}

