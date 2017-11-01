'use strict';

angular.module('stuIG.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  })
  .when('/trade', {
    templateUrl: 'trade/trade.html',
    controller: 'TradeCtrl'
   });
}])

.controller('LoginCtrl', function ($scope, loginFactory, $location) {
  init();
  function init() {}

  $scope.login = function() 
  {
    loginFactory.login($scope.username, $scope.password, $scope.apikey)
    .then(function (data, status, headers, config) {
      $location.path('/trade');
    }, function (data, status, header, config) {
    });
  }
});
