'use strict';

angular.module('stuIG.login')

  .factory('loginDataFactory', ['$http', '$localstorage', function ($http, $localstorage) {
    var factory = {
      securityTokens: {},
      lightStreamerEndpoint: {},

      setLightStreamerEndpoint: function (lse) {
        this.lightStreamerEndpoint = lse;
      },

      getLightStreamerEndpoint: function () {
        return this.lightStreamerEndpoint;
      },

      setSecurityTokens: function (sts) {
        this.securityTokens = sts;
        $localstorage.setObject('angular-ig-stu-securityTokens', this.securityTokens);
      },

      getSecurityTokens: function () {
        if (angular.equals(this.securityTokens, {}))
          this.securityTokens = $localstorage.getObject('angular-ig-stu-securityTokens');

        return this.securityTokens;
      },

      isLoggedIn: function () {
        var loggedIn = true;
        this.securityTokens = factory.getSecurityTokens();
        if ((angular.equals({}, this.securityTokens.CST)) && (angular.equals({}, this.securityTokens.xSecurityToken)))
          loggedIn = false;

        return loggedIn;
      },

      logout: function () {
        this.securityTokens = factory.getSecurityTokens();
        this.securityTokens.CST = {};
        this.securityTokens.xSecurityToken = {};
        factory.setSecurityTokens(this.securityTokens);
      }
    }

    return factory;
  }]);
