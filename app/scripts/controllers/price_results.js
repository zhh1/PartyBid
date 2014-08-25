angular.module('PartyBidApp')
    .controller('PriceResultsCtrl', function ($scope,$location) {
        $scope.current_price_results = Price.get_price_signing_up().price_name;
        $scope.sign_up_quantity = PriceMessages.sort_price().length;
        $scope.price_messages = PriceMessages.sort_price();
        $scope.price_results = PriceMessages.sort_price()[0].person_name + ' ￥' +PriceMessages.sort_price()[0].price + ' ' + PriceMessages.sort_price()[0].phone;

    });
