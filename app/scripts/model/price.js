function Price(price_competition_number,activity_name) {
    this.activity_name = activity_name;
    this.price_name="竞价" + price_competition_number;
    this.price_state="start";
};

Price.set_price = function(price) {
    localStorage['prices'] = JSON.stringify(price);
};

Price.get_prices = function() {
    return JSON.parse(localStorage.getItem("prices"));
};

Price.set_current_price = function(current_price) {
    localStorage['current_price'] = JSON.stringify(current_price);
};

Price.get_current_price = function() {
    return JSON.parse(localStorage.getItem("current_price"));
};

Price.set_price_signing_up = function(price_signing_up) {
    localStorage['price_signing_up'] = JSON.stringify(price_signing_up);
};

Price.get_price_signing_up = function() {
    return JSON.parse(localStorage.getItem("price_signing_up"));
};

Price.charge_price_competition_number = function() {
    return Price.get_prices().length;
};

Price.prototype.save = function() {
    var prices = Price.get_prices();
    prices.unshift(this);
    Price.set_price(prices);
};



