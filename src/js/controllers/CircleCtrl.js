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
    this.currentIndex = 0;
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


    var points = [];

    var i, lat, lng;

    for (var key in healthHistory.hospitals) {
        var circle = {};

        lat = healthHistory.hospitals[key].lat;
        lng = healthHistory.hospitals[key].lng;

        console.log(lat + ' - ' + lng);

        var config = {
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.03,
            map: this.map,
            center: {
                lat: lat,
                lng: lng
            },
            radius: 1000
        };



        circle = new google.maps.Circle(config);

        this.marker = new google.maps.Marker({
            map: this.map,
            title: 'No title for this time.'
        });
    }
}


CircleCtrl.prototype.back = function () {
    if (Object.keys(this.healthHistory).length > 0) {
        this.currentIndex--;
        var key = Object.keys(this.healthHistory)[this.currentIndex];
        this.currentHealthHistory = this.healthHistory[key];
        that.createCircle(this.currentHealthHistory);
    }
}

CircleCtrl.prototype.next = function () {
    if (Object.keys(this.healthHistory).length > this.currentIndex) {
        this.currentIndex++;
        var key = Object.keys(this.healthHistory)[this.currentIndex];
        this.currentHealthHistory = this.healthHistory[key];
        that.createCircle(this.currentHealthHistory);
    }
}