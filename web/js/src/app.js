(function(window, angular){
"use strict";

var app = angular.module('signal', ['ngMaterial'])
    .config(['$interpolateProvider', '$mdThemingProvider',function($interpolateProvider,$mdThemingProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

        $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple');

    }])
;

app.controller('AppController', function($mdSidenav) {
  var vm = this;

  vm.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

});


})(window, window.angular);
