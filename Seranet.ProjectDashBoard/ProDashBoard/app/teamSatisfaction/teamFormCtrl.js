(function () {
  'use strict';
  //create angularjs controller

  app.controller('teamFormController', ['$scope', 'toaster', '$mdDialog', '$rootScope', '$http', '$window', '$stateParams', teamFormController]);

  //angularjs controller method
  function teamFormController($scope, toaster, $mdDialog, $rootScope, $http, $window, $stateParams) {
    $scope.close = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.len = 8;
    $scope.accountChanged = true;
    $scope.te = $rootScope.project;
    isAuthorized();

    //$http.get('api/Account/').success(function (data) {
    //$scope.projects = data;
    //})
    //.error(function () {
    //    $scope.error = "An Error has occured while loading posts!";
    //});

    //Load loggedIn user's accounts
    function loadAccounts() {
      $scope.yearArray = [];
      loadYearArray();
      $scope.quaterArray = [];
      $http.get('api/EmployeeProjects/getEmployeeAccountsgetEmployeeAccountsTeamSatisfaction/' + $scope.employee.Id).success(function (data) {
        $scope.accounts = data;
        $scope.projects = "";

        angular.element(document.getElementById('subBut'))[0].disabled = true;
        initializeFormForInputParameters();
      })
  .error(function () {
    $scope.error = "An Error has occured while loading posts!";

  });
    };

    if ($stateParams.year && $stateParams.year != 0 && $stateParams.quarter && $stateParams.quarter != 0 && $stateParams.accountId && $stateParams.accountId != 0) {
      console.log($stateParams.year + ' ' + $stateParams.quarter + ' ' + $stateParams.accountId + ' ');
      $scope.selectedYearParam = $stateParams.year;
      $scope.selectedAccountParam = $stateParams.accountId;

      $scope.yearCombo = $stateParams.year;
      $scope.accountCombo = $stateParams.accountId;
      //initializeFormForInputParameters();
    }


    function initializeFormForInputParameters() {
      //loadYearArray();
      loadValidQuarters()
      $scope.selectedQuarterParam = $stateParams.quarter;
      $scope.quarterCombo = $stateParams.quarter;
      //$scope.accountChanged = false;
    }

    //Declare account combo change action
    $scope.accountChange = function () {
      $scope.te = $scope.accountCombo.name;
      $scope.accountChanged = false;
      $scope.yearArray = [];
      loadYearArray();
      $scope.quaterArray = [];
      $scope.selectedAccountId = $scope.accountCombo;

      if ($scope.yearCombo) {
        loadValidQuarters();
      }

      //    $http.get('api/EmployeeProjects/getEmployeeAccountProjects/' + $scope.selectedAccountId + '/' + $scope.employee.Id).success(function (data) {
      //        $scope.projects = data;
      //    })
      //.error(function () {
      //    $scope.error = "An Error has occured while loading posts!";

      //});

    }


    $scope.quaterArray = [];

    //Declare year combo change action
    $scope.yearChange = function () {
      loadValidQuarters();
    }

    function loadValidQuarters() {
      $scope.selectedAccountId = $scope.accountCombo;
      $scope.quaterArray = [];
      $http.get('api/TeamSatisfactionEmployeeSummary/getEmployeeSummaryList/' + $scope.employee.Id + '/' + $scope.accountCombo + '/' + $scope.yearCombo).success(function (data) {

        $scope.employeeSummaries = data;
        $scope.quaterArray.push(1);
        $scope.quaterArray.push(2);
        $scope.quaterArray.push(3);
        $scope.quaterArray.push(4);

        for (var x = 0; x < $scope.employeeSummaries.length; x++) {
          $scope.quaterArray.splice(($scope.quaterArray.indexOf($scope.employeeSummaries[x].Quarter)), 1);
        }


      })
  .error(function () {
    $scope.error = "An Error has occured while loading posts!";

  });
    }


    $scope.yearArray = [];

    $scope.rateArray = [];
    $scope.yesArray = [];
    $scope.commentArray = [];
    var currentYear = new Date().getFullYear();

    //Fill yearArray (yearCombo data)
    function loadYearArray() {
      for (var k = 2008; k <= currentYear; k++) {
        $scope.yearArray.push(k);
      }
    }

    //Load quastions
    $http.get('api/Question/').success(function (data) {
      $scope.Questions = data;
    })
    .error(function () {
      $scope.error = "An Error has occured while loading posts!";

    });

    $scope.myFun = function (sendingValue) {
      var sendArr = [];
      for (var x = 1; x <= sendingValue; x++) {
        sendArr.push(x);
      }
      return sendArr;
    }

    //Submit answers and comments (To save them in the database)
    $scope.submitForm = function () {
      $scope.vb = '1x';
      $scope.newResultArray = [];
      $scope.sendingData = "";
      $scope.finalAnswerArray = [];
      for (var y = 0; y < $scope.Questions.length; y++) {
        const answers = { MemberId: $scope.employee.Id, AccountId: $scope.accountCombo, ProjectId: '1', Year: $scope.yearCombo, Quarter: $scope.quarterCombo, QuestionId: $scope.Questions[y].Id, Answer: $scope.rateArray[$scope.Questions[y].Id], Comment: $scope.commentArray[$scope.Questions[y].Id] };
        $scope.sendingData = $scope.sendingData + "~" + $scope.employee.Id + '|' + $scope.accountCombo + '|' + 1 + '|' + $scope.yearCombo + '|' + $scope.quarterCombo + '|' + $scope.Questions[y].Id + '|' + $scope.rateArray[$scope.Questions[y].Id] + '|' + $scope.commentArray[$scope.Questions[y].Id]
        //if (typeof $scope.rateArray[$scope.Questions[y].Id] == "undefined") {
        //    $scope.rateArray[$scope.Questions[y].Id] = -1;
        //}
        $scope.finalAnswerArray.push(answers);
      }


      var sendingData = JSON.stringify($scope.sendingData);

      $http.post('api/results/add', $scope.finalAnswerArray).success(function (data) {
        //alert("survey details saved successfully");
        toaster.pop('success', "Notificaton", "survey details saved successfully");
        $window.location.href = '#/';
      })
            .error(function (error) {
              toaster.pop('warning', "Notificaton", error);
              $scope.error = "an error has occured while loading posts!";

            });

    }

    //check authorization
    function isAuthorized() {
      $http.get('api/Authorization').success(function (data) {
        if (data != null) {
          getEmployee(data);
          $scope.LoggedInUserName = "Hi, Seranet / " + data;

        }


      })
  .error(function () {
    $scope.error = "An Error has occured while loading posts!";

  });
    }



    $scope.employee;
    function getEmployee(username) {
      $http.get('api/TeamMembers/' + username).success(function (data) {
        if (data != 'null') {
          $scope.employee = data;
          $scope.employeeName = data.MemberName;
          loadAccounts();
          $rootScope.userId = data.Id;
        } else {
          $rootScope.userId = 'úndefined';
        }

      })
  .error(function () {
    $scope.error = "An Error has occured while loading posts!";

  });
    }
  }
})();