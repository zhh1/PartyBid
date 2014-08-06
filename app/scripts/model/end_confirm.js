function end_confirm(a,current_activity) {
  if(confirm("你确定结束报名吗？")) {
      a = "开始";
      current_activity.change_state(0);
      current_activity.fresh_activity_state();
      var signing_up = Activity.get_current_activity();
      Activity.set_signing_up_activity(signing_up);
  }
};
