(function () {
    'use strict';
    //create angularjs controller

    app.controller('ComplienceController', ['$scope', 'toaster', '$mdDialog', '$rootScope', '$http', '$window', '$timeout', ComplienceController]);

    //angularjs controller method


    function ComplienceController($scope, toaster, $mdDialog, $rootScope, $http, $window, $timeout) {
        
        $scope.Trends = true;
        $scope.Projects = false;
       
        ComplienceData();
        function ComplienceData() {
            $http.get('api/CD_ProcessComplienceController/get').success(function (data) {
                console.log(data);
                for (var i = 0; i < (data.length - 1) ; i++) {
                    if (parseFloat(data[i].Rating) > parseFloat(data[i + 1].Rating)) {
                        data[i].Trend = true;
                        
                    } else if (parseFloat(data[i].Rating) == parseFloat(data[i + 1].Rating)) {
                        data[i].isEqual = true;
                    }

                }

                $scope.ProcessComplienceData = data;

                //Rating values
                var MainObject = $scope.ProcessComplienceData.shift();
                //var Rating = CustomerChartObject.Rating;
               // var CustomerTeamSatisficationScore = parseFloat(CustomerRating);
                // var CustomerTScore = 5 - CustomerTeamSatisficationScore;
                $scope.MainObject = MainObject;
                $scope.ShowingYear = MainObject.Year;
                $scope.ShowingQuarter = parseInt(MainObject.Quarter);
                $scope.ShowingHalf = MainObject.Year + "-H" + MainObject.Quarter;
                $scope.Completion = MainObject.Completion;
                var value = parseFloat(MainObject.Rating);

                if(value<0.4){
                    $scope.color = "#e22626";
                }
                else if(value>=0.4 && value<0.8){
                    $scope.color = "#FD9C34";
                } else {
                    $scope.color = "#4edab3";
                }
                if ($scope.ProcessComplienceData.length > 4) {
                    $scope.ProcessComplienceData.pop();
                    $scope.ShowMore = true;
                }
                $scope.finalobject = $scope.ProcessComplienceData.pop();
                ProcessComplienceProjects();
            }).error(function () {
                $scope.error = "An Error has occured while loading posts!";
            });

        }

        function ProcessComplienceProjects() {
            $http.get('api/CD_ProcessComplienceController/getProjects/' + $scope.ShowingYear + '/' + $scope.ShowingQuarter).success(function (data) {
                console.log(data);
                $scope.ProcessComplienceProjects = data;
                $scope.NumberofProjects = data.length;
                //console.log("dsadasdasds"+data.length);
            }).error(function () {
                console.log("ERRORRRR");
                $scope.error = "An Error has occured while loading posts!";
            })
        }

        //Tab view 
        $scope.isTrends = function () {
            $scope.Trends = true;
            $scope.Projects = false;

        }
        $scope.isProjects = function () {
            $scope.Trends = false;
            $scope.Projects = true;
        }
    }
})();
