'use strict';

angular.module('smscApp').controller('CircleCtrl', CircleCtrl);


CircleCtrl.$inject = ['$routeParams'];

function CircleCtrl($routeParams) {
    this.map = {};
    this.marker = {};
    this.circle = {};
    this.init();
}

CircleCtrl.prototype.init = function () {
    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: {
            lat: -22.8114338,
            lng: -47.0481918
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.marker = new google.maps.Marker({
        map: this.map,
        position: {
            lat: -22.8114338,
            lng: -47.0481918
        },
        title: 'No title for this time.'
    });

    // Create circle with default configs
    this.createCircle();

};

CircleCtrl.prototype.changeColor = function () {
    this.createCircle({'fillColor' : '#00FF00'})
};

CircleCtrl.prototype.createCircle = function (configs) {
	configs = configs || {};

    var defaultConfigs = {
        map: this.map,
        strokeWeight: 1,
        radius: 10, // metres
        fillColor: '#A00000'
    };

    // Merge attributes
    for (var attrname in configs) {
        defaultConfigs[attrname] = configs[attrname];
    }

    this.circle = new google.maps.Circle(defaultConfigs);
    this.circle.bindTo('center', this.marker, 'position');
}