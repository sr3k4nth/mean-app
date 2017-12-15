	var app = angular.module('myApp', []);
	app.controller('AppCtrl', function($scope, $http){
	var refresh = function() {
  $http.get('/disp').then(function(response) {
    console.log("I got the data I requested");
    $scope.contactlist = response.data;
    $scope.contact = null;
  });
};

refresh();

$scope.addContact = function() {
  console.log($scope.contact);
  $http.post('/sendcontact', $scope.contact).then(function(response) {
    console.log(response.data);
    refresh();
  });
};
// delete contact
$scope.deletecontact = function(id)
{
	console.log("i m deleting an id");
	console.log(id);
	$http.delete('/deletecontact/' + id).then(function(response){
		console.log(response.data);
		refresh();
	});
};
$scope.editcontact = function(id)
{
	console.log("editing from controller");
	console.log(id);
	$http.get('/editcontact/' + id).then(function(response){
		console.log(response.data.name);
		$scope.contact = response.data;

	});
};
$scope.updatecontact = function()
{
	console.log("updating from controller");
	console.log($scope.contact._id);
	$http.put('/updatecontact/' + $scope.contact._id, $scope.contact).then(function(response){
		console.log(response.data.name);
		refresh();
	});
}
});