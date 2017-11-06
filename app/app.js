'use strict';

// Declare app level module which depends on views, and components
angular.module('stuIG', [
  'ngRoute',
  'ngCookies',
  'stuIG.login',
  'stuIG.trade',
  'stuIG.version',
  'stuIG.utils'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  .when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  })
  .when('/logout', {
    templateUrl: 'login/login.html',
    controller: 'LogoutCtrl'
  })
  .when('/trade', {
    templateUrl: 'trade/trade.html',
    controller: 'TradeCtrl'
   })
  .otherwise({redirectTo: '/login'});
}]);
