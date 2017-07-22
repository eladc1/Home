homeApp = angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies']).config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain. **.
        'http://localhost:3000/templates/**'
    ])
});