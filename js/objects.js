//use for all code to load, unload, and listen to control objects
function unloadObject(pathArray) {
    var obj = document.getElementById(pathArray);
    //clear reference node of all interior controls
    obj.innerHTML = "";
}

function addControl(node, pathArray) {
    //remove last element to reference parent
    pathArray.pop();
    if (pathArray.length == 0) {
        //if remaining array is empty, set parent to "controls" element
        var parent = document.getElementById("controls");
    } else {
        //set parent to element remaining array points to
        var parent = document.getElementById(pathArray);
    }
    //add node control to parent
    parent.appendChild(node);
}

function loadToggle(pathArray) {
    //create div for object
    var obj = document.createElement("DIV");
    //create checkbox control
    var button = document.createElement("BUTTON");
    button.setAttribute("id", pathArray + "-ctl");
    button.setAttribute("class", "toggle");
    button.innerHTML = pathArray[pathArray.length - 1].substr(1);
    //add toggle event listener
    button.addEventListener("click", function() {
        var path = JSON.parse(JSON.stringify(pathArray.slice()));
        this.classList.toggle("active");
        if (this.classList.contains("active")) {
            this.attr
            makeVisible(path);
        } else {
            makeInvisible(path);
        }
    });
    //determine if reference layer is visible
    csInterface.evalScript('isVisible(' + JSON.stringify(pathArray) + ')', function(result) {
        //call function to set checked property = layer visibility
        setToggle(result);
    });
    var sub = document.createElement("DIV");
    sub.setAttribute("id", pathArray);
    sub.setAttribute("class", "controlbox");
    obj.appendChild(button);
    obj.appendChild(sub);
    //add finished control to panel
    addControl(obj, pathArray.slice());

    function setToggle(result) {
        //result returns as string instead of boolean for some reason
        if (result == "true") {
            obj.classList.add("active");
            //load sub-layers to panel, if any exist
            loadLayerGroup(pathArray.slice());
        } else {
            obj.classList.remove("active");
        }
    }
}

function loadLinked(pathArray) {
    //create path array variable to hold current value of pathArray
    var path = JSON.parse(JSON.stringify(pathArray.slice()));
    //create div
    var obj = document.createElement("DIV");
    //create button
    var node = document.createElement("BUTTON");
    node.setAttribute("class", "linked")
    node.innerHTML = pathArray[pathArray.length - 1].substr(1);
    node.addEventListener("click", function() {
        var path = JSON.parse(JSON.stringify(pathArray.slice()));
        //call function to edit layer contents
        editLayerContents(path);
    })
    obj.appendChild(node);
    addControl(obj, path);
}

function loadChoice(pathArray) {
    //create unordered list container for any sub-layers
    var obj = document.createElement("DIV");
    obj.setAttribute("class", "active");
    var button = document.createElement("BUTTON");
    button.setAttribute("class", "accordion");
    button.innerHTML = pathArray[pathArray.length - 1].substr(1);
    var panel = document.createElement("DIV");
    panel.setAttribute("id", pathArray);
    panel.setAttribute("class", "panel");
    //sub: <ul/>
    obj.append(button);
    obj.append(panel);
    //add finished control to panel
    button.addEventListener("click", function() {
        this.parentNode.classList.toggle("active");
    })
    path = JSON.parse(JSON.stringify(pathArray.slice()));
    addControl(obj, path);
    /*
    var sub = document.createElement("DIV");
    sub.setAttribute("id", pathArray + "-sub");
    sub.setAttribute("class", "controlbox");
    path.pop();
    addControl(sub, path);*/
}

function loadOption(pathArray) {
    //create separate variable so changes don't apply to pathArray
    var group = JSON.parse(JSON.stringify(pathArray));
    //remove last element, remaining array points to parent
    group.pop();
    //create checkbox element
    var node = document.createElement("INPUT");
    node.setAttribute("id", pathArray + "-ctl");
    node.setAttribute("type", "radio");
    node.setAttribute("style", "visibility: hidden;");
    //set name to group so all radiobuttons are linked
    node.setAttribute("name", group);
    node.setAttribute("value", pathArray);
    //create label element
    var label = document.createElement("LABEL");
    label.setAttribute("for", pathArray + "-ctl");
    label.innerHTML = pathArray[pathArray.length - 1].substr(1);
    //create unordered list container for any sub-layers
    var obj = document.createElement("DIV");
    obj.setAttribute("id", pathArray);
    obj.setAttribute("class", "controlbox");
    //determine if reference layer is visible
    csInterface.evalScript('isVisible(' + JSON.stringify(pathArray) + ')', function(result) {
        //call function to set checked property = layer visibility
        setToggle(result);
    });
    //create event listener for value change
    node.addEventListener("change", function() {
        //create static variable for group
        var grp = JSON.parse(JSON.stringify(group.slice()));
        //check each connected radio button
        $("input[name='" + grp + "']").each(function() {
            if (this.checked == true) {
                //if button is checked, make layer visible
                makeVisible(this.getAttribute("value").split(","));
            } else {
                //if button is not checked, make layer invisible
                makeInvisible(this.getAttribute("value").split(","));
            }
        });
    });

    //create list item to hold checkbox
    var sub = document.createElement("DIV");
    //sub: <input/><label/><ul/>
    sub.appendChild(node);
    sub.appendChild(label);
    //add finished control to panel
    path = JSON.parse(JSON.stringify(pathArray.slice()));
    addControl(sub, path);
    path.pop()
    addControl(obj, path);


    function setToggle(result) {
        //result returns as string instead of boolean for some reason
        if (result == "true") {
            node.checked = true;
            //load sub-layers to panel, if any exist
            loadLayerGroup(pathArray.slice());
        } else {
            node.checked = false;
        }
    }

}