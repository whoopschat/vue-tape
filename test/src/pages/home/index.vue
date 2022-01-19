<template>
  <div>
    <h1>vue-tape - demo</h1>
    <hr />
    <button class="btn" @click="showModal()" type="button">showModal</button>
    <button class="btn" @click="showToast()" type="button">showToast</button>
    <button class="btn" @click="showLoading()" type="button">showLoading</button>
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
  created() {
    // nothing
  },
  methods: {
    showLoading() {
      Tape.showLoading("正在加载数据中", 2000);
    },
    showToast() {
      Tape.showToast("提示内容");
    },
    showModal() {
      Tape.showModal({
        // icon: require("../../assets/icon.png"),
        key: "111",
        title: "退出登录",
        cancelColor: "#919191",
        confirmColor: "#FF6666",
        cancelText: "取消",
        confirmText: ["理解并同意1",{
            text: "理解并同意"
        }],
        message: "确认退出当前账号？",
        callback: confirm => {
          Tape.showToast(
            "确认退出当前账号？" + confirm
          );
        }
      });
    }
  }
};
</script>