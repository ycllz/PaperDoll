//Use for all code that sorts, analyzes, and parses layer names

function loadLayerGroup(pathArray) {
    //call getLayers function from hostscript.jsx
    csInterface.evalScript('getLayers('+JSON.stringify(pathArray)+')', function(result) {
        //split result into array
        var layers = result.split(',');
        if (pathArray.length == 0) {
            //if pathArray is empty, set path to empty array
            var path = [];
        } else {
            //otherwise, set path = pathArray
            var path = pathArray;
        }
        //iterate each layer from result
        for (var i = 0, len = layers.length; i < len; i++) {
            //append current layer to path
            path.push(layers[i]);
            //call parseLayer on current path
            loadLayer(path.slice());
            //remove last element of path, returning it to previous value
            path.pop();
        }
    });
}

function loadLayer(pathArray) {
    //set layer to last element in path array
    var layer = pathArray[pathArray.length - 1];
    //take action depending on first character of layer
    switch (true) {
        case layer.startsWith("$"):
            //Static - only make visible, don't add to format
            makeVisible(pathArray);
            loadLayerGroup(pathArray.slice());
            break;
        case layer.startsWith("%"):
            //Toggle
            loadToggle(pathArray);
            //test("Toggle: " + layer,"controls");
            break;
        case layer.startsWith("@"):
            //Linked
            makeVisible(pathArray);
            test("Linked: " + layer,"controls");
            break;
        case layer.startsWith("#"):
            //Choice
            makeVisible(pathArray);
            test("Choice: " + layer,"controls");
            loadLayerGroup(pathArray.slice());
            break;
        case layer.startsWith("*"):
            //Option - shouldn't be called
            test("Option: " + layer,"controls");
            break;
    }
}

function isVisible(pathArray) {
    csInterface.evalScript('isVisible(' + JSON.stringify(pathArray) + ')', function(result) {
        alert("visibility = " + result);
        return result;
    });
}

function makeVisible(pathArray) {
    csInterface.evalScript('makeVisible(' + JSON.stringify(pathArray) + ')');
}

function makeInvisible(pathArray) {
    csInterface.evalScript('makeInvisible(' + JSON.stringify(pathArray) + ')');
}

function test(str, tag) {
    var node = document.createElement("LI");
    node.innerHTML = str;
    document.getElementById(tag).appendChild(node);
}
