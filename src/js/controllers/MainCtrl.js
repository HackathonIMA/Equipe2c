'use strict';

angular.module('smscApp').controller('MainCtrl', MainCtrl);


MainCtrl.$inject = ['$routeParams'];

function MainCtrl($routeParams) {
    this.init();
}

MainCtrl.prototype.init = function () {
    cartodb.createVis('map', 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json');
};