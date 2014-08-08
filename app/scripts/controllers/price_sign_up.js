angular.module('PartyBidApp')
    .controller('PriceSignUpCtrl', function ($scope, $location) {
        price_signing_up_init();
        $scope.price_sign_up = Price.get_current_price().price_name;




    });
