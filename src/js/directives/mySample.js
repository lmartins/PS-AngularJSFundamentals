'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.directive('mySample', function ( $compile ) {
  return {
    restrict: 'C',
    template: "<input type='text' ng-model='sampleData' /> {{sampleData}}<br/>",
    scope: {
      
    }
  }
});
