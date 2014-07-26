'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.directive('upvote', function () {
  return {
    restrict: 'A',
    // replace: true,
    templateUrl: '/templates/directives/upvote.html',
    scope: {
      upvote: "&",
      downvote: "&",
      count: "="
    }
  }
});
