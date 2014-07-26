'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.controller('EventController',
  function EventController( $scope, eventData, $routeParams, $route ) {

    $scope.sortorder = '-upVoteCount';
    // $scope.event = eventData.getEvent( $routeParams.eventId );
    $scope.event = $route.current.locals.event;
    console.log($route.current.params.eventId);

    // $scope.$on('$routeChangeSuccess', function (ev, current, prev) {
    //   //  console.log($route.current.foo);
    // });

    // eventData.getEvent( $routeParams.eventId )
    //   .$promise.then(
    //     function (event) {
    //       $scope.event = event;
    //       // console.log(event);
    //     },
    //     function (response) {
    //       console.log(response);
    //     }
    //   )

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
