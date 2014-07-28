'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.controller('EditProfileController',
  function EditProfileController( $scope, gravatarUrlBuilder ) {

    $scope.user = {};
    console.log("testetestetteste123");

    $scope.getGravatarURL = function (email) {
      return gravatarUrlBuilder.buildGravatarUrl(email);
    }
  }

);
