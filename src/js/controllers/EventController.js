'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.controller('EventController',
  function EventController( $scope, eventData ) {

    $scope.sortorder = '-upVoteCount';

    $scope.event = eventData.event;

    $scope.upVoteSession = function (session) {
      session.upVoteCount++;
    };

    $scope.downVoteSession = function (session) {
      session.upVoteCount--;
    };



  }
);



// var HelloController = function ($scope) {
//   $scope.message = 'Hello World!';
// };
//
// app.controller('HelloController', ['$scope', HelloController]);
