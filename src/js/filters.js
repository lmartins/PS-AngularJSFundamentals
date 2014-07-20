'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.filter('durations', function () {
  return function (duration) {
    switch (duration) {
    case 1:
      return 'Half Hour'
    case 2:
      return '1 Hour'
    case 3:
      return 'Half Day'
    case 2:
      return 'Full Day'
    }
  }
})