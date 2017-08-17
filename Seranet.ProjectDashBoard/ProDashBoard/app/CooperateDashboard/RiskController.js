(function () {
    'use strict';
    //create angularjs controller

    app.controller('RiskController', ['$scope', 'toaster', '$mdDialog', '$rootScope', '$http', '$window', '$timeout', RiskController]);

    //angularjs controller method


    function RiskController($scope, toaster, $mdDialog, $rootScope, $http, $window, $timeout) {

        GetRisk();
        getURL();
        $scope.data = false;
        function GetRisk() {
            $http.get('api/RiskManagement/getRiskList').success(function (data) {
                var obj = JSON.parse(data);
                $scope.CriticalRisks = obj.CriticalRisks;
                $scope.HighRisks = obj.HighRisks;
                $scope.MediumRisks = obj.MediumRisks;
                $scope.LowRisks = obj.LowRisks;
                $scope.AcceptedRisks = obj.AcceptedRisks;
                $scope.TotalRisks = obj.CriticalRisks + obj.HighRisks + obj.MediumRisks + obj.LowRisks;
                $scope.data = true;
            }).error(function () {
                console.log("ERRORRRR");
            })
        }
        function getURL() {
            $http.get('api/AppSettings/getRiskDashboard').success(function (data) {
                $scope.RiskDashboardURL = data;
            }).error(function () {
                console.log("ERRORRRR");
            })
        }

        $scope.redirectTo = function () {
            if ($scope.specLink != '/#') {
                $window.open($scope.RiskDashboardURL, '_blank');
            }
        };

    }
})();
