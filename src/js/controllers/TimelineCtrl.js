'use strict';

angular.module('smscApp').controller('TimelineCtrl', TimelineCtrl);


TimelineCtrl.$inject = ['$routeParams', '$timeout', 'HealthCareService', '$scope'];

function TimelineCtrl($routeParams, $timeout, HealthCareService, $scope) {
    this.isPlaying = false;
    this.healthCareService = HealthCareService;
    this.dataIndex = 0;
    this.timelineSpeed = 1000;
    this.init();
    this.timeout = $timeout;
    this.healthHistory = {};
    this.timelineTimer = [];
    this.healthHistory.formatedDate = '';

    var that = this;
    $scope.$on('healthCaresLoaded', function (event, data) {
        that.healthHistory = data;
    });
}

TimelineCtrl.prototype.init = function () {};

TimelineCtrl.prototype.playClick = function ($event) {
    this.isPlaying = !this.isPlaying;
    var iconClass = '';

    if (this.isPlaying) {
        this.playTimeline();
        iconClass = 'fa fa-pause';
    } else {
        this.stopTimeline();
        iconClass = 'fa fa-play'
    }

    this.buttonIcon = $event.currentTarget.children[0];
    $(this.buttonIcon).removeClass();
    $(this.buttonIcon).addClass(iconClass);
};

TimelineCtrl.prototype.slow = function () {
    // this.timeout.cancel(this.timelineTimer.pop());
    // TODO

    if (this.timelineSpeed < 4000) {
        this.timelineSpeed = this.timelineSpeed * 2;
        this.playTimeline();
    }
}

TimelineCtrl.prototype.fast = function () {
    // this.timeout.cancel(this.timelineTimer.pop());
    // TODO
    if (this.timelineSpeed > 250) {
        this.timelineSpeed = this.timelineSpeed / 2;
        this.playTimeline();
    }
}

TimelineCtrl.prototype.stopTimeline = function () {
    for (var i = 0; i < this.timelineTimer.length; i++) {
        this.timeout.cancel(this.timelineTimer[i]);
    }

    while (this.timelineTimer.length > 0) {
        this.timelineTimer.pop();
    }

    this.isPlaying = false;
};

TimelineCtrl.prototype.playTimeline = function () {
    var that = this;

    var i = 1;

    for (var key in this.healthHistory) {
        if (this.isPlaying) {
            this.doTimeout(key, this.healthHistory, i)
            i++;
        } else {
            return;
        }
    }
};

TimelineCtrl.prototype.doTimeout = function (key, healthHistory, i) {
    var that = this;

    this.timelineTimer.push(this.timeout(function () {
        console.log(key);

        if (Object.keys(healthHistory).length > that.dataIndex) {
            var history = healthHistory[key];

            that.healthHistory = history;

            // that.playTimeline();

            that.dataIndex++;
        } else {
            that.stopTimeline();
            that.dataIndex = 0;
            // that.timelineSpeed = 1000;
            $(that.buttonIcon).removeClass();
            $(that.buttonIcon).addClass('glyphicon glyphicon-repeat');
        }
    }, 1000 * i));
}