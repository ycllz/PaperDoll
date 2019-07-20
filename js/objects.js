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
    //create unordered list container for any sub-layers
    var obj = document.createElement("UL");
    obj.setAttribute("id",pathArray);
    obj.setAttribute("style","list-style: none");
    //create checkbox element
    var node = document.createElement("INPUT");
    node.setAttribute("id",pathArray+"-ctl");
    node.setAttribute("type", "checkbox");
    node.innerHTML = "";
    //create label element
    var label = document.createElement("LABEL");
    label.setAttribute("for",pathArray+"-ctl");
    label.innerHTML = pathArray[pathArray.length - 1].substr(1);
    //determine if reference layer is visible
    csInterface.evalScript('isVisible(' + JSON.stringify(pathArray) + ')', function(result) {
        //call function to set checked property = layer visibility
        setToggle(result);
    });
    node.addEventListener("change",function() {
        var path = JSON.parse(JSON.stringify(pathArray.slice()));
        if(this.checked == true) {
            makeVisible(path);
        } else {
            makeInvisible(path);
        }
    });

    //create list item to hold checkbox
    var sub = document.createElement("LI");
    //sub: <input/><label/><ul/>
    sub.appendChild(node);
    sub.appendChild(label);
    sub.appendChild(obj);
    //add finished control to panel
    addControl(sub, pathArray.slice());

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

function loadLinked(pathArray) {
    //create path array variable to hold current value of pathArray
    var path = JSON.parse(JSON.stringify(pathArray.slice()));

    var node = document.createElement("BUTTON");
    node.innerHTML = pathArray[pathArray.length - 1].substr(1);
    node.addEventListener("click",function() {
        var path = JSON.parse(JSON.stringify(pathArray.slice()));
        editLayerContents(path);
    })
    addControl(node, path);
}

function loadChoice(pathArray) {
    //create unordered list container for any sub-layers
    var obj = document.createElement("UL");
    obj.setAttribute("id",pathArray);
    obj.setAttribute("style","list-style: none");
    //create list item to hold checkbox
    var sub = document.createElement("LI");
    sub.innerHTML = pathArray[pathArray.length-1].substr(1);
    //sub: <ul/>
    sub.appendChild(obj);
    //add finished control to panel
    addControl(sub, pathArray.slice());
}

function loadOption(pathArray) {
    var group = JSON.parse(JSON.stringify(pathArray));
    group.pop();
    //create checkbox element
    var node = document.createElement("INPUT");
    node.setAttribute("id",pathArray+"-ctl");
    node.setAttribute("type", "radio");
    node.setAttribute("name",group);
    node.setAttribute("value",pathArray);
    node.innerHTML = "";
    //create label element
    var label = document.createElement("LABEL");
    label.setAttribute("for",pathArray+"-ctl");
    label.innerHTML = pathArray[pathArray.length - 1].substr(1);
    //create unordered list container for any sub-layers
    var obj = document.createElement("UL");
    obj.setAttribute("id",pathArray);
    obj.setAttribute("style","list-style: none");
    //determine if reference layer is visible
    csInterface.evalScript('isVisible(' + JSON.stringify(pathArray) + ')', function(result) {
        //call function to set checked property = layer visibility
        setToggle(result);
    });
    node.addEventListener("change",function() {
        var grp = JSON.parse(JSON.stringify(group.slice()));
        $("input[name='"+grp+"']").each(function () {
            if (this.checked == true) {
                makeVisible(this.getAttribute("value").split(","));
            } else {
                makeInvisible(this.getAttribute("value").split(","));
            }
        });
    });

    //create list item to hold checkbox
    var sub = document.createElement("LI");
    //sub: <input/><label/><ul/>
    sub.appendChild(node);
    sub.appendChild(label);
    sub.appendChild(obj);
    //add finished control to panel
    addControl(sub, pathArray.slice());

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