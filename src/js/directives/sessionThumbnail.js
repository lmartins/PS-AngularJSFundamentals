'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.directive('sessionThumbnail', function () {
  return {
    restrict: 'E',
    templateUrl: "/templates/directives/sessionDetails.html",
    scope: {
      session: '=',
      editable: '=',
      edit: '&'
    }
  }
});
