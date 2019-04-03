<template>
  <div>
    <div @click="click">
      <h1>#vue-tape-name# - home</h1>
      <hr>
      {{ VTape.state.hello }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    click() {
      VTape.state.hello = "Ni Hao";
    }
  },
  created() {}
};
</script>