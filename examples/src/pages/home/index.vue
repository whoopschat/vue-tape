<template>
  <div>
    <div
      class="test"
      v-show="a>1"
      @click="a++;Tape.state.a++;"
    >{{ Tape.query('name','你好') }} {{ Tape.config('API_SERVER') }} {{ Tape.query('a') }} {{ a }} {{ Tape.state.a }}</div>
    <div
      class="test"
      @click="a++;Tape.state.a++;"
    >{{ Tape.query('name','你好') }} {{ Tape.config('API_SERVER') }} {{ Tape.query('a') }} {{ a }} {{ Tape.state.a }}</div>
    <div
      class="test"
      @click="a++;Tape.state.a++;"
    >{{ Tape.query('name','你好') }} {{ Tape.config('API_SERVER') }} {{ Tape.query('a') }} {{ a }} {{ Tape.state.a }}</div>
    <div
      class="test"
      @click="a++;Tape.state.a++;"
    >{{ Tape.query('name','你好') }} {{ Tape.config('API_SERVER') }} {{ Tape.query('a') }} {{ a }} {{ Tape.state.a }}</div>
    <div @click="Tape.back">返回</div>
    <a :href="href">a</a>
    <br>
    <a :href="hrefb">b</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 1,
      href: "#10",
      hrefb: "index.html"
    };
  },
  methods: {},
  created() {
    Tape.exposure({
      divSelector: ".test",
      handleExposure: div => {
        console.log(div);
      }
    });
    Tape.backListener(() => {
      console.log("-----------------------------");
      return this.a == 1;
    });
  }
};
</script>
