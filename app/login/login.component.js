angular.module('stuIG.login')
.component('igLogin', {
  templateUrl: 'login/login.template.html',
  controller: function igLoginController(loginFactory, $location, $cookies) {
    var self = this;
      init();
      function init() {
        self.username = $cookies.get('angular-ig-stu_username');
        self.apiKey = $cookies.get('angular-ig-stu_apikey');
        self.demo = true;
      }
    
      self.login = function() 
      {
        $cookies.put('angular-ig-stu_username', self.username);
        $cookies.put('angular-ig-stu_apikey', self.apiKey);
        loginFactory.login(self.username, self.password, self.apiKey)
        .then(function (response) {
          self.responseData = response.data;
          self.securityTokens = {
            'accountId': response.data.currentAccountId,
            'CST': response.headers('cst'),
            'xSecurityToken': response.headers('x-security-token'),
            'apiKey': self.apiKey
          }
          loginFactory.setSecurityTokens(self.securityTokens);
          self.lightStreamerEndpoint = response.data.lightstreamerEndpoint;
          loginFactory.setLightStreamerEndpoint(self.lightStreamerEndpoint);
          $location.path('/trade');
        }, function (response) {
          responseData = responseData;
          console.log(responseData);
        });
    
    
      }
  } 
})