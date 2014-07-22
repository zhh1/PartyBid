/**
 * Created by jjq on 14-7-21.
 */
angular
    .module('PartyBidApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/activity_list',{
                templateUrl: 'views/activity_list.html',
                controller: 'ActivityListCtrl'
            })
            .when('/create_activity',{
                templateUrl: 'views/creat_activity.html',
                controller: 'CreatActivityCtrl'
            })
            .when('/sign_up',{
                templateUrl: 'views/sign_up.html',
                controller: 'SignUpCtrl'

            })
            .otherwise({
                redirectTo: '/activity_list'
            });


    })
