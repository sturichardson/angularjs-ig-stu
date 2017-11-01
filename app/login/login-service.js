'use strict';

angular.module('stuIG.login')

.factory('loginFactory', ['$http', function ($http) {
  var factory = {};
  var responseData = {};
  var securityTokens = {};
  
  factory.getResponseData = function() {
    return responseData;
  }

  factory.getSecurityTokens = function() {
    return securityTokens;
  }

  factory.login = function (username, password, apikey) {
    var requestData = {
      identifier: username,
      password: password
    };

    var config = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
        'VERSION': 2,
        'X-IG-API-KEY': apikey
      }
    }
    return $http.post('https://demo-api.ig.com/gateway/deal/session', requestData, config)
    .then(function (data, status, headers, config) {
      responseData = data;
      securityTokens = {
        'CST': data.headers('cst'),
        'xSecurityToken': data.headers('x-security-token'),
        'apiKey': apikey
      }
      console.log(data);
    }, function (data, status, header, config) {
      responseData = data;
      console.log(data);
    });
  }
  return factory;
}]);
