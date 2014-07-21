'use strict';

// var angular = require('angular');
// require('angular-route');

var eventsApp = angular.module('eventsApp', ['ngSanitize']);
require('./controllers/EventController');
require('./controllers/EditEventController');
require('./filters');
require('./services/EventDataService');


// var HelloController = function ($scope) {
//   $scope.message = 'Hello World!';
// };

// app.controller('HelloController', ['$scope', HelloController]);
