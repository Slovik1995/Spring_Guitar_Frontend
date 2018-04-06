
angular.module('guitarFrontendApp')
  .controller('LoginCtrl',['$rootScope', '$scope', '$location', '$http','$window','$localStorage','$cookies','$cookieStore',
    function ($rootScope, $scope, $location, $http,$window,$localStorage,$cookies,$cookieStore) {

      var self = this;
      self.credentials = {username:'',password:''};

      var authenticate = function(credentials) {
        var headers = {authorization: credentials.username + ":" + credentials.password};
        $http.get("http://localhost:8080/login",{headers: headers})
          .then(function (response) {
            $localStorage.$reset();
            $localStorage.header = {
              headers: {
                'X-AUTH-TOKEN': response.headers('X-AUTH-TOKEN')
              }
            };
            $rootScope.authenticated = true;
            $window.localStorage.setItem("loggedUser",credentials.username);
            // alert(response.headers('Set-Cookie'));
            // alert(response.header('Set-Cookie'));
            $location.url('/home');
          }, function () {
            $location.url('/login');
          });
      };

      self.tryLogin = function () {
        authenticate(self.credentials);
      };
    }]);
