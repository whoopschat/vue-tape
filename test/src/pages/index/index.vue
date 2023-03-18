<template>
  <div>
    <div class="tape-demo">
      <div class="page-name">VUE-TAPE</div>
      <div class="page-desc">
        #vue-tape-name# - create by vue-tape #vue-tape-version#
      </div>
      <div class="page-slogan">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import url("./index.less");
.tape-demo {
  font-weight: 500;
  padding: 20px;

  .page-name {
    font-size: 30px;
    color: #333333;
  }
  .page-desc {
    font-size: 20px;
    color: #919191;
    padding-bottom: 10px;
    border-bottom: 1px solid #919191;
  }

  .page-slogan {
    font-size: 20px;
    color: #333333;
  }
}
</style>

<script>
export default {
  data() {
    return {
      text: "Build everything's"
    }
  },
  created() {
    // HELLO WORLD
  }
};
</script>