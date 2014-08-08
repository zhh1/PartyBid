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
            .when('/',{
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/activity_list',{
                templateUrl: 'views/activity_list.html',
                controller: 'ActivityListCtrl'
            })
            .when('/create_activity',{
                templateUrl: 'views/create_activity.html',
                controller: 'CreateActivityCtrl'
            })
            .when('/sign_up',{
                templateUrl: 'views/sign_up.html',
                controller: 'SignUpCtrl'

            })
            .when('/price_list',{
                templateUrl: 'views/price_list.html',
                controller: 'PriceListCtrl'

            })
            .when('/price_sign_up',{
                templateUrl: 'views/price_sign_up.html',
                controller: 'PriceSignUpCtrl'

            })
            .otherwise({
                redirectTo: '/activity_list'
            });


    })
