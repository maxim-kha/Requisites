/**
 * Created by Khachenko on 30.07.2015.
 */
angular.module('myApp', ['ngMaterial','ui.router', 'home'])
    .config(function($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        $mdThemingProvider.theme('default');

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);

        $stateProvider.state('myApp',
            {
                abstract: true,
                controller: 'AppController',
                templateUrl: 'layout/main.tpl.html'
            }
        );

    }).controller('AppController', function AppController($scope, $location, $state) {


    });
