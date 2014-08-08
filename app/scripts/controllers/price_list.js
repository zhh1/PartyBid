angular.module('PartyBidApp')
    .controller('PriceListCtrl', function ($scope, $location) {
        prices_init();
        $scope.create_price_competition = function() {
            var n = Price.charge_price_competition_number();
            var price_competition = new Price(++n);
            price_competition.save();
            $location.path('/price_sign_up');

        };

//        $scope.is_there_any_price_competing = a;















    });
