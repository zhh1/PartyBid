angular.module('PartyBidApp')
    .controller('PriceStatisticsCtrl', function ($scope,$location) {
        $scope.price_statistics = Price.get_price_signing_up().price_name;
        $scope.sign_up_quantity = PriceMessages.get_current_price_messages(Price.get_price_signing_up()).length;
        $scope.price_messages = PriceMessages.change_to_price_array();
        $scope.price_results = PriceMessages.sort_price()[0].person_name + ' ￥' +PriceMessages.sort_price()[0].price + ' ' + PriceMessages.sort_price()[0].phone;
    });
