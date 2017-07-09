(function () {
  'use strict';
  app.controller('teamSatisfactionSurveyEmailController', ['$scope', 'toaster', '$mdDialog', '$window', '$rootScope', '$modal', '$http', '$stateParams', '$filter','blockUI', teamSatisfactionSurveyEmailController]);

  //angularjs controller method
  function teamSatisfactionSurveyEmailController($scope, toaster, $mdDialog, $window, $rootScope, $modal, $http, $stateParams, $filter, blockUI) {
    $scope.deadLine = new Date();
    $scope.selectedEmpoyeesForSurvey = [];
    $scope.yearArray = [];
    $scope.allEmployees = [];
    loadactiveAccounts();
    loadYearArray();

    function loadactiveAccounts() {
      $http.get('api/Account/adminPanelActiveAccounts').success(function (data) {
        $scope.activeAccounts = data;
        if (data.length != 0) {
          $scope.selectedAccount = angular.toJson($scope.activeAccounts[0]);
          loadAllEmployeesForSelectedAccount($scope.activeAccounts[0].Id);
        }
      }).error(function () {
        $scope.error = "An Error has occured while loading posts!";
      });
    }

    //Fill yearArray (yearCombo data)
    function loadYearArray() {
      var currentYear = new Date().getFullYear();
      for (var k = 2008; k <= currentYear; k++) {
        $scope.yearArray.push(k);
      }
    }


    function loadAllEmployeesForSelectedAccount(selectedAccount) {
      //api/EmployeeProjects/getAllEmployessForSelectedAccount/{accountId}
      $http.get('api/EmployeeProjects/getAllEmployessForSelectedAccount/' + selectedAccount).success(function (data) {
        $scope.allEmployees = data;
      }).error(function () {
        $scope.error = "An Error has occured while loading posts!";
      });
    }

    $scope.accountComboChange = function () {
      $scope.allEmployees = [];
      $scope.selectedEmpoyeesForSurvey = [];
      const selecedAccount = JSON.parse($scope.selectedAccount)
      loadAllEmployeesForSelectedAccount(selecedAccount.Id);
    }

    $scope.sendSurveyEmail = function (ev) {
      console.log($scope.selectedEmpoyeesForSurvey);
      $scope.validEmployeesForSurveyEmail = [];
      angular.forEach($scope.selectedEmpoyeesForSurvey, (value, key) => {
        if (value) {
          $scope.validEmployeesForSurveyEmail.push(key);
        }

      });
      if ($scope.validEmployeesForSurveyEmail.length != 0) {
        console.log($scope.validEmployeesForSurveyEmail);
        $mdDialog.show(createConfirmDialog('Team Satisfaction Survey Email Sender', 'Are you sure to send survey emails for the selected employees ?', ev)).then(function () {
          sendSurveyEmail($scope.validEmployeesForSurveyEmail);
        }, function () {

        });

      } else {
        toaster.pop('warning', "Notificaton", "No Employess found to send survey email");
      }

    }

    function createConfirmDialog(title, content, ev) {
      var confirm = $mdDialog.confirm()
      .title(title)
      .textContent(content)
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('Yes')
      .cancel('No');
      return confirm;
    }

    function sendSurveyEmail(selectedEmployeesToSendSurveyEmail) {
      var formattedDeadLine = $filter('date')($scope.deadLine, "yyyy-MM-dd");
      console.log(formattedDeadLine);
      const requestObject = { Account: JSON.parse($scope.selectedAccount), Year: $scope.selectedYear, Quarter: $scope.selectedQuarter, DeadLine: formattedDeadLine, ValidEmployees: selectedEmployeesToSendSurveyEmail }
      console.log(requestObject);
      //api/EmailSender/sendSurveyEmail
      blockUI.start();
      $http.post('api/EmailSender/sendSurveyEmail', requestObject).success(function (data) {
        blockUI.stop();
        toaster.pop('success', "Notificaton", "Team Satisfaction Survey emails sent successfully");
      }).error(function (error) {
        $window.location.href = '#/error';
        //toaster.pop('warning', "Notificaton", error);
        $scope.error = "An Error has occured while loading posts!";
      });
    }

  }
})();
