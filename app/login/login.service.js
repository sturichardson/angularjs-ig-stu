'use strict';

angular.module('stuIG.login')

.factory('loginFactory', ['$http', function ($http) {
  var factory = {};
  var securityTokens = {};
  var lightStreamerEndpoint = {};
  var username = {};
  var self = this;

  factory.setLightStreamerEndpoint = function (lse) {
    lightStreamerEndpoint = lse;
  }

  factory.getLightStreamerEndpoint = function() {
    return lightStreamerEndpoint;
  }
  
  factory.setSecurityTokens = function(sts) {
    securityTokens = sts;
  }

  factory.getSecurityTokens = function() {
    return securityTokens;
  }

  factory.getUserName = function() {
    return username;
  }

  factory.login = function (username, password, apiKey) {
    self.username = username;

    var requestData = {
      identifier: username,
      password: password
    };

    var config = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
        'VERSION': 2,
        'X-IG-API-KEY': apiKey
      }
    }
    var promise = $http.post('https://demo-api.ig.com/gateway/deal/session', requestData, config);
    return promise;
  }
  return factory;
}]);
