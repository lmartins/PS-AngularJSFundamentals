'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.directive('upvote', function () {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/upvote.html',
    scope: {
      upvote: "&",
      downvote: "&",
      count: "="
    }
  }
});
