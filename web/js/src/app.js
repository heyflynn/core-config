(function(window, angular){
"use strict";

var app = angular.module('signal', ['ngMaterial'])
    .config(['$interpolateProvider', '$mdThemingProvider', '$mdIconProvider',function($interpolateProvider,$mdThemingProvider,$mdIconProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

        // Configure URLs for icons specified by [set:]id.
        $mdIconProvider
             .defaultFontSet( 'fontawesome' )
//             .defaultIconSet('my/app/icons.svg')       // Register a default set of SVG icons
//             .iconSet('social', 'my/app/social.svg')   // Register a named icon set of SVGs
//             .icon('android', 'my/app/android.svg')    // Register a specific icon (by name)
//             .icon('work:chair', 'my/app/chair.svg')  // Register icon in a specific set
        ;

/*
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('purple')
            .dark();
            ;
*/
    }])
;

app.controller('AppController', function($scope, $mdSidenav) {

    $scope.clients = [
          { id: 1, name: 'Master Account', img: 'http://placehold.it/50x50' },
          { id: 2, name: 'Test Account 2', img: 'http://placehold.it/50x50' },
          { id: 3, name: 'Test Account 3', img: 'http://placehold.it/50x50' }
    ];

    $scope.client = $scope.clients[0];
});


})(window, window.angular);
