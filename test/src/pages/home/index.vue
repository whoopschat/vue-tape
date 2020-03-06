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
    this.showModal();
    this.showModal();
  },
  methods: {
    showLoading() {
      Tape.showLoading({});
    },
    showToast() {
      Tape.showToast({});
    },
    showModal() {
      Tape.showModal({
        // icon: require("../../assets/icon.png"),
        title: "退出登录",
        cancelColor: "#919191",
        confirmColor: "#FF6666",
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
  }
};
</script>