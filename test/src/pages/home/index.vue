<template>
  <div>
    <h1>vue-tape - home</h1>
    <hr />Hello
  </div>
</template>

<style lang="less" scoped>
@import url("./index.less");
</style>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    Tape.showModal({
      // icon:  require("../../assets/icon.png"),
      title: "无法解绑！若此微信需要绑定其他账号这是一个弹窗",
      btnColor: "#FF6666",
      confirmText: "确定",
      message:
        "此微信是唯一绑定<span style=\"color:#3399ff\">账号</span>，无法解绑！若此微信需要绑定其他账号，请登录其他账号进行绑定！此微信是唯一绑定<span style=\"color:#3399ff\">账号</span>，无法解绑！若此微信需要绑定其他账号，请登录其他账号进行绑定！此微信是唯一绑定<span style=\"color:#3399ff\">账号</span>，无法解绑！若此微信需要绑定其他账号，请登录其他账号进行绑定！此微信是唯一绑定<span style=\"color:#3399ff\">账号</span>，无法解绑！若此微信需要绑定其他账号，请登录其他账号进行绑定！此微信是唯一绑定<span style=\"color:#3399ff\">账号</span>，无法解绑！若此微信需要绑定其他账号，请登录其他账号进行绑定！此微信是唯一绑定<span style=\"color:#3399ff\">账号</span>，无法解绑！若此微信需要绑定其他账号，请登录其他账号进行绑定！此微信是唯一绑定<span style=\"color:#3399ff\">账号</span>，无法解绑！若此微信需要绑定其他账号，请登录其他账号进行绑定！此微信是唯一绑定<span style=\"color:#3399ff\">账号</span>，无法解绑！若此微信需要绑定其他账号，请登录其他账号进行绑定！此微信是唯一绑定<span style=\"color:#3399ff\">账号</span>，无法解绑！若此微信需要绑定其他账号，请登录其他账号进行绑定！"
    });
  }
};
</script>