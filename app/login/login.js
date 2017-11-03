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

.controller('LoginCtrl', ['$scope', 'loginFactory', '$location', '$cookies', function ($scope, loginFactory, $location, $cookies) {
  init();
  function init() {
    $scope.username = $cookies.get('angular-ig-stu_username');
    $scope.apiKey = $cookies.get('angular-ig-stu_apikey');
    $scope.demo = true;
  }

  $scope.login = function() 
  {
    $cookies.put('angular-ig-stu_username', $scope.username);
    $cookies.put('angular-ig-stu_apikey', $scope.apiKey);
    loginFactory.login($scope.username, $scope.password, $scope.apiKey)
    .then(function (response) {
      $scope.responseData = response.data;
      $scope.securityTokens = {
        'accountId': response.data.currentAccountId,
        'CST': response.headers('cst'),
        'xSecurityToken': response.headers('x-security-token'),
        'apiKey': $scope.apiKey
      }
      loginFactory.setSecurityTokens($scope.securityTokens);
      $scope.lightStreamerEndpoint = response.data.lightstreamerEndpoint;
      loginFactory.setLightStreamerEndpoint($scope.lightStreamerEndpoint);
      $location.path('/trade');
    }, function (response) {
      responseData = responseData;
      console.log(responseData);
    });


  }
}]);
