'use strict';

angular.module('stuIG.trade')

.factory('watchlistsFactory', ['$http', function ($http) {
  var factory = {};
  // var responseData = {};
  
  // factory.getResponseData = function() {
  //   return responseData;
  // }

  factory.getWatchlists = function (securityTokens) {
    var config = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
        'X-IG-API-KEY': securityTokens.apiKey,
        'CST': securityTokens.CST,
        'X-SECURITY-TOKEN': securityTokens.xSecurityToken
      }
    }
    var promise = $http.get('https://demo-api.ig.com/gateway/deal/watchlists', config)
    .then(function (response) {
      console.log(response);
      // The return value gets picked up by the then in the controller.
      return response.data;
    }, function (response) {
      console.log(response);
      return response;
    });
    return promise;      
      //    responseData = data;
      //  });
    //  .then(function (data, status, headers, config) {
    //    responseData = data;
    //  }, function (data, status, header, config) {
    //    responseData = data;
    //  });
  }
  return factory;
}]);
