(function(window, angular){
"use strict";

angular.module('sifoan', [])
    .config(['$interpolateProvider',function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    }])
;

})(window, window.angular);
