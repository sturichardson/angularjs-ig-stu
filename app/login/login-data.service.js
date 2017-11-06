'use strict';

angular.module('stuIG.login')

.factory('loginDataFactory', ['$http', '$cookies', '$localstorage', function ($http, $cookies, $localstorage) {
  var factory = {};
  var self = this;

  self.securityTokens = {};
  self.lightStreamerEndpoint = {};
  // var username = {};

  factory.setLightStreamerEndpoint = function (lse) {
    self.lightStreamerEndpoint = lse;
  }

  factory.getLightStreamerEndpoint = function() {
    return self.lightStreamerEndpoint;
  }
  
  factory.setSecurityTokens = function(sts) {
    self.securityTokens = sts;
//    $cookies.putObject('angular-ig-stu-securityTokens', self.securityTokens);
    $localstorage.setObject('angular-ig-stu-securityTokens', self.securityTokens);
  }

  factory.getSecurityTokens = function() {
    if (angular.equals(self.securityTokens, {}))
      //self.securityTokens = $cookies.getObject('angular-ig-stu-securityTokens');
      self.securityTokens = $localstorage.getObject('angular-ig-stu-securityTokens');
  
    return self.securityTokens;
  }

  factory.isLoggedIn = function() {
    var loggedIn = true;
    self.securityTokens = factory.getSecurityTokens();
    if ((angular.equals({}, self.securityTokens.CST)) && (angular.equals({}, self.securityTokens.xSecurityToken)))
      loggedIn = false;

      return loggedIn;
  }

  factory.logout = function() {
    self.securityTokens = factory.getSecurityTokens();
    self.securityTokens.CST = {};
    self.securityTokens.xSecurityToken = {};
    factory.setSecurityTokens(self.securityTokens);
  }
  // factory.getUserName = function() {
  //   return username;
  // }

  return factory;
}]);
