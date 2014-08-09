angular.module('PartyBidApp')
    .controller('PriceSignUpCtrl', function ($scope, $location) {
        price_signing_up_init();
        var current_price = Price.get_current_price();
        var price = new Price(current_price.price_name,current_price.activity_name);

        $scope.price_sign_up = current_price.price_name;

        $scope.end_price_sign_up = function() {
            if(confirm("你确定要结束本次竞价吗？")) {
                price.change_price_state("end");
                price.fresh_price_state();
            }
        };

        $scope.is_the_price_sign_up_ended = Price.get_current_price().price_state == "end";




    });
