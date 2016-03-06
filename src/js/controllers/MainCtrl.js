'use strict';

angular.module('smscApp').controller('MainCtrl', MainCtrl);


MainCtrl.$inject = ['$routeParams', '$rootScope', 'HealthCareService'];

function MainCtrl($routeParams, $rootScope, HealthCareService) {
    this.heatmap = {};
    this.healthCareService = HealthCareService;
    this.map = {};
    this.init();
    this.rootScope = $rootScope;
}

MainCtrl.prototype.init = function () {

    var promise = this.healthCareService.findAll;
    var that = this;

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
                newData[key].hospitals[keyHospital].lat = element.lat;
                newData[key].hospitals[keyHospital].lng = element.lng;
                newData[key].hospitals[keyHospital].maxCapacityLevel = element.nivel_lotacao;
            });

            that.healthCares = newData;

            that.rootScope.$broadcast('healthCaresLoaded', that.healthCares);

            console.log(that.healthCares);
        },
        function (errorPayload) {
            console.log("Error ->" + errorPayload);
        });

    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: {
            lat: -22.8114338,
            lng: -47.0481918
        },
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.getPoints(),
        map: this.map
    });
};

MainCtrl.prototype.toggleHeatmap = function () {
    this.heatmap.setMap(heatmap.getMap() ? null : this.map);
};

MainCtrl.prototype.getPoints = function () {
    var points = [];

    var i, lat, lng;
    lat = -22.8114338;
    lng = -47.0481918;

    for (i = 0; i < 10; i++) {
        lng = lng + 0.0001;
        points.push(new google.maps.LatLng(lat, lng));
    }

    return points;
};

MainCtrl.prototype.changeGradient = function () {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ];

    this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
};

MainCtrl.prototype.changeOpacity = function () {
    this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.2);
};

MainCtrl.prototype.changeRadius = function () {
    this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
};