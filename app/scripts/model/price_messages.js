function PriceMessages(activity_name,price_name,person_name,phone,price) {
    this.activity_name = activity_name;
    this.price_name = price_name;
    this.person_name = person_name;
    this.phone = phone;
    this.price = price;
}

PriceMessages.set_price_messages = function(price_messages) {
    localStorage['price_messages'] = JSON.stringify(price_messages);
};

PriceMessages.get_price_messages = function() {
    return JSON.parse(localStorage.getItem("price_messages"));
};

PriceMessages.is_someone_sign_up_succeed = function(person_phone) {
    var current_activity_messages = Message.get_current_activity_messages(Price.get_price_signing_up());
    return _.some(current_activity_messages,function(item) {
        return item.phone == person_phone;
    });
};

PriceMessages.get_current_price_messages = function(price) {
    var price_messages = PriceMessages.get_price_messages();
    return _.where(price_messages,{activity_name:price.activity_name,price_name:price.price_name});
};

PriceMessages.is_price_phone_repeat = function(person_phone,price) {
    var current_price_messages = PriceMessages.get_current_price_messages(price);
    return !_.some(current_price_messages,function(item) {
        return item.phone == person_phone;
    });
};

PriceMessages.sort_price = function() {
    var current_price_messages = PriceMessages.get_current_price_messages(Price.get_price_signing_up());
    if(current_price_messages) {
        return _.sortBy(current_price_messages,function(item) {
            return parseInt(item.price);
        }) || [];
    }
};

PriceMessages.statistics_price = function() {
    var current_price_messages = PriceMessages.get_current_price_messages(Price.get_price_signing_up());
    return _.groupBy(current_price_messages,function(message) {
        return message.price;
    });
};

PriceMessages.change_to_price_array = function() {
    var price_array = [];
    _.map(PriceMessages.statistics_price(),function(value,key) {
        price_array.push({"price":key,"number":value.length});
    });
    return price_array;
};

PriceMessages.get_result = function() {
    var result = _.findWhere(PriceMessages.change_to_price_array(),{number:1});
    if(result !== undefined) {
        return _.findWhere(PriceMessages.sort_price(),{price:result.price});
    }
};

PriceMessages.result_display = function(state) {
    var result = '对不起，竞价失败，找不到最低且不重复的竞价';
    if(PriceMessages.get_current_price_messages(Price.get_price_signing_up()).length && PriceMessages.get_result()!==undefined) {
        var which_info_is_displayed = {
            "price_statistics" :function() {
                result = PriceMessages.get_result().person_name + ' ￥' +PriceMessages.get_result().price + ' ' + PriceMessages.get_result().phone;
            },
            "price_result" : function() {
                result = "竞价成功";
            }
        };
        which_info_is_displayed[state] ();
    }
    return result;
};

PriceMessages.prototype.save = function() {
    var price_messages = PriceMessages.get_price_messages();
    price_messages.push(this);
    PriceMessages.set_price_messages(price_messages);
};
