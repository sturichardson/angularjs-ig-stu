'use strict';

angular.module('stuIG.trade', ['ngRoute', 'stuIG.login'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('trade', {
      templateUrl: 'trade/trade.html',
      controller: 'TradeCtrl'
    });
  }])

  .controller('TradeCtrl', ['$scope', 'loginFactory', 'watchlistsFactory', 'watchlistFactory', function ($scope, loginFactory, watchlistsFactory, watchlistFactory) {
    $scope.securityTokens = loginFactory.getSecurityTokens();
    $scope.lsEndpoint = loginFactory.getLightStreamerEndpoint();
    $scope.username = loginFactory.getUserName();

    init();
    function init() { }

    watchlistsFactory.getWatchlists($scope.securityTokens)
      .then(function (data) {
        $scope.watchLists = data.watchlists;
      }, function (data) {
        $scope.watchLists = data;
        console.log(data);
      });

    $scope.search = function (id, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].id === id) {
          return myArray[i];
        }
      }
    }

    $scope.loadWatch = function (id) {
      $scope.watch = $scope.search(id, $scope.watchLists);
      watchlistFactory.getWatchlist($scope.securityTokens, id)
        .then(function (response) {
          $scope.watchData = response.data;
          $scope.lightstreamer($scope);
        }, function (response) {

        });
    }


    $scope.itemArray = [];
    var marketArray = [];
    $scope.fieldArray = ["BID", "OFFER", "HIGH", "LOW"];

    $scope.lightstreamer = function ($scope) {
      var lsClient = {};
      var password = "";
      password = "CST-" + $scope.securityTokens.CST + "|XST-" + $scope.securityTokens.xSecurityToken;

      require(["LightstreamerClient"], function (LightstreamerClient) {
        lsClient = new LightstreamerClient($scope.lsEndpoint);
        lsClient.connectionDetails.setUser($scope.securityTokens.accountId);
        lsClient.connectionDetails.setPassword(password);

        // Add connection event listener callback functions
        // Note: the Lightstreamer library will transparently attempt to reconnect a number of times
        // in the event of communications errors
        lsClient.addListener({
          onListenStart: function () {
            console.log('ListenStart');
          },
          onStatusChange: function (status) {
            console.log('Lightstreamer connection status:' + status);
          }
        });

        // Connect to Lightstreamer
        lsClient.connect();
        angular.forEach($scope.watchData.markets, function (value, key) {
          $scope.itemArray.push("MARKET:" + value.epic);
        })

        connectToLightstreamer($scope);
      });

      function connectToLightstreamer($scope) {
        // include the Lightstreamer Subscription module using require.js
        $scope.items = [];

        require(["Subscription"], function (Subscription) {

          var subscription = new Subscription(
            "MERGE",
            $scope.itemArray, // e.g. {"MARKET:IX.D.FTSE.DAILY.IP","MARKET:MT.D.GC.MONTH1.IP"}
            $scope.fieldArray // e.g. {"BID", "OFFER"}
          );

          // Set up Lightstreamer event listener
          subscription.addListener({
            onSubscription: function () {
              console.log('subscribed');
            },
            onUnsubscription: function () {
              console.log('unsubscribed');
            },
            onSubscriptionError: function (code, message) {
              console.log('subscription failure: ' + code + " message: " + message);
            },
            onItemUpdate: function(info) {
              var itemPos = info.getItemPos()-1;
              if (!$scope.items[itemPos]) {
                $scope.items[itemPos] = [];
              }
              info.forEachChangedField(function(fieldName,fieldPos,val) {
                if (!$scope.items[itemPos][fieldPos-1])
                  $scope.items[itemPos][fieldPos-1] = [];
                var previousVal = $scope.items[itemPos][fieldPos-1].val;
                if (previousVal !== undefined)
                {
                  if (val > previousVal)
                    $scope.items[itemPos][fieldPos-1].class = "valueup";
                  else
                    $scope.items[itemPos][fieldPos-1].class = "valuedown";
                }
                $scope.items[itemPos][fieldPos-1].val = val;
              });
              
              $scope.$apply();
            }

          });
          // Subscribe to Lightstreamer
          lsClient.subscribe(subscription);
        });
      }


    }
  }]);