/**
 * expenses Controller
 */

angular
    .module('RDash')
    .controller('expensesCtrl', ['$scope', '$http', '$uibModal', ExpensesCtrl])
    //TODO move to filters!
    .filter('dateToISO', function () {
        return function (input) {
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

function ExpensesCtrl($scope, $http, $uibModal) {
    $scope.expenses = [];

    $scope.exForm = {
        sortType: 'date', // set the default sort type
        sortReverse: true, // set the default sort order
        search: {
            category: '',
            what: ''
        }
    }

    $http.get(`${location.origin}/api/1.0/expenses`).then(function (result) {
        $scope.expenses = result.data;
    });

    $scope.openExpensesModal = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal.html',
            size: 'lg',

            controller: function ($scope) {
                $scope.title = "הוצאה חדשה";
                $scope.categories = ['מזון', 'נסיעות', 'צדקה'];
                $scope.whoList = ['אלעד', 'שפרה', 'בית'];
                $scope.howList = ['אשראי', 'מזומן', 'העברה בנקאית', 'הוראת קבע'];

                $scope.exp = {
                    date: new Date()
                };

                $scope.ok = function () {
                    $http.post(`${location.origin}/api/1.0/expenses`, $scope.exp);
                    alert('ok');
                };
                $scope.cancel = function () {
                    alert('cancel');
                };
            }
        });

        modalInstance;
    }


    $scope.esitExpensesModal = function (item) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal.html',
            size: 'lg',

            controller: function ($scope) {
                $scope.title = "עדכון הוצאה";
                $scope.categories = ['מזון', 'נסיעות', 'צדקה'];
                $scope.whoList = ['אלעד', 'שפרה', 'בית'];
                $scope.howList = ['אשראי', 'מזומן', 'העברה בנקאית', 'הוראת קבע'];

                $scope.exp = {
                    _id: item._id,
                    date: item.date,
                    category: item.category,
                    store: item.store,
                    what: item.what,
                    how_much: item.how_much,
                    who: item.who,
                    how: item.how,
                    constant: item.constant
                };

                $scope.ok = function () {
                    $http.put(`${location.origin}/api/1.0/expenses`, $scope.exp);
                    alert('ok');
                };
                $scope.cancel = function () {
                    alert('cancel');
                };
            }
        });
    };

    $scope.deleteExpensesModal = function (id) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal.html',
            size: 'lg',

            controller: function ($scope) {
                $scope.title = "מחיקת הוצאה";

                $scope.ok = function () {
                    $http.delete(`${location.origin}/api/1.0/expenses/${id}`)
                    .then(function (data) {
                        console.dir(data);
                    }, function (err) {
                        console.dir(err);
                    });
                    console.log('ok');
                };
                $scope.cancel = function () {
                    alert('cancel');
                };
            }
        });
    };


}