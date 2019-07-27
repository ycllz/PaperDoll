 function renameLayer(layer, prefix, split, index) {
    var curr = layer.name;
    if (split!=null) {
        curr = curr.split(split)[index];
    }
    curr = prefix + curr;
    layer.name = curr;
    layer.visible = false;
}

function prefixOptions() {

    var selected = app.activeDocument.activeLayer;
    //if (selected.name.startsWith("#")==false) selected.name = "#" + selected.name
    
    var options = selected.layers;

    for (i = 0, len = options.length; i<len; i++) {
        renameLayer(options[i],"*","_",0);
    }
}

prefixOptions(); 