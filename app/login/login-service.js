'use strict';

angular.module('stuIG.login')

.factory('loginFactory', ['$http', function ($http) {
  var factory = {};
  var securityTokens = {};
  
  factory.setSecurityTokens = function(sts) {
    securityTokens = sts;
  }

  factory.getSecurityTokens = function() {
    return securityTokens;
  }

  factory.login = function (username, password, apiKey) {

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
