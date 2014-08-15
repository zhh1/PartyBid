function Activity(name) {
    this.activity_name = name;
    this.state = "start";
};

Activity.set_activities = function(activities) {
    localStorage['activities'] = JSON.stringify(activities);
};

Activity.get_activities = function() {
    return JSON.parse(localStorage.getItem("activities"));
};

Activity.set_current_activity = function(activity) {
    localStorage['current_activity'] = JSON.stringify(activity);
};

Activity.get_current_activity = function() {
    var current_activity = JSON.parse(localStorage.getItem("current_activity"));
    var activity = new Activity(current_activity.activity_name);
    activity.state = current_activity.state;
    return activity;
};

Activity.set_signing_up_activity = function(activity) {
    localStorage['signing_up'] = JSON.stringify(activity);
};

Activity.get_signing_up_activity = function() {
    return JSON.parse(localStorage.getItem("signing_up"));
};

Activity.judge_start_or_end_state = function() {
    var activities = Activity.get_activities();
    return _.some(activities,function(item) {
        return item.state == "end";
    });
};

Activity.button_disabled = function(n,activity,signing_up) {
    if(!signing_up) {
        return n && activity.state=="start";
    }
    else {
        return (n && activity.state=="start") || signing_up.price_state == "start";
    }
};

Activity.judge_yellow = function(activity) {
    if(activity.state == "end") {
        return "start";
    }
};

Activity.judge_yellow_when_price_signing_up = function(activity,price_signing_up) {
    if(activity.state == "end" || (price_signing_up.price_state == "start" && price_signing_up.activity_name == activity.activity_name)) {
        return "start";
    }
};

Activity.prototype.save = function() {
    var activities = Activity.get_activities();
    activities.unshift(this);
    Activity.set_activities(activities);
};

Activity.prototype.is_repeat = function() {
    var activities = Activity.get_activities();
    return _.some(activities,function (item) {
        return item.activity_name == this.activity_name}, this);
};

Activity.prototype.fresh_activity_state = function() {
    var activities = Activity.get_activities();
    _.findWhere(activities,{activity_name:this.activity_name}).state = this.state;
    Activity.set_activities(activities);
    Activity.set_current_activity(this);
};

Activity.prototype.change_state = function(new_state) {
    this.state = new_state;
};

