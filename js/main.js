/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    function init() {
                
        initColors();
                
        $("#btn_analyze").click(function () {
            csInterface.evalScript('sayHello()');
        });
    }
        
    init();

}());
    
