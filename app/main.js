'use strict';

angular.module('stuIG.login')

  .controller('MainCtrl', ['$timeout', '$scope', 'loginDataFactory', function ($timeout, $scope, loginDataFactory) {
    var self = this;
    $scope.loggedIn = false;

    $scope.isLoggedIn = function () {
      self.securityTokens = loginDataFactory.getSecurityTokens();
      if ((angular.equals({}, self.securityTokens.CST)) && (angular.equals({}, self.securityTokens.xSecurityToken)))
        $scope.loggedIn = false;
      else
        $scope.loggedIn = true;

      return $scope.loggedIn;
    }

    $scope.isLoggedIn();

    $scope.$on('user:loggedIn', function (event) {
      $scope.isLoggedIn();
    });

    $scope.$on('user:loggedOut', function (event) {
      $scope.isLoggedIn();
    });
  }]);
