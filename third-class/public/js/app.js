var app = angular.module('sampleApp',[]);

app.controller('postsController', ['$scope', function($scope) {
    $scope.title = 'Devspark Test App';
    $scope.data = [];

    $scope.addText = function() {
        $scope.data.push({
            text : $scope.inputText,
            score:0
        });
        $scope.inputText = '';
    };

    $scope.removeText = function(dataInput) {
        $scope.data.splice($scope.data.indexOf(dataInput),1);
    };

    $scope.increaseScore = function(dataInput) {
        dataInput.score++;
    };

    $scope.decreaseScore = function(dataInput) {
        if (dataInput.score > 0) {
            dataInput.score--;
        }
    };

}]);
