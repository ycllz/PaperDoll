/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

//Use for all code that updates HTML frame

(function () {
    'use strict';

    var csInterface = new CSInterface();
    //To Call Photoshop Function - csInterface.evalScript('function + parameters')
    function init() {
                
        initColors();
        
        document.getElementById('btn_analyze').addEventListener('click', function(){
            //csInterface.evalScript('analyzeLayers()');
            var val = csInterface.evalScript('analyzeLayers()', function(result) {
                test(result,"div_doc");
            })
        });
    }
    
    function test(str, tag) {
        document.getElementById(tag).append(str)
    }

    init();

}());
    
