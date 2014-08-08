function Price(price_competition_number) {
    this.price_competition_name="竞价" + price_competition_number;
    this.price_competition_state="start";
};

Price.set_price = function(price) {
    localStorage['prices'] = JSON.stringify(price);
};

Price.get_prices = function() {
    return JSON.parse(localStorage.getItem("prices"));
};

Price.charge_price_competition_number = function() {
    return Price.get_prices().length;
};

Price.prototype.save = function() {
    var prices = Price.get_prices();
    prices.push(this);
    Price.set_price(prices);
};



