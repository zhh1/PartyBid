angular.module('PartyBidApp')
    .controller('PriceListCtrl', function ($scope, $location) {
        Init.prices_init();
        Init.current_price_init();
        $scope.create_price_competition = function() {
            Price.create_price();
            $location.path('/price_sign_up');
        };

        $scope.prices = Price.get_price_of_current_activity();

        $scope.go_to_price_sign_up = function(price) {
            Price.set_current_price(price);
            $location.path('/price_sign_up');
        };

        $scope.is_there_any_price_competing = Price.get_price_signing_up().price_state == "start"
                                                || Activity.get_signing_up_activity().state == "end"
                                                || !Message.get_current_activity_messages(Activity.get_current_activity()).length;

        $scope.price_yellow = function(price) {
            if(Price.get_price_signing_up().price_state == "start"
                && Price.get_price_signing_up().price_name == price.price_name
                && Price.get_price_signing_up().activity_name == price.activity_name) {
                return "start";
            }
        };
    });
