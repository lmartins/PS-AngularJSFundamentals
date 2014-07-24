'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.controller('EditProfileController',
  function EditProfileController( $scope, gravatarUrlBuilder ) {

    $scope.user = {};

    $scope.getGravatarURL = function (email) {
      return gravatarUrlBuilder.buildGravatarUrl(email);
    }
  }

);
