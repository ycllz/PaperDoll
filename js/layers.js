//Use for all code that sorts, analyzes, and parses layer names

function analyzeLayer(pathArray) {
    alert("Hello");
    //call getLayers function from hostscript.jsx
    csInterface.evalScript('getLayers('+JSON.stringify(pathArray)+')', function(result) {
        alert("Hello");
        //var layers = result.split(',');
        /*
        alert("Layers from " + pathArray + ": " + layers.length);
        if (pathArray == undefined) {
            var path = [];
        } else {
            var path = pathArray;
        }
        for (var i = 0, len = layers.length; i < len; i++) {
            path.push(layers[i]);
            parseLayer(path);
            path.pop();
        }
        */
    });
}

function parseLayer(pathArray) {
    alert("Parse: " + pathArray);
    var layer = pathArray[pathArray.length - 1];
    switch (true) {
        case layer.startsWith("$"):
            csInterface.evalScript('makeVisible('+JSON.stringify(pathArray)+')');
            //alert("Try: " + pathArray);
            analyze(pathArray);
            break;
        case layer.startsWith("%"):
            test("Toggle","div_doc");
            break;
        case layer.startsWith("@"):
            test("Linked","div_doc");
            break;
        case layer.startsWith("#"):
            test("Choice","div_doc");
            //alert("Choice: " + pathArray);
            analyze(pathArray);
            break;
        case layer.startsWith("*"):
            test("Option: " + layer,"div_doc");
            break;
    }
    //analyze(pathArray);
}

function test(str, tag) {
    var node = document.createElement("LI");
    node.innerHTML = str;
    document.getElementById(tag).appendChild(node);
}
