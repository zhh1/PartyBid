function Price(price_name,activity_name) {
    this.activity_name = activity_name;
    this.price_name = price_name;
    this.price_state = "start";
};

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
    var current_activity_price = [];
    for(var i=0;i<Price.get_prices().length;i++) {
        if(Price.get_prices()[i].activity_name == Activity.get_current_activity().activity_name) {
            current_activity_price.push(Price.get_prices()[i]);
        }
    }
    return current_activity_price;
};

Price.judge_is_price_signing_up = function() {
    if(!Price.get_price_signing_up()) {
        return false;
    }
    else {
        return Price.get_price_signing_up().price_state == "start";
    }
};

Price.prototype.save = function() {
    var prices = Price.get_prices();
    prices.unshift(this);
    Price.set_prices(prices);
};

Price.prototype.fresh_price_state = function() {
    var prices = Price.get_prices();
    for(var i=0;i<prices.length;i++){
        if(prices[i].activity_name == this.activity_name && prices[i].price_name == this.price_name){
            prices[i].price_state = this.price_state;
            Price.set_prices(prices);
        }
    }
    Price.set_current_price(this);
    Price.set_price_signing_up(this);
};

Price.prototype.change_price_state = function(new_state) {
    this.price_state = new_state;
};

