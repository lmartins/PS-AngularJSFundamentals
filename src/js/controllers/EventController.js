'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.controller('EventController',
  function EventController( $scope, eventData, $routeParams, $route ) {

    $scope.sortorder = '-upVoteCount';
    // $scope.event = eventData.getEvent( $routeParams.eventId );
    $scope.event = $route.current.locals.event;
    console.log($route.current.params.eventId);

    $scope.upVoteSession = function (session) {
      session.upVoteCount++;
    };

    $scope.downVoteSession = function (session) {
      session.upVoteCount--;
    };

    $scope.reload = function () {
      $route.reload();
    };

  }
);
