/**
 * icon Card Controller
 */
angular
    .module('RDash')
    .controller('iconCard-ctrl', ['$scope', '$http', IconCardCtrl]);

function IconCardCtrl($scope, $http) {
    var currentYear  = new Date().getFullYear();
    var currentMonth = new Date().getMonth() + 1;

    //current month
    $http.get(`${location.origin}/api/1.0/expenses/month`).then( function (result) {
        var thisMonthExpenses = result.data;
        $scope.cards[0].number =  sumWithoutTzdaka(thisMonthExpenses);
    });

    //this month last year
    $http.get(`${location.origin}/api/1.0/expenses/month/${currentMonth}/${ ( currentYear - 1 )}`).then( function (result) {
        var thisMonthExpenses = result.data;
        $scope.cards[1].number =  sumWithoutTzdaka(thisMonthExpenses);
    });

    //last month
    $http.get(`${location.origin}/api/1.0/expenses/month/${ ( currentMonth -1 )}`).then( function (result) {
        var lastMonthExpenses = result.data;
        $scope.cards[2].number = sumWithoutTzdaka(lastMonthExpenses);
    });

    $http.get(`${location.origin}/api/1.0/incomes/month`).then( function (result) {
        var thisMonthIncomes = result.data;
        $scope.cards[3].number =  sumWithoutTzdaka(thisMonthIncomes);
    });
    
    function sumWithoutTzdaka(data) {
        data = data.filter( x => x.category != 'צדקה');
        return data.reduce(function( sum , x ) {
            return x.how_much + sum;
        }, 0);
    }


    $scope.cards= [
        {
            icon    :   'fa-credit-card-alt',
            color   :   'red',
            text    :   'הוצאות החודש',
            number  :   0

        },{
            icon    :   'fa-random',
            color   :   'blue',
            text    :   'החודש הזה שנה שעברה',
            number  :    0
        },{

            icon    :   'fa-credit-card',
            color   :   'orange',
            text    :   'הוצאות החודש הקודם',
            number  :   0
        },{
            icon    :   'fa-ils',
            color   :   'green',
            text    :  'הכנסות',
            number  :   0
        }
    ];

    var expenses = [];

    $http.get(`${location.origin}/api/1.0/expenses`).then( function (result) {
        expenses = result.data;
    });

}