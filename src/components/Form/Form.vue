<template>
    <transition name="fade-cross">
        <div class="form">
            <c-input :placeholder="'input-输入'" v-model="currentInput"></c-input>
            <c-select v-model="currentSelect"></c-select>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
export default {
  name: "cForm",
  props: {},
  data() {
    return {
      currentSelect: "",
      currentInput: ""
    };
  },
  computed: {},
  methods: {},
  watch: {
    currentSelect(value) {
      console.log(value);
    },
    currentInput(value) {
      console.log(value);
    }
  },
  components: {
    "c-input": () =>
      import(/* webpackChunkName: "form.input" */ "@c/Form/Input/Input.vue"),
    "c-select": () =>
      import(/* webpackChunkName: "form.select" */ "@c/Form/Select/Select.vue")
  }
};
</script>

<style lang="scss" scoped>
.form {
  margin: 0 auto;
  width: 666px;
  height: 40px;
  text-align: center;
  &:first-child() {
    margin: 10px;
  }
  .input {
    width: 100%;
  }
}
</style>
