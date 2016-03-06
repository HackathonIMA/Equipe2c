'use strict';

angular.module('smscApp', [
    'ngRoute'
])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/circle.html',
                controller: 'CircleCtrl',
                controllerAs: 'circleCtrl'
            })
            .when('/circle', {
                templateUrl: 'templates/circle.html',
                controller: 'CircleCtrl',
                controllerAs: 'circleCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });