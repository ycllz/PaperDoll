/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//Use for all code that deals with Photoshop elements

function analyzeLayers(parent){
    if (parent == undefined) {
        return app.activeDocument.Layers.sort;
    } else {
        return app.activeDocument.Layers.sort;
    }
}

function test() {
    alert("Test is working");
}