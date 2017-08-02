(function () {
    'use strict';
    //create angularjs controller

    app.controller('CDBController', ['$scope', 'toaster', '$mdDialog', '$rootScope', '$http', '$window', '$timeout', CDBController]);

    //angularjs controller method


    function CDBController($scope, toaster, $mdDialog, $rootScope, $http, $window, $timeout) {

        isAuthorized();
        TeamSatisfactionData();
        CustomerSatisfactionData();
       

        $scope.Trends = true;
        $scope.Projects = false;
        $scope.CustomerTrends = true;
        $scope.CustomerProjects = false;
        $scope.TeamShowMore = false;
        $scope.CustomerShowMore = false;

        $scope.options = {
            percentageInnerCutout: 80,
            animation: true
        };
        $scope.lowColour = ['#e22626', '#e47474'];
        $scope.mediumColour = ['#FD9C34', '#FDC52A'];
        $scope.highColour = ['#4edab3', '#8accb9'];

        //Chart TeamSatisfaction
        function TeamSatisfactionData() {
            $http.get('api/CD_TeamSatisfactionController/get').success(function (data) {
                for (var i = 0; i < (data.length-1); i++) {
                    if (parseFloat(data[i].Rating) >= parseFloat(data[i + 1].Rating)) {
                        data[i].Trend = true;
                    }
                }
               
                $scope.selectedSummary = data;
                console.log($scope.selectedSummary);

                //Rating values
                var ChartObject = $scope.selectedSummary.shift();
                $scope.TeamYear = ChartObject.Year;
                $scope.TeamQuarter = parseInt(ChartObject.Quarter[1]);
                var Rating = ChartObject.Rating;
                var TeamSatisficationScore = parseFloat(Rating);
                var TScore = 10 - TeamSatisficationScore;

                if ($scope.selectedSummary.length > 5) {
                    $scope.selectedSummary.pop();
                    $scope.TeamShowMore = true;
                }

                //Data for Team Satisfaction
                $scope.ChartObject = ChartObject;
                $scope.labels = ["Score", "Score"];
                $scope.data = [TeamSatisficationScore, TScore];
                $scope.chartTime = ChartObject.Year + "-" + ChartObject.Quarter;

                //color code
                if (0 < Rating && Rating < 5) {
                    $scope.colors = $scope.lowColour;
                } else if (5 <= Rating && Rating < 8) {
                    $scope.colors = $scope.mediumColour;
                } else {
                    $scope.colors = $scope.highColour;
                }
                TeamSatisfactionProjects();
            }).error(function () {
                $scope.error = "An Error has occured while loading posts!";

            });
           
        }
        //Getting project satisfactions
        function TeamSatisfactionProjects() {
            $http.get('api/CD_TeamSatisfactionController/getProjects/' + $scope.TeamYear + '/' + $scope.TeamQuarter).success(function (data) {
                console.log(data);
                $scope.TeamSatisfactionProjects = data;
            }).error(function () {
                console.log("ERRORRRR");
                $scope.error = "An Error has occured while loading posts!";
            })
        }
        //Tab view of Team Satisfaction
        $scope.isTrends = function () {
            $scope.Trends = true;
            $scope.Projects = false;

        }
        $scope.isProjects = function () {
            $scope.Trends = false;
            $scope.Projects = true;
        }

        //Chart Customer
        function CustomerSatisfactionData() {
            $http.get('api/CD_CustomerSatisfactionController/get').success(function (data) {
                console.log(data);

                for (var i = 0; i < (data.length - 1) ; i++) {
                    if (parseFloat(data[i].Rating) >= parseFloat(data[i + 1].Rating)) {
                        data[i].Trend = true;
                    }
                }

                $scope.selectedCustomerSummary = data;

                console.log($scope.selectedCustomerSummary);

                //Rating values
                var CustomerChartObject = $scope.selectedCustomerSummary.shift();
                var CustomerRating = CustomerChartObject.Rating;
                var CustomerTeamSatisficationScore = parseFloat(CustomerRating);
                var CustomerTScore = 5 - CustomerTeamSatisficationScore;
                $scope.CustomerYear = CustomerChartObject.Year;
                $scope.CustomerQuarter = parseInt(CustomerChartObject.Quarter[1]);

                if ($scope.selectedCustomerSummary.length > 5) {
                    $scope.selectedCustomerSummary.pop();
                    $scope.CustomerShowMore = true;
                }
                //Data for Team Satisfaction
                $scope.CustomerChartObject = CustomerChartObject;
                $scope.Customerlabels = ["Score", "Score"];
                $scope.Customerdata = [CustomerTeamSatisficationScore, CustomerTScore];
                $scope.CustomerchartTime = CustomerChartObject.Year + "-" + CustomerChartObject.Quarter;
                console.log($scope.CustomerChartObject);

                //color code
                if (0 < CustomerRating && CustomerRating < 3) {
                    $scope.Customercolors = $scope.lowColour;
                } else if (3 <= CustomerRating && CustomerRating < 4) {
                    $scope.Customercolors = $scope.mediumColour;
                } else {
                    $scope.Customercolors = $scope.highColour;
                }

                CustomerSatisfactionProjects()
            }).error(function () {
                $scope.error = "An Error has occured while loading posts!";

            });

        }
        //Getting project satisfactions
        function CustomerSatisfactionProjects() {
            $http.get('api/CD_CustomerSatisfactionController/getProjects/' + $scope.CustomerYear + '/' + $scope.CustomerQuarter).success(function (data) {
                console.log(data);
                $scope.CustomerSatisfactionProjects = data;
            }).error(function () {
                console.log("ERRORRRR");
                $scope.error = "An Error has occured while loading posts!";
            })
        }
     
        //Tab view of Customer Satisfaction
        $scope.isCustomerTrends = function () {
            $scope.CustomerTrends = true;
            $scope.CustomerProjects = false;

        }
        $scope.isCustomerProjects = function () {
            $scope.CustomerTrends = false;
            $scope.CustomerProjects = true;
        }

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
                console.log($scope.isAdmin);
                
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
