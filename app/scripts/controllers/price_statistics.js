angular.module('PartyBidApp')
    .controller('PriceStatisticsCtrl', function ($scope,$location) {
        $scope.price_statistics = Price.get_price_signing_up().price_name;
        $scope.sign_up_quantity = 0;
    });
