/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

//Use for all code that updates HTML frame

(function () {
    //To Call Photoshop Function - csInterface.evalScript('function + parameters')
    'use strict';
    var csInterface = new CSInterface();
    
    function init() {
                
        initColors();
        
        document.getElementById('btn_analyze').addEventListener('click', analyze);
    }

    function analyze() {
        csInterface.evalScript('getLayers()', function(result) {
            var layers = result.split(",");
            let pathArray = [];
            for (var i = 0, len = layers.length; i < len; i++) {
                pathArray[0] = layers[i];
                parseLayer(pathArray);
            }
        });
    }

    function parseLayer(pathArray) {
        var layer = pathArray[pathArray.length - 1];
        switch (true) {
            case layer.startsWith("$"):
                test("Static","div_doc");
                break;
            case layer.startsWith("%"):
                test("Toggle","div_doc");
                break;
            case layer.startsWith("@"):
                test("Linked","div_doc");
                break;
            case layer.startsWith("#"):
                test("Choice","div_doc");
                break;
        }
    }

    function test(str, tag) {
        var node = document.createElement("DIV");
        node.innerHTML = str;
        document.getElementById(tag).appendChild(node);
    }

    init();
}());
    
