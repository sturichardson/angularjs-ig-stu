'use strict';

angular.module('stuIG.trade')

.factory('watchlistsFactory', ['$http', function ($http) {
  var factory = {};
  var responseData = {};
  
  factory.getResponseData = function() {
    return responseData;
  }

  factory.getWatchlists = function (securityTokens) {
    var config = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
        'VERSION': 2,
        'X-IG-API-KEY': securityTokens.apiKey,
        'CST': securityTokens.CST,
        'X-SECURITY-TOKEN': securityTokens.xSecurityToken
      }
    }
    debugger;
    return $http.get('https://demo-api.ig.com/gateway/deal/watchlists', config)
    .then(function (data, status, headers, config) {
      responseData = data;
      console.log(data);
    }, function (data, status, header, config) {
      responseData = data;
      console.log(data);
    });
  }
  return factory;
}]);
