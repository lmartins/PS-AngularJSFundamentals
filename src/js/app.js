'use strict';

// var angular = require('angular');
require('angular-cookies');

var eventsApp = angular.module('eventsApp', ['ngSanitize', 'ngResource', 'ngCookies'])
  .factory('myCache', function ($cacheFactory) {
    return $cacheFactory('myCache', {capacity: 3})
  });

require('./controllers/EventController');
require('./controllers/EditEventController');
require('./controllers/EditProfileController');
require('./controllers/CacheSampleController');
require('./controllers/CompileSampleController');
require('./controllers/LocaleSampleController');
require('./controllers/TimeoutSampleController');
require('./controllers/FilterSampleController');
require('./controllers/CookieStoreSampleController');
require('./filters');

require('./services/EventData');
require('./services/GravatarUrlBuilder');
// require('./services/ExceptionHandler');




// var HelloController = function ($scope) {
//   $scope.message = 'Hello World!';
// };

// app.controller('HelloController', ['$scope', HelloController]);
