angular.module('PartyBidApp')
    .controller('PriceListCtrl', function ($scope, $location) {
        prices_init();
        current_price_init();
        $scope.create_price_competition = function() {
            var n = Price.get_prices().length + 1;
            var price_competition = new Price("竞价" + n,Activity.get_current_activity().activity_name);
            price_competition.save();
            Price.set_current_price(price_competition);
            Price.set_price_signing_up(price_competition);
            $location.path('/price_sign_up');

        };

        $scope.prices = Price.get_price_of_current_activity();

        $scope.go_to_price_sign_up = function(price) {
            Price.set_current_price(price);
            $location.path('/price_sign_up');
        };

        $scope.is_there_any_price_competing = Price.get_price_signing_up().price_state == "start";

        $scope.price_yellow = function(price) {
            if(Price.get_price_signing_up().price_state == "start" && Price.get_price_signing_up().price_name == price.price_name) {
                return "start";
            };
        };
















    });
