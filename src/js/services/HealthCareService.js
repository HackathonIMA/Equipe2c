'use strict';

angular.module('smscApp').factory("HealthCareService", HealthCareService);

HealthCareService.$inject = ['$http'];

function HealthCareService($http) {
    var urlBase = '/api/v1/health_cares/history';

    var service = {
        findAll: findAll(),
        urlBase: urlBase
    };

    function findAll() {
        return $http.get(urlBase);
    }

    return service;
}