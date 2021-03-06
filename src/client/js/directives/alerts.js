/**
 * Alerts Directive
 * @see http://tobiasahlin.com/spinkit/
 */

homeApp.directive('alerts', alerts);

function alerts() {
    var directive = {
        restrict: 'E',
        template: `<div class="row alerts-container" data-ng-show="alerts.length">
                        <div class="col-xs-12">
                            <uib-alert data-ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</uib-alert>
                        </div>
                    </div>`,
        controller: 'AlertsCtrl'
    };
    return directive;
};