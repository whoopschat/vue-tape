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
      icon:  require("../../assets/icon.png"),
      title: "退出登录",
      btnColor: "#FF6666",
      cancelText: "确定",
      confirmText: "确定",
      message: "确认退出当前账号？",
      callback: confirm => {
        alert(confirm);
      }
    });
  }
};
</script>