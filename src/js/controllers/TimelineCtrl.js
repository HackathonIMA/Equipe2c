'use strict';

angular.module('smscApp').controller('TimelineCtrl', TimelineCtrl);


TimelineCtrl.$inject = ['$routeParams', 'HealthCareService', '$rootScope', '$scope'];

function TimelineCtrl($routeParams, HealthCareService, $rootScope, $scope) {
    this.init();
    this.healthCareService = HealthCareService;
    this.healthHistory = {};
    this.rootScope = $rootScope;
    this.currentHealthHistory = {};
    this.currentIndex = 0;
    var that = this;

    $scope.$on('healthCaresLoaded', function (event, data) {
        that.healthHistory = data;
        that.currentIndex = 0;
        var key = Object.keys(that.healthHistory)[that.currentIndex];
        that.currentHealthHistory = that.healthHistory[key];
    });
}

TimelineCtrl.prototype.init = function () {};

TimelineCtrl.prototype.back = function () {
    if (Object.keys(this.healthHistory).length > 0) {
        this.currentIndex--;
        var key = Object.keys(this.healthHistory)[this.currentIndex];
        this.currentHealthHistory = this.healthHistory[key];
        this.rootScope.$broadcast('healthHistoryChanged', this.currentHealthHistory);
    }
}

TimelineCtrl.prototype.next = function () {
    if (Object.keys(this.healthHistory).length > this.currentIndex) {
        this.currentIndex++;
        var key = Object.keys(this.healthHistory)[this.currentIndex];
        this.currentHealthHistory = this.healthHistory[key];
        this.rootScope.$broadcast('healthHistoryChanged', this.currentHealthHistory);
    }

}
