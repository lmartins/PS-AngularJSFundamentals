'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.controller('EventController',
  function EventController( $scope ) {

    $scope.event = {
      name: 'Angular Boot Camp',
      date: '2014-07-20',
      time: '10:30am'
    }

  }
);



// var HelloController = function ($scope) {
//   $scope.message = 'Hello World!';
// };
//
// app.controller('HelloController', ['$scope', HelloController]);
