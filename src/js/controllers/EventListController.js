'use strict';
var eventsApp = angular.module('eventsApp');

eventsApp.controller('EventListController',
  function EventListController ($scope, $location, $route) {

    $scope.events = $route.current.locals.events;
    // $scope.events = eventData.getAllEvents();

  }
);
