/*!
 * AngularJSFundamentals
 * 0.1.0:1405870315724 [development build]
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/app/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// var angular = require('angular');
	// require('angular-route');
	
	var eventsApp = angular.module('eventsApp', ['ngSanitize']);
	__webpack_require__(1);
	
	
	// var HelloController = function ($scope) {
	//   $scope.message = 'Hello World!';
	// };
	
	// app.controller('HelloController', ['$scope', HelloController]);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.controller('EventController',
	  function EventController( $scope ) {
	
	    $scope.sortorder = '-upVoteCount';
	
	    $scope.event = {
	      name: 'Angular Boot Camp',
	      date: '2014-07-20',
	      time: '10:30am',
	      location: {
	        address: 'Google Headquarters',
	        city: 'Mountain VIew',
	        province: 'CA'
	      },
	      imageUrl: 'img/angularjs-logo.png',
	      sessions: [
	        {
	          name: 'Scopes for fun and profit',
	          creatorName: 'John Doe',
	          duration: '30 mins',
	          level: 'Introductory',
	          abstract: 'In this session you will leanr the ins and outs of directives!',
	          upVoteCount: 0
	        },
	        {
	          name: 'Directives Masterclass',
	          creatorName: 'Bob Smith',
	          duration: '1 hr',
	          level: 'Advanced',
	          abstract: 'In this session you will leanr the ins and outs of directives!',
	          upVoteCount: 2
	        }
	      ]
	    };
	
	    $scope.upVoteSession = function (session) {
	      session.upVoteCount++;
	    };
	
	    $scope.downVoteSession = function (session) {
	      session.upVoteCount--;
	    };
	
	
	
	  }
	);
	
	
	
	// var HelloController = function ($scope) {
	//   $scope.message = 'Hello World!';
	// };
	//
	// app.controller('HelloController', ['$scope', HelloController]);


/***/ }
/******/ ])
//# sourceMappingURL=main.bundle.js.map