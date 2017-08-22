(function () {
    'use strict';
    //create angularjs controller

    app.controller('AccountPopUpController', ['$scope', '$rootScope', '$http', '$modalInstance', 'ActiveAccounts', 'Year', 'UniqueProjects', 'UniqueTypes', AccountPopUpController]);

    //angularjs controller method
    function AccountPopUpController($scope, $rootScope, $http, $modalInstance, ActiveAccounts, Year, UniqueProjects, UniqueTypes) {
       
        console.log(Year);
        console.log(ActiveAccounts);
        $scope.activeAccounts = ActiveAccounts;
        $scope.year = Year;
        $scope.uniqueProjects = UniqueProjects;
        $scope.uniqueTypes = UniqueTypes;
        $scope.searchKeyword = "";
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.SelctProj = "All";

        $scope.ProjectswithCodes = ActiveAccounts;

        //Filter on Name
        $scope.change = function (name,type) {
                $scope.ProjectswithCodes = [];
            console.log($scope.ProjectswithCodes);
            ActiveAccounts.forEach(function (project) {
                if ((project.Account == name || name=="All") && ( type == "All" || project.Catagory == type)) {
                    $scope.ProjectswithCodes.push(project);
                } 
            });

            console.log($scope.ProjectswithCodes);
           // console.log($scope.ProjectswithCodes);
        }
        //Filter on Type
        $scope.change2 = function (name,type) {
              $scope.ProjectswithCodes = [];
          ActiveAccounts.forEach(function (project) {
            if ((project.Catagory == type || type=="All") && (name=="All" || project.Account == name)) {
              $scope.ProjectswithCodes.push(project);
            } 
          });
         // console.log($scope.ProjectswithCodes);
        }
        

        $scope.checkSelectedProjects = function () {
            var modelNames = [];
            angular.forEach($scope.ProjectswithCodes, function (project) {
                if (project.Selected) {
                    modelNames.push(project.Code);
                }
            });
            console.log($rootScope.allProjectCodes);
            $rootScope.allProjectCodes = modelNames.length ? modelNames.join(', ') : 'No Codes selected!';
         
            console.log($rootScope.allProjectCodes);
            $scope.close();
        }

    }
})();