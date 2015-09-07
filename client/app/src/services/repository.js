/**
 * Created by Khachenko on 03.08.2015.
 */
'use strict';
angular.module('DAL', [])
    .factory('repository',
    ['$http', '$q', '$injector',
        function ($http, $q, $injector) {

            function repository() {
                this.settings = {
                };
            }

            repository.prototype = {
                $getRegions: function () {
                    return  $http.get('Data/departments.json');
                }
            };
            return new repository();
        }

    ]);