'use strict';

angular.module('stuIG.trade')

.factory('watchlistFactory', ['$http', function ($http) {
  var factory = {};

  factory.getWatchlist = function (securityTokens, watchListId) {
    var config = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
        'X-IG-API-KEY': securityTokens.apiKey,
        'CST': securityTokens.CST,
        'X-SECURITY-TOKEN': securityTokens.xSecurityToken
      }
    }
    var promise = $http.get('https://demo-api.ig.com/gateway/deal/watchlists/' + watchListId, config);
    return promise;      
  }
  return factory;
}]);
