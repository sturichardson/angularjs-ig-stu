'use strict';

// Declare app level module which depends on views, and components
angular.module('stuIG', [
  'ngRoute',
  'stuIG.login',
  'stuIG.trade',
  'stuIG.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  .when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  })
  .when('/trade', {
    templateUrl: 'trade/trade.html',
    controller: 'TradeCtrl'
   })
  .otherwise({redirectTo: '/login'});
}]);
