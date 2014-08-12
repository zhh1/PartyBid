function PriceMessages(activity_name,price_name,person_name,phone,price) {
    this.activity_name = activity_name;
    this.price_name = price_name;
    this.person_name = person_name;
    this.phone = phone;
    this.price = price;
};

PriceMessages.set_price_messages = function(price_messages) {
    localStorage['price_messages'] = JSON.stringify(price_messages);
};

PriceMessages.get_price_messages = function() {
    return JSON.parse(localStorage.getItem("price_messages"));
};

PriceMessages.is_someone_sign_up_succeed = function(person_phone) {
    var current_activity_messages = Message.get_current_activity_messages(Price.get_price_signing_up());
    for(var i = 0;i < current_activity_messages.length;i++) {
        if(current_activity_messages[i].phone == person_phone) {
            return true;
        }
    }
    return false;
};

PriceMessages.get_current_price_messages = function(price) {
    var current_price_messages = [];
    for(var i = 0;i < PriceMessages.get_price_messages().length;i++) {
        if(PriceMessages.get_price_messages()[i].activity_name == price.activity_name && PriceMessages.get_price_messages()[i].price_name == price.price_name) {
            current_price_messages.push(PriceMessages.get_price_messages()[i]);
        }
    }
    return current_price_messages;
};

PriceMessages.is_price_phone_repeat = function(person_phone,price) {
    for(var i = 0;i< PriceMessages.get_current_price_messages(price).length;i++) {
        if(PriceMessages.get_current_price_messages(price)[i].phone == person_phone) {
            return false;
        }
    }
    return true;
};

PriceMessages.prototype.save = function() {
    var price_messages = PriceMessages.get_price_messages();
    price_messages.push(this);
    PriceMessages.set_price_messages(price_messages);
};
