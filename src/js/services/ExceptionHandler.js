'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.factory('$exceptionHandler', function () {
  return function (exception) {
    console.log("exception handled: " + exception.message);
  };
});
