'use strict';

angular.module('smscApp').factory("HealthCareService", HealthCareService);

HealthCareService.$inject = ['$http', '$rootScope'];

function HealthCareService($http, $rootScope) {
    var urlBase = '/api/v1/health_cares/history';
    var service = {
        findAll: findAll,
        findAllTest: findAllTest,
        urlBase: urlBase
    };

    function findAllTest() {
        return $http.get(urlBase);
    }

    function findAll() {
        var promise = $http.get(urlBase);

        promise.then(function (payload, errorPayload) {
                var data = payload.data.health_cares;
                var newData = {};

                data.forEach(function (element, index) {
                    var key = element.year + '-' + element.month;
                    newData[key] = newData[key] || {};
                    newData[key].label = ('0' + element.month).slice(-2) + '/' + element.year.toString();
                    newData[key].month = element.month;
                    newData[key].year = element.year;

                    newData[key].hospitals = newData[key].hospitals || {};

                    var keyHospital = element.local_atendimento;
                    newData[key].hospitals[keyHospital] = newData[key].hospitals[keyHospital] || {};

                    newData[key].hospitals[keyHospital].name = element.local_atendimento;
                    newData[key].hospitals[keyHospital].lat = element.locale_lat;
                    newData[key].hospitals[keyHospital].lng = element.locale_lng;

                    // if (!newData[key].hospitals[keyHospital].lat) {

                    // newData[key].hospitals[keyHospital].lat = -22.8114338;
                    // newData[key].hospitals[keyHospital].lng = -47.0481918;
                    // }

                    newData[key].hospitals[keyHospital].maxCapacityLevel = element.nivel_lotacao;
                });

                $rootScope.$broadcast('foundHealthCares', newData);
            },
            function (errorPayload) {
                console.log("Error ->" + errorPayload);
            });
    }

    return service;
}