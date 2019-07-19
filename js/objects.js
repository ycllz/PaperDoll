//use for all code to load, unload, and listen to control objects
function loadToggle(pathArray) {
    var obj = document.createElement("DIV");
    obj.setAttribute("id",JSON.stringify(pathArray));
    
    var node = document.createElement("INPUT");
    node.setAttribute("type", "checkbox");
    node.setAttribute("id",JSON.stringify(pathArray)+"-check");
    csInterface.evalScript('isVisible(' + JSON.stringify(pathArray) + ')', function(result) {
        setToggle(result);
    });

    var path = pathArray.slice();
    node.addEventListener("change",function() {
        if(this.checked == true) {
            makeVisible(path);
        } else {
            makeInvisible(path);
        }
    });

    var label = document.createElement("LABEL");
    label.setAttribute("for",JSON.stringify(pathArray)+"-check");
    label.innerHTML = pathArray[pathArray.length - 1];

    obj.appendChild(node);
    obj.appendChild(label);

    addControl(obj, pathArray);

    function setToggle(result) {
        if (result == "true") {
            node.checked = true;
        } else {
            node.checked = false;
        }
    }
}

function addControl(obj, pathArray) {
    pathArray.pop();
    if (pathArray.length == 0) {
        var parent = document.getElementById("controls");
    } else {
        var parent = document.getElementById(JSON.stringify(pathArray));
    }

    parent.appendChild(obj);
}
