//Use for all code that sorts, analyzes, and parses layer names

function isVisible(pathArray) {
    //call jsx function to determine if layer is visible
    csInterface.evalScript('isVisible(' + JSON.stringify(pathArray) + ')', function(result) {
        return result;
    });
}

function makeVisible(pathArray) {
    //call jsx function to make referenced layer visible
    csInterface.evalScript('makeVisible(' + JSON.stringify(pathArray) + ')');
    //load any sub-layers, if present
    loadLayerGroup(pathArray.slice());
}

function makeInvisible(pathArray) {
    //unload any sub-layers, if present
    // must be called first, as "getLayers" ignores invisible layers
    unloadLayerGroup(pathArray.slice());
    //call jsx function to make referenced layer invisible
    csInterface.evalScript('makeInvisible(' + JSON.stringify(pathArray) + ')');
}

function editLayerContents(pathArray) {
    //call jsx function to select referenced layer and edit its contents
    csInterface.evalScript('editLayerContents(' + JSON.stringify(pathArray) + ')');
}

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
            //if last element of pathArray is a Choice, sort layers array
            if (pathArray[pathArray.length-1].startsWith("#")) layers.sort();
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
            //Toggle - create nested checkboxes to control layer visibility
            loadToggle(pathArray);
            break;
        case layer.startsWith("@"):
            //Linked - create button to open linked layer to edit contents
            makeVisible(pathArray);
            loadLinked(pathArray.slice());
            break;
        case layer.startsWith("#"):
            //Choice - create group heading for radio buttons
            makeVisible(pathArray);
            loadChoice(pathArray.slice());
            break;
        case layer.startsWith("*"):
            //Option - create radio buttons to control layer visibility
            loadOption(pathArray.slice());
            break;
    }
}

function unloadLayerGroup(pathArray) {
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
            unloadLayer(path.slice());
            //remove last element of path, returning it to previous value
            path.pop();
        }
    });
}

function unloadLayer(pathArray) {
    //remove last element to reference parent
    pathArray.pop();
    //call unload function in objects.js
    unloadObject(pathArray.slice());
}
