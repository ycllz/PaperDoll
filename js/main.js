/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

//Use for all code that updates HTML frame

(function () {
    'use strict';
    // create interface variable
    var csInterface = new CSInterface();
    
    //initialization function
    function init() {
        //calls color initialization from themecolor.js
        initColors();

        //add listener to "Refresh" button
        document.getElementById("btn_refresh").addEventListener("click", function() { 
            //clear "div_doc" contents
            document.getElementById("controls").innerHTML = "";
            //analyze main document layers
            loadLayerGroup([]); 
        });
    }
    
    //call initialization function
    init();
}());
    
