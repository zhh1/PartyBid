angular.module('PartyBidApp')
    .controller('PriceStatisticsCtrl', function ($scope) {
        $scope.price_statistics = Price.get_price_signing_up().price_name;
        $scope.sign_up_quantity = PriceMessages.get_current_price_messages(Price.get_price_signing_up()).length;
        $scope.price_messages = PriceMessages.change_to_price_array();
        $scope.price_results = PriceMessages.result_display("price_statistics");
    });
