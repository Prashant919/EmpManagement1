// Code goes here
app= angular.module("MyApp", ['ngDialog']);
app.controller("Main", Main).directive("myDirective", myDirective).controller("Card", Card);

function Card($scope, ngDialog, dataService){
  $scope.employee={};
    $scope.save=function(){
    console.log("save function called");
    $scope.employee.id=$scope.e1;$scope.employee.fn=$scope.e2;$scope.employee.ln=$scope.e3;
    $scope.employee.lo=$scope.e4;$scope.employee.po=$scope.e5;$scope.employee.ge=$scope.e6;

    dataService.employees.push($scope.employee);
   
    console.log($scope.employee);
    console.log( dataService.employees);
    ngDialog.close("ngdialog1");
   
  };
}

function Main($scope, ngDialog, dataService) {
  $scope.showDirective = true;
  $scope.cardview=true;
  
  $scope.employees = dataService.employees;
  
  $scope.$watch(function() { return dataService.employees }, function() {
      $scope.employees = dataService.employees;
    });
  
  $scope.toggleView=function(){$scope.cardview=!$scope.cardview;};
   
  $scope.clickme = function() {
    
   //Here Template.html is a directive which has test as its controller, data tag is where we pass the data which in this case can be cdngName
	  ngDialog.open({ template: 'template.html',controller: 'Card', className: 'ngdialog-theme-default', data:$scope.obj});
		
  };
  $scope.deletecard = function(position){
    dataService.employees.splice(position,1);
  };
  
  $scope.emp = dataService.emp;
  $scope.$watch(function() { return dataService.emp }, function() {
  $scope.emp = dataService.emp;
  });
  $scope.update=function(pos){
    dataService.emp=dataService.employees[pos];
   //Here Template.html is a directive which has test as its controller, data tag is where we pass the data which in this case can be cdngName
	  ngDialog.open({ template: 'update.html',controller: 'Main', className: 'ngdialog-theme-default', data:$scope.emp});
    }
  $scope.updateEmp=function(){
    ngDialog.close("ngdialog1");
    dataService.employees[$index].id=$scope.emp.id;
     dataService.employees[$index].fn=$scope.emp.fn;
     
  };
}

function myDirective() {

  return {
    restrict: "EA",
    replace: true,
    templateUrl: "template.html",
    scope:{
      abc : "=showtext"
    },
    controller: test,
    link: function(scope, elem, attr){
      console.log(scope);
      console.log(elem);
      console.log(attr);
      console.log(scope.abc);
     
    }
  }
}

angular.module("MyApp").directive("outerDirective", outerDirective);
function outerDirective(){
   return {
    restrict: "E",
    replace: true,
    transclude: true,
    templateUrl: "outerdirective.html",
    scope:{
      xyz:"="
    }
  }
}

app.service('dataService', function() {
     var dataObj = {};

    dataObj.employees=[{id:'pnigam',fn:'prashant',ln:'nigam',lo:'aaa',po:'dev',ge:'male'},
      {id:'ssingh',fn:'sana',ln:'singh',lo:'aaa',po:'dev',ge:'female'}];
  dataObj.emp={};
    return dataObj;
});