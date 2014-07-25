'use strict';
var eventsApp = angular.module('eventsApp');

eventsApp.controller('TimeoutSampleController',
  function TimeoutSampleController ($scope, $timeout) {

    var promise = $timeout(function () {
      $scope.name = "John Doe";
    }, 3000);

    $scope.cancel= function () {
      console.log("Promise canceled");
      $timeout.cancel(promise);
    };

  }
);
