(function () {
    'use strict';
    //create angularjs controller

    app.controller('NPSController', ['$scope', 'toaster', '$mdDialog', '$rootScope', '$http', '$window', '$timeout', NPSController]);

    //angularjs controller method


    function NPSController($scope, toaster, $mdDialog, $rootScope, $http, $window, $timeout) {

        $scope.Trends = true;
        $scope.Projects = false;

        $scope.lowColour = '#e22626';
        $scope.mediumColour = '#FD9C34';
        $scope.highColour = '#4edab3';
        $scope.backgroundcolor = '#e2dede';


        getNPSData();

       
        function getNPSData() {
            $http.get('api/CD_NPSController/get').success(function (data) {
                console.log(data);
                for (var i = 0; i < (data.length - 1) ; i++) {
                    if (parseFloat(data[i].Rating) > parseFloat(data[i + 1].Rating)) {
                        data[i].Trend = true;
                    } else if (parseFloat(data[i].Rating) == parseFloat(data[i + 1].Rating)) {
                        data[i].isEqual = true;
                    }
                }
                    $scope.NPSData = data;

                    //Rating values
                    var MainObject = $scope.NPSData.shift();
                    var Rating = MainObject.Rating;
                    var NPS = parseFloat(Rating);
                    $scope.value = NPS.toString();
                    console.log($scope.value);

                    if (NPS < 4) {
                        $scope.color = $scope.lowColour;
                    }else if(NPS >= 4 && NPS < 8){
                        $scope.color = $scope.mediumColour;
                    } else {
                        $scope.color = $scope.highColour;
                    }
                    // var CustomerTScore = 5 - CustomerTeamSatisficationScore;
                    $scope.MainObject = MainObject;
                    $scope.ShowingYear = MainObject.Year;
                    $scope.ShowingQuarter = parseInt(MainObject.Quarter);
                    $scope.ShowingHalf = MainObject.Year + "-H" + MainObject.Quarter;
                    $scope.Completion = MainObject.Completion;
                    //console.log(MainObject.Completion);
                    if ($scope.NPSData.length > 4) {
                        $scope.NPSData.pop();
                        $scope.ShowMore = true;
                    }
                    $scope.finalobject = $scope.NPSData.pop();
                    NPSProjects();
                }

            ).error(function () {
                console.log("ERRORRRR");
            })
        }
        function NPSProjects() {
            $http.get('api/CD_NPSController/getProjects/' + $scope.ShowingYear + '/' + $scope.ShowingQuarter).success(function (data) {
                console.log(data);
                $scope.NPSProjects = data;
                $scope.NumberofProjects = data.length;
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

        $scope.specHoverOver = function () {
            $scope.hoverValues = $scope.specHover;
        }

        $scope.specHoverLeave = function () {
            $scope.hoverValues = "";

        }
       
    }
})();
