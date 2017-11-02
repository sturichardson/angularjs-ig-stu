'use strict';

angular.module('stuIG.trade', ['ngRoute', 'stuIG.login'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('trade', {
      templateUrl: 'trade/trade.html',
      controller: 'TradeCtrl'
    });
  }])

  .controller('TradeCtrl', ['$scope', 'loginFactory', 'watchlistsFactory', function ($scope, loginFactory, watchlistsFactory) {
    $scope.securityTokens = loginFactory.getSecurityTokens();

    init();
    function init() { }

    watchlistsFactory.getWatchlists($scope.securityTokens)
      .then(function (data) {
        $scope.watchLists = data;
      }, function (data) {
        $scope.watchLists = data;
      });

  }]);