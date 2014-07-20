'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.controller('EditEventController',
  function EditEventController( $scope ) {

    $scope.saveEvent = function (event, newEventForm) {
      console.log(newEventForm);
      if (newEventForm.$valid) {
        console.log("Evento " + event.name + " guardado.");
      }
    }
    $scope.cancelEdit = function () {
      window.location = './EventDetails.html';
    }
  }
);
