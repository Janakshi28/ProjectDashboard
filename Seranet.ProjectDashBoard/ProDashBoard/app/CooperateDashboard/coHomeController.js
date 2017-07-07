(function () {
    'use strict';
    //create angularjs controller

    app.controller('CDBController', ['$scope', 'toaster', '$mdDialog', '$rootScope', '$http', '$window', '$timeout', CDBController]);

    //angularjs controller method


    function CDBController($scope, toaster, $mdDialog, $rootScope, $http, $window, $timeout) {

        isAuthorized();

        //Chek authorization
        function isAuthorized() {
            $http.get('api/Authorization').success(function (data) {
                getEmployee(data);
            })
        .error(function () {
            $scope.error = "An Error has occured while loading posts!";
            $scope.loading = false;
        });
        }

        //Check the Admin level and Redirect to the page
        function isAdmin() {
            $http.get("api/Authorization/getAdminRights").success(function (data) {
                $scope.isAdmin = data;
                console.log(isAdmin);
                
            })
            .error(function () {
            });
        }

        //Username

        function getEmployee(username) {
            $http.get('api/TeamMembers/' + username).success(function (data) {
                console.log(data);
                if (data != null | data != "") {
                    $scope.employee = data;
                    $scope.LoggedInUserName = "Seranet / " + data.MemberName;
                    $scope.loggedInUserId = data.Id;
                    isAdmin();
                }
            }).error(function () {
                $scope.error = "An Error has occured while loading posts!";
                $scope.loading = false;
            });
        }

    }

})();
