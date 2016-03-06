'use strict';

angular.module('smscApp').controller('CircleCtrl', CircleCtrl);


CircleCtrl.$inject = ['$routeParams', '$rootScope', '$scope', 'HealthCareService'];

function CircleCtrl($routeParams, $rootScope, $scope, HealthCareService) {
    this.map = {};
    // this.marker = {};
    this.init();
    this.healthCareService = HealthCareService;
    var that = this;
    HealthCareService.findAll();
    this.healthHistory = {};
    this.currentHealthHistory = {};
    this.currentIndex = 1;
    this.circles = [];

    this.red = '#e15615';
    this.yellow = '#fcdb00';
    this.green = '#307a2d';

    var that = this;

    $scope.$on('foundHealthCares', function (event, data) {
        that.healthHistory = data;
        var key = Object.keys(that.healthHistory)[that.currentIndex];
        that.currentHealthHistory = that.healthHistory[key];
        that.createCircle(that.currentHealthHistory);
    });
}

CircleCtrl.prototype.init = function () {
    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            // Campinas City Location
            lat: -22.9099384,
            lng: -47.0626332
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
};

CircleCtrl.prototype.changeColor = function () {
    this.createCircle({
        'fillColor': '#00FF00'
    })
};

CircleCtrl.prototype.createCircle = function (healthHistory) {

    this.circles.forEach(function(element) {
        element.setMap(null);
    });

    var i, lat, lng, circleColor;

    for (var key in healthHistory.hospitals) {
        var circle = {};
        var history = healthHistory.hospitals[key];

        if (history.maxCapacityLevel < 0.5) {
            circleColor = this.green;
        } else if (history.maxCapacityLevel > 0.7) {
            circleColor = this.yellow;
        } else if (history.maxCapacityLevel > 1) {
            circleColor = this.red;
        } else {
            circleColor = '#ffff';
        }

        var config = {
            strokeColor: '#000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: circleColor,
            fillOpacity: 0.3,
            map: this.map,
            center: {
                lat: history.lat,
                lng: history.lng
            },
            radius: 500
        };


        circle = new google.maps.Circle(config);

        this.circles.push(circle);

        this.marker = new google.maps.Marker({
            map: this.map,
            title: 'No title for this time.'
        });
    }
}


CircleCtrl.prototype.back = function () {
    if (this.currentIndex > 1) {
        this.currentIndex--;
        var key = Object.keys(this.healthHistory)[this.currentIndex];
        this.currentHealthHistory = this.healthHistory[key];
        this.createCircle(this.currentHealthHistory);
    }
}

CircleCtrl.prototype.next = function () {
    if (this.currentIndex < Object.keys(this.healthHistory).length - 1) {
        this.currentIndex++;
        var key = Object.keys(this.healthHistory)[this.currentIndex];
        this.currentHealthHistory = this.healthHistory[key];
        this.createCircle(this.currentHealthHistory);
    }
}