/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

//Use for all code that updates HTML frame

(function () {
    //To Call Photoshop Function - csInterface.evalScript('function + parameters')
    'use strict';
    var csInterface = new CSInterface();
    
    function init() {
                
        initColors();
        
        document.getElementById('btn_analyze').addEventListener('click', function(){
            var val = csInterface.evalScript('getLayers()', function(result) {
                var layers = result.split(",");
                for (var i = 0, len = layers.length; i < len; i++) {
                    analyze(layers[i]);
                }
            })
        });
    }

    function analyze(layer) {
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
    
