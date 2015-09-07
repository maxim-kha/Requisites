/**
 * Created by Khachenko on 30.07.2015.
 */
"use strict";
angular.module('home', ['ui.router', "DAL"])
    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('myApp.home', {
            url: '/',
            controller: 'HomeCtrl',
            templateUrl: 'pages/home/home.tpl.html',
            data: {pageTitle: 'Home'}
        });
    }])
    .controller('HomeCtrl', ["$scope", "repository", function ($scope, repository) {
        var that = this;

        that.selectedItem = null;
        that.searchText = null;
        that.querySearch = querySearch;
        that.searchTextChange = function() {};;
        that.selectedItemChange = function() {};
        that.regions = [];

        function querySearch (searchText) {
            var districts = that.regions[$scope.selectedRegionIndex].districts;
            var result =  districts.filter(function(item){
                return item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            });
            if (result.length == 0) {
                result = districts;
            }
            return result;
        };

        repository.$getRegions().success(function (data) {
            $scope.regions = that.regions = data;
        });

    }]).directive("imns", function () {
        return {
            restrict: 'E',
            templateUrl: "pages/home/imns_info.html",
            scope: {
                info: "=info"
            }
        }
    });
