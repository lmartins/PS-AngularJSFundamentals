'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.controller('EditProfileController',
  function EditProfileController( $scope ) {

    $scope.user = {};

    $scope.getGravatarURL = function (email) {
      var defaultGravatarUrl = "http://www.gravatar.com/avatar/000?s=200";
      var regex = "";

      if (!regex.test(email))
        return defaultGravatarUrl;

    }
  }

);
