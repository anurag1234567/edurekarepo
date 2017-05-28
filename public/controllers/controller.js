var myApp = angular.module('myApp', []);
myApp.controller('AppController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

  var refresh = function(){
$http.get('/employeelist').then(successCallback).catch(errorCallback);

function successCallback(response){
    console.log("I got the data I requested");
	$scope.employeelist = response.data;
    for(var i = 0 ; i < $scope.employeelist.length; i++){
		$scope.employeelist[i].age = new Date().getFullYear() - new Date($scope.employeelist[i].dateofbirth).getFullYear();
	}
}
function errorCallback(error){
    console.log("I did not get the data I requested");
    console.log(error);
}
};
refresh();
  $scope.addEmployee = function(){
	console.log($scope.employee);
	$http.post('/employeelist', $scope.employee).then(successCallback).catch(errorCallback);

function successCallback(response){
    console.log(response.data);
}
function errorCallback(error){
    console.log(error);
}
refresh();
$scope.employee={};
};

   $scope.remove = function(id){
console.log(id);
$http.delete('/employeelist/'+ id).then(successCallback).catch(errorCallback);
      function successCallback(response){
    console.log(response.data);
    refresh();
}
function errorCallback(error){
    console.log(error);
}
$scope.employee={};
   }; 

  $scope.edit = function(id){
console.log(id);
$http.get('/employeelist/'+ id).then(successCallback).catch(errorCallback);
      function successCallback(response){
          $scope.employee = response.data;
    console.log(response.data);
   
}
function errorCallback(error){
    console.log(error);
}

   };

$scope.update = function(){
	console.log($scope.employee._id);
	$http.put('/employeelist/' + $scope.employee._id, $scope.employee).then(successCallback).catch(errorCallback);
	function successCallback(response){
		refresh();
		$scope.employee={};
	}
	function errorCallback(error){
	    console.log(error);
	}
};

  
}]);
 