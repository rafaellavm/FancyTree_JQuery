$(function () {
    //Fancytree API
    //https://app.swaggerhub.com/apis-docs/mar10/Fancytree/1.0.0#/source/getSource


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
        /*source: [{
                title: "Node 1",
                key: "1"
            },
            {
                title: "Folder 2",
                key: "2",
                folder: true,
                children: [{
                        title: "Node 2.1",
                        key: "3",
                        myOwnAttr: "abc"
                    },
                    {
                        title: "Node 2.2",
                        key: "4"
                    }
                ]
            }
        ],*/
        source: $.ajax({
            url: "http://localhost:3000/retorno",
            dataType: "json"
          }),
        tooltip: function (event, data) {
            return data.node.title;
        },
        focus: function (event, data) {
            var node = data.node;
            // Auto-activate focused node after 1 second
            if (node.data.href) {
                node.scheduleAction("activate", 1000);
            }
        },
        blur: function (event, data) {
            data.node.scheduleAction("cancel");
        },
        beforeActivate: function (event, data) {
            var node = data.node;

            if (node.data.href && node.data.target === "_blank") {
                window.open(node.data.href, "_blank");
                return false; // don't activate
            }
        },
        dragExpand: function (node, data) {
            alert('expandiu');
            return true;
        },
        activate: function (event, data) {
            var node = data.node,
                orgEvent = data.originalEvent || {};

            // Open href (force new window if Ctrl is pressed)
            if (node.data.href) {
                window.open(node.data.href, (orgEvent.ctrlKey || orgEvent.metaKey) ? "_blank" : node.data.target);
            }
            // When an external link was clicked, we don't want the node to become
            // active. Also the URL fragment should not be changed
            if (node.data.target === "_blank") {
                return false;
            }
            // Append #HREF to URL without actually loading content
            // (We check for this value on page load re-activate the node.)
            if (window.parent && parent.history && parent.history.pushState) {
                parent.history.pushState({
                    title: node.title
                }, "", "#" + (node.data.href || ""));
            }
        },
        click: function (event, data) {
            // We implement this in the `click` event, because `activate` is not
            // triggered if the node already was active.
            // We want to allow re-loads by clicking again.
            var node = data.node,
                orgEvent = data.originalEvent;

            console.log(data.node);

            // Open href (force new window if Ctrl is pressed)
            if (node.isActive() && node.data.href) {
                window.open(node.data.href, (orgEvent.ctrlKey || orgEvent.metaKey) ? "_blank" : node.data.target);
            }
        }
    });
    // On page load, activate node if node.data.href matches the url#href
    var tree = $.ui.fancytree.getTree(),
        frameHash = window.parent && window.parent.location.hash;

    if (frameHash) {
        frameHash = frameHash.replace("#", "");
        tree.visit(function (n) {
            if (n.data.href && n.data.href === frameHash) {
                n.setActive();
                return false; // done: break traversal
            }
        });
    }

    $(".fancytree-container").addClass("fancytree-connectors");

});