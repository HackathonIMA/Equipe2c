'use strict';

console.log('here i am')
angular.module('smscApp').controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$routeParams'];

function MainCtrl($routeParams) {
    var mainCtrl = this;
}
