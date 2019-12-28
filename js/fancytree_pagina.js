$(function(){

	var AJAX_RESPONSE = [
		{title: "node 1", key: "id1"},
		{title: "node 2", key: "id2"}
	];
	var FAKE_REQUEST = {
		url: "/echo/json/",
		type: "POST",
		data: {
			json: JSON.stringify(AJAX_RESPONSE),
			delay: 1
		}
	};


	// --- Initialize sample trees
	$("#tree").fancytree({     
		autoActivate: true, // we use scheduleAction()
		//autoCollapse: true,
        autoFocus: true,
		autoScroll: true,
		clickFolderMode: 3, // expand with single click
		//minExpandLevel: 2,
		focusOnSelect: true,
		tabindex: "-1", // we don't want the focus frame
		//toggleEffect: { effect: "blind", options: {direction: "vertical", scale: "box"}, duration: 2000 },
		// scrollParent: null, // use $container
		//source: $.ajax(FAKE_REQUEST),
		tooltip: function(event, data) {
			return data.node.title;
		},
		focus: function(event, data) {
			var node = data.node;
			// Auto-activate focused node after 1 second
			if(node.data.href){
				node.scheduleAction("activate", 1000);
			}
		},
		blur: function(event, data) {
			data.node.scheduleAction("cancel");
		},
		beforeActivate: function(event, data){
			var node = data.node;

			if( node.data.href && node.data.target === "_blank") {
				window.open(node.data.href, "_blank");
				return false; // don't activate
			}
		},
		dragExpand: function(node, data) {
			alert('expandiu');
            return true;
        },
		activate: function(event, data){
			var node = data.node,
				orgEvent = data.originalEvent || {};

			// Open href (force new window if Ctrl is pressed)
			if(node.data.href){
				window.open(node.data.href, (orgEvent.ctrlKey || orgEvent.metaKey) ? "_blank" : node.data.target);
			}
			// When an external link was clicked, we don't want the node to become
			// active. Also the URL fragment should not be changed
			if( node.data.target === "_blank") {
				return false;
			}
			// Append #HREF to URL without actually loading content
			// (We check for this value on page load re-activate the node.)
			if( window.parent &&  parent.history && parent.history.pushState ) {
				parent.history.pushState({title: node.title}, "", "#" + (node.data.href || ""));
			}
		},
		click: function(event, data){
			// We implement this in the `click` event, because `activate` is not
			// triggered if the node already was active.
			// We want to allow re-loads by clicking again.
			var node = data.node,
				orgEvent = data.originalEvent;

				console.log(data.node);

			// Open href (force new window if Ctrl is pressed)
			if(node.isActive() && node.data.href){
				window.open(node.data.href, (orgEvent.ctrlKey || orgEvent.metaKey) ? "_blank" : node.data.target);
			}
		}
	});
	// On page load, activate node if node.data.href matches the url#href
	var tree = $.ui.fancytree.getTree(),
		frameHash = window.parent && window.parent.location.hash;

	if( frameHash ) {
		frameHash = frameHash.replace("#", "");
		tree.visit(function(n) {
			if( n.data.href && n.data.href === frameHash ) {
				n.setActive();
				return false; // done: break traversal
			}
		});
	}

	$(".fancytree-container").addClass("fancytree-connectors");

	$("button#button1").click(function(){
        //var tree = $("#tree").fancytree("getTree"),
            //node2 = tree.getNodeByKey("id3");
		//node2.toggleSelected();
		var tree = $.ui.fancytree.getTree("#tree");
		var node2 = tree.getNodeByKey("id3");
		node2.toggleSelected();
		console.log(node2);
    });

	$("#btnCollapseAll").click(function(){
		$("#tree").dynatree("getRoot").visit(function(node){
		  node.expand(false);
		});
		return false;
	  });
	  
	  $("#btnExpandAll").click(function(){
		$("#tree").dynatree("getRoot").visit(function(node){
		  node.expand(true);
		});
		return false;
	  });
});

/*
$("#selector").fancytree({
    activeVisible: true, // Make sure, active nodes are visible (expanded)
    aria: true, // Enable WAI-ARIA support
    autoActivate: true, // Automatically activate a node when it is focused using keyboard
    autoCollapse: true, // Automatically collapse all siblings, when a node is expanded
    autoScroll: true, // Automatically scroll nodes into visible area
    clickFolderMode: 4, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
    checkbox: true, // Show check boxes
    checkboxAutoHide: true, // Display check boxes on hover only
    debugLevel: 4, // 0:quiet, 1:errors, 2:warnings, 3:infos, 4:debug
    disabled: true, // Disable control
    focusOnSelect: true, // Set focus when node is checked by a mouse click
    escapeTitles: true, // Escape `node.title` content for display
    generateIds: true, // Generate id attributes like <span id='fancytree-id-KEY'>
    idPrefix: "ft_", // Used to generate node idÂ´s like <span id='fancytree-id-<key>'>
    icon: true, // Display node icons
    keyboard: true, // Support keyboard navigation
    keyPathSeparator: "/", // Used by node.getKeyPath() and tree.loadKeyPath()
    minExpandLevel: 1, // 1: root node is not collapsible
    quicksearch: true, // Navigate to next node by typing the first letters
    rtl: true, // Enable RTL (right-to-left) mode
    selectMode: 2, // 1:single, 2:multi, 3:multi-hier
    tabindex: "0", // Whole tree behaves as one single control
    titlesTabbable: true, // Node titles can receive keyboard focus
    tooltip: true // Use title as tooltip (also a callback could be specified)
});*/