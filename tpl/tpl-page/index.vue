<template>
  <div>
    <h1>#vue-tape-name# - #vue-tape-page#</h1>
    <hr>Hello
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
    Tape.onShow(() => {
      // page on show
    });
  }
};
</script>