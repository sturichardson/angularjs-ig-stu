angular.module('stuIG.login')
  .component('igLogin', {
    templateUrl: 'login/login.template.html',
    controller: function igLoginController($rootScope, $scope, loginFactory, loginDataFactory, $location, $cookies) {
      var self = this;
      init();
      function init() {
        self.securityTokens = loginDataFactory.getSecurityTokens();
        if (self.securityTokens) {
          self.username = self.securityTokens.username;
          self.apiKey = self.securityTokens.apiKey;
        }
        self.demo = true;
      }

      self.login = function () {
        // $cookies.put('angular-ig-stu_username', self.username);
        // $cookies.put('angular-ig-stu_apikey', self.apiKey);
        loginFactory.login(self.username, self.password, self.apiKey)
          .then(function (response) {
            self.responseData = response.data;
            self.securityTokens = {
              'username': self.username,
              'accountId': response.data.currentAccountId,
              'CST': response.headers('cst'),
              'xSecurityToken': response.headers('x-security-token'),
              'apiKey': self.apiKey
            }
            // $cookies.putObject('angular-ig-stu-securityTokens', self.securityTokens);
            self.lightStreamerEndpoint = response.data.lightstreamerEndpoint;
            loginDataFactory.setSecurityTokens(self.securityTokens);
            loginDataFactory.setLightStreamerEndpoint(self.lightStreamerEndpoint);
            $location.path('/trade');
            $rootScope.$broadcast('user:loggedIn');
          }, function (response) {
          });


      }
    }
  })