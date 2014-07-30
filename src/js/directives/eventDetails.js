'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.directive('eventDetails', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: "/templates/directives/eventDetails.html",
    scope: {
      event: '=',
      editable: '=',
      edit: '&'
    }
  }
});
