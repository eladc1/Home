/**
 * expenses Controller
 */

angular
    .module('RDash')
    .controller('expensesCtrl', ['$scope', '$http', ExpensesCtrl])
    //TODO move to filters!
    .filter('dateToISO', function() {
        return function(input) {
            return new Date(input).toISOString();
        };
    }).filter('sumByColumn', function () {
        return function (collection, column) {
            var total = 0;

            collection.forEach(function (item) {
                total += parseInt(item[column]);
            });

            return total;
        };
    });

function ExpensesCtrl($scope, $http) {
    $scope.expenses = [];

    $http.get(`${location.origin}/api/1.0/expenses`).then( function (result) {
        $scope.expenses = result.data;
    });

    var exForm = {
        sortType    :  'date', // set the default sort type
        sortReverse : true,  // set the default sort order
        search : {
            category : '',
            what     : ''
        }
    };

    $scope.exForm = exForm;
}