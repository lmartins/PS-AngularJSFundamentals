'use strict';
var eventsApp = angular.module('eventsApp');

require('locale');

eventsApp.controller('LocaleSampleController',
  function LocaleSampleController ($scope, $locale) {

    $scope.myDate = Date.now();
    $scope.myFormat = $locale.DATETIME_FORMATS.fullDate;

  }
);
