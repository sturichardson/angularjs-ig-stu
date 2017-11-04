angular.module('stuIG.trade')
  .component('watchListTable', {
    templateUrl: 'watchlists/watchlist-table.template.html',
    controller: function watchListTableController($scope, loginFactory, watchlistsFactory, watchlistFactory) {
      var self = this;
      self.securityTokens = loginFactory.getSecurityTokens();
      self.lsEndpoint = loginFactory.getLightStreamerEndpoint();

      watchlistsFactory.getWatchlists(self.securityTokens)
        .then(function (data) {
          self.watchLists = data.watchlists;
        }, function (data) {
          self.watchLists = data;
          console.log(data);
        });

      self.search = function (id, myArray) {
        for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].id === id) {
            return myArray[i];
          }
        }
      }

      self.loadWatch = function (id) {
        self.watch = self.search(id, self.watchLists);
        watchlistFactory.getWatchlist(self.securityTokens, id)
          .then(function (response) {
            self.watchData = response.data;
            self.initDataForLightstreamer();
            self.lightstreamer();
          }, function (response) {

          });
      }

      // Prepare data for lightstreamer
      self.initDataForLightstreamer = function () {
        self.itemArray = [];
        angular.forEach(self.watchData.markets, function (value, key) {
          self.itemArray.push("MARKET:" + value.epic);
        })
        self.fieldArray = ["BID", "OFFER", "HIGH", "LOW"];
      }

      self.lightstreamer = function () {
        var lsClient = {};
        var password = "CST-" + self.securityTokens.CST + "|XST-" + self.securityTokens.xSecurityToken;


        require(["LightstreamerClient"], function (LightstreamerClient) {
          lsClient = new LightstreamerClient(self.lsEndpoint);
          lsClient.connectionDetails.setUser(self.securityTokens.accountId);
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

          connectToLightstreamer();
        });

        function connectToLightstreamer() {
          // include the Lightstreamer Subscription module using require.js
          self.items = [];

          require(["Subscription"], function (Subscription) {

            var subscription = new Subscription(
              "MERGE",
              self.itemArray, // e.g. {"MARKET:IX.D.FTSE.DAILY.IP","MARKET:MT.D.GC.MONTH1.IP"}
              self.fieldArray // e.g. {"BID", "OFFER"}
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
              onItemUpdate: function (info) {
                var itemPos = info.getItemPos() - 1;
                if (!self.items[itemPos]) {
                  self.items[itemPos] = [];
                }
                info.forEachChangedField(function (fieldName, fieldPos, val) {
                  if (!self.items[itemPos][fieldPos - 1])
                    self.items[itemPos][fieldPos - 1] = [];
                  var previousVal = self.items[itemPos][fieldPos - 1].val;
                  if (previousVal !== undefined) {
                    if (val > previousVal)
                      self.items[itemPos][fieldPos - 1].class = "valueup";
                    else
                      self.items[itemPos][fieldPos - 1].class = "valuedown";
                  }
                  self.items[itemPos][fieldPos - 1].val = val;
                });

                $scope.$apply();
              }

            });
            // Subscribe to Lightstreamer
            lsClient.subscribe(subscription);
          });
        }
      }
    }
  });