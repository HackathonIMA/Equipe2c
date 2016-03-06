'use strict';

angular.module('smscApp').controller('TimelineCtrl', TimelineCtrl);


TimelineCtrl.$inject = ['$routeParams', '$timeout'];

function TimelineCtrl($routeParams, $timeout) {
    this.isPlaying = false;
    this.dataIndex = 0;
    this.init();
    this.timeout = $timeout;
    this.healthHistory = {};
    this.timelineTimer = null;
    this.healthHistory.formatedDate = '';
}

TimelineCtrl.prototype.init = function () {
    this.data = [{
        month: 1,
        year: 2013,
    }, {
        month: 2,
        year: 2013,
    }, {
        month: 3,
        year: 2013,
    }, {
        month: 4,
        year: 2013,
    }, {
        month: 5,
        year: 2013,
    }];
};

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

TimelineCtrl.prototype.stopTimeline = function () {
    this.timeout.cancel(this.timelineTimer);
    this.isPlaying = false;
};

TimelineCtrl.prototype.playTimeline = function () {
    var that = this;

    this.timelineTimer = this.timeout(function () {
        if (that.data.length > that.dataIndex) {
            var history = that.data[that.dataIndex];
            var formatedMonth = ('0' + history.month).slice(-2);

            history.formatedDate = formatedMonth + '/' + history.year;

            that.healthHistory = history;

            that.playTimeline();

            that.dataIndex++;
        } else {
            that.stopTimeline();
            that.dataIndex = 0;
            $(that.buttonIcon).removeClass();
            $(that.buttonIcon).addClass('glyphicon glyphicon-repeat');
        }
    }, 1000);
};