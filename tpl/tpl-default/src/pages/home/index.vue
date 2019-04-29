<template>
  <div>
    <h1>#vue-tape-name# - home</h1>
    <hr>Hello
  </div>
</template>

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