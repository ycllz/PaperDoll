/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//Use for all code that deals with Photoshop elements

function getLayers(pathArray) {
    //setup source
    if (pathArray.length == 0) {
        //if empty array, source is main document
        source = app.activeDocument;
    } else {
        //if pathArray exists, source is layer it points to
        source = findLayer(pathArray);
        //return undefined if source layer is not visible
        if (source.visible == false) {
            return;
        }
    }
    if (source.layers == undefined) {
        //return undefined if there are no sub-layers
        return;
    } else {
        //create Result set
        var Result = new Array;
        //for each layer in source.layers
        for (var i = 0, len = source.layers.length; i < len; i++) {
            //add layers[i].name to end of pathArray
            pathArray.push(source.layers[i].name);
            //add current value of pathArray to Result set
            Result.push(pathArray.slice());
            //removes last element of new pathArray, resetting it to old value for next iteration
            pathArray.pop();
        }
        //return Result set
        return Result;
    }  
}

function findLayer(pathArray, layerArray) {
    //if called without layerArray parameter, default to main document layers
    if (layerArray == undefined) layerArray = app.activeDocument.layers;
    //set layer to first item in pathArray, pathArray loses first element and becomes 1 shorter
    var layer = pathArray.shift();

    if (pathArray.length == 0) {
        //if this was the only item in pathArray, then return the matching layer from layerArray
        return layerArray.getByName(layer);
    } else {
        //call function again, looking for next element in pathArray in sublayers of current layer
        return findLayer(pathArray, layerArray.getByName(layer).layers);
    }
}

function makeVisible(pathArray) {
    findLayer(pathArray).visible = true;
}

function makeInvisible(pathArray) {
    findLayer(pathArray).visible = false;
}

function isVisible(pathArray) {
    return findLayer(pathArray).visible;
}

function editLayerContents(pathArray) {
    app.activeDocument.activeLayer = findLayer(pathArray);
    var idplacedLayerEditContents = stringIDToTypeID( "placedLayerEditContents" );
    var desc73 = new ActionDescriptor();
    executeAction( idplacedLayerEditContents, desc73, DialogModes.NO );
}

function renameLayer(layer, prefix, split, index) {
    var curr = layer.name;
    if (split!=null) {
        curr = curr.split(split)[index];
    }
    if(curr.substring(0,1)!=prefix) curr = prefix + curr;
    layer.name = curr;
    layer.visible = false;
}

function prefixOptions() {
    var selected = app.activeDocument.activeLayer;
    if(selected.name.substring(0,1)!="#") selected.name = "#" + selected.name;

    var options = selected.layers;

    for (i = 0, len = options.length; i<len; i++) {
        renameLayer(options[i],"*","_",0);
    }
}