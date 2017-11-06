'use strict';

angular.module('stuIG.login')

.controller('LogoutCtrl', ['$rootScope', '$scope', 'loginDataFactory', function ($rootScope, $scope, loginDataFactory) {
  loginDataFactory.logout();
  $rootScope.$broadcast('user:loggedOut');
}]);
