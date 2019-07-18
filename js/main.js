/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

//Use for all code that updates HTML frame

(function () {
    //To Call Photoshop Function - csInterface.evalScript('function + parameters')
    'use strict';
    var csInterface = new CSInterface();
    
    function init() {
                
        initColors();
        
        document.getElementById('btn_analyze').addEventListener('click', function() { 
            document.getElementById('div_doc').innerHTML = "";
            analyze(); 
        });
    }

    function analyze(pathArray) {
        //alert("Analyze: " + pathArray);
        csInterface.evalScript('getLayers('+JSON.stringify(pathArray)+')', function(result) {
            var layers = result.split(',');
            alert("Layers from " + pathArray + ": " + layers.length);
            for (var i = 0, len = layers.length; i < len; i++) {
                if (pathArray == undefined) {
                    var path = [];
                    path[0] = layers[i]
                } else {
                    var path = pathArray;
                    path.push(layers[i]);
                }
                parseLayer(path);
            }
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

    init();
}());
    
