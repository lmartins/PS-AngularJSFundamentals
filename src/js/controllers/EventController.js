'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.controller('EventController',
  function EventController( $scope, eventData, $anchorScroll ) {

    $scope.sortorder = '-upVoteCount';

    eventData.getEvent()
      .$promise.then(
        function (event) {
          $scope.event = event;
          console.log(event);
        },
        function (response) {
          console.log(response);
        }
      )

    $scope.upVoteSession = function (session) {
      session.upVoteCount++;
    };

    $scope.downVoteSession = function (session) {
      session.upVoteCount--;
    };

    $scope.scrollToSession = function () {
      $anchorScroll();
    };

  }
);
