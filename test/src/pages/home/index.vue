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
      icon: require("../../assets/icon.png"),
      title: "退出登录",
      btnColor: "#FF6666",
      cancelColor: "#919191",
      cancelText: "取消",
      confirmText: [
        {
          text: "理解并同意"
        }
      ],
      message: "确认退出当前账号？",
      callback: confirm => {
        Tape.showToast(
          "确认退出当前账号？确认退出当前账号？确认退出当前账号？确认退出当前账号？"
        );
      }
    });
  }
};
</script>