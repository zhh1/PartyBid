function MessageProcessUtil(json_message) {
    var result         = json_message.messages[0].message.replace(/\s/g,"");
    this.message       = result;
    this.name_or_price = result.substring(2);
    this.phone         = json_message.messages[0].phone;
}

MessageProcessUtil.process_price_phone_is_repeat = function(person_phone,name_or_price) {
    if(PriceMessages.is_price_phone_repeat(person_phone,Price.get_price_signing_up())) {
        var person_name = Message.find_person_name(person_phone);
        var price_message = new PriceMessages(Price.get_price_signing_up().activity_name,Price.get_price_signing_up().price_name,person_name,person_phone,name_or_price);
        price_message.save();
        Message.refresh_sign_up_info("#price");
        return "恭喜！竞价成功";
    }
    return "对不起,您已经竞价过了，请不要重复竞价";
};

MessageProcessUtil.prototype.process_sign_up_message = function() {
    if (Message.judge_phone_number(this.phone,Activity.get_signing_up_activity())){
        var new_message = new Message(Activity.get_signing_up_activity(), this.name_or_price, this.phone);
        new_message.save();
        Message.refresh_sign_up_info("#register");
        return '恭喜！报名成功';
    }
    return '对不起，您已经报名过了';
};

MessageProcessUtil.prototype.process_price_message = function() {
    var name_or_price = this.name_or_price;
    var person_phone = this.phone;
    if(PriceMessages.is_someone_sign_up_succeed(person_phone)) {
        return MessageProcessUtil.process_price_phone_is_repeat(person_phone,name_or_price);
    }
    return "对不起，您没有报名,不能参与竞价";
};




