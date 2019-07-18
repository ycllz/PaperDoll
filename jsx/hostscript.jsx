/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//Use for all code that deals with Photoshop elements

function getLayers(pathArray) {
    if (pathArray == undefined) {
        var source = app.activeDocument;
    } else {
        var source = findLayer(pathArray);
    }

    if (source.layers.length == 0) {
        return;
    } else {
        var Result = new Array;
        for (var i = 0, len = source.layers.length; i < len; i++) {
            Result.push(source.layers[i].name);
        }
        return Result;
    }  
}

function findLayer(pathArray, layerArray) {
    if (layerArray == undefined) layerArray = app.activeDocument.layers;
    var layer = pathArray.shift();
    if (pathArray.length == 0) {
        //alert("Found: " + layerArray.getByName(layer).name);
        return layerArray.getByName(layer);
    } else {
        //alert("Searching: "+pathArray);
        return findLayer(pathArray, layerArray.getByName(layer).name);
    }
}

function makeVisible(pathArray) {
    findLayer(pathArray).visible = true;
}

function test() {
    alert("Test is working");
}