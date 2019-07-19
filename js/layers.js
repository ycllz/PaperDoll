//Use for all code that sorts, analyzes, and parses layer names

function analyzeLayer(pathArray) {
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
            parseLayer(path.slice());
            //remove last element of path, returning it to previous value
            path.pop();
        }
    });
}

function parseLayer(pathArray) {
    //set layer to last element in path array
    var layer = pathArray[pathArray.length - 1];
    //take action depending on first character of layer
    switch (true) {
        case layer.startsWith("$"):
            csInterface.evalScript('makeVisible('+JSON.stringify(pathArray)+')');
            analyzeLayer(pathArray.slice());
            break;
        case layer.startsWith("%"):
            test("Toggle: " + layer,"div_doc");
            break;
        case layer.startsWith("@"):
            test("Linked: " + layer,"div_doc");
            break;
        case layer.startsWith("#"):
            test("Choice: " + layer,"div_doc");
            analyzeLayer(pathArray.slice());
            break;
        case layer.startsWith("*"):
            test("Option: " + layer,"div_doc");
            break;
    }
}

function test(str, tag) {
    var node = document.createElement("LI");
    node.innerHTML = str;
    document.getElementById(tag).appendChild(node);
}
