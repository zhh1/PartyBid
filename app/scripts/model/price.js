function Price(price_name,activity_name) {
    this.activity_name = activity_name;
    this.price_name = price_name;
    this.price_state = "start";
}

Price.set_prices = function(price) {
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

Price.get_price_of_current_activity = function() {
    return _.where(Price.get_prices(),{activity_name:Activity.get_current_activity().activity_name});
};

Price.judge_is_price_signing_up = function() {
    return _.some(Price.get_price_signing_up(),function(item) {
        return item == "start";
    });
};

Price.create_price = function() {
    var price_number = Price.get_price_of_current_activity().length + 1;
    var price_competition = new Price("竞价" + price_number,Activity.get_current_activity().activity_name);
    price_competition.save();
    Price.set_current_price(price_competition);
    Price.set_price_signing_up(price_competition);
};

Price.prototype.save = function() {
    var prices = Price.get_prices();
    prices.unshift(this);
    Price.set_prices(prices);
};

Price.prototype.fresh_price_state = function() {
    var prices = Price.get_prices();
    _.each(prices,function(item) {
        if(item.activity_name == this.activity_name && item.price_name == this.price_name) {
            item.price_state = this.price_state;
        }
    },this);
    Price.set_prices(prices);
    Price.set_current_price(this);
    Price.set_price_signing_up(this);
};

Price.prototype.change_price_state = function(new_state) {
    this.price_state = new_state;
};

