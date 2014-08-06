function Message(activity,name,phone){     //定义一个Message对象，包含activity,name,phone三个属性
    this.activity=activity.name;
    this.name=name;
    this.phone=phone;
};

Message.set_messages = function(messages) {
    localStorage['messages'] = JSON.stringify(messages);
};

Message.get_messages = function() {
    return JSON.parse(localStorage.getItem("messages") || '[]');
};

Message.get_current_messages = function(activity) {
    var current_message = [];
    var all_messages = Message.get_messages();
    for(var i = 0;i<all_messages.length;i++) {
       if (all_messages[i].activity == activity.name) {
          current_message.push(all_messages[i]);   //将当前活动的信息提取出来
       }
    }
    return current_message;
};
