<template>
  <div class="select-wrapper">
    <div class="main">
      <c-input class="input-center" type="text" :placeholder="'请选择'" v-model="inputValue"></c-input>
    </div>
    <span v-if="isShowHint">{{inputValue}}</span>
    <ul class="layui-anim layui-anim-upbit" style="">
      <li v-for="(item, index) in list" :key="index" v-bind:value="item.value">{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import { list } from "./data";

export default {
  name: "cSelect",
  props: {},
  data() {
    return {
      inputValue: "",
      options: {
        DEFAULT_TIPS: "请选择",
        CLASS: "layui-form-select",
        TITLE: "layui-select-title",
        NONE: "layui-select-none",
        initValue: "",
        tips: false
      },
      selected: [],
      list
    };
  },
  computed: {
    isShowHint() {
      return this.inputValue && this.inputValue.length > 0;
    },
    placeholder() {
      return this.tips ? this.tips : this.options.DEFAULT_TIPS;
    }
  },
  methods: {},
  components: {
    "c-input": () =>
      import(/* webpackChunkName: "form.input" */ "../Input/Input.vue")
  }
};
</script>

<style lang="scss" scoped>
</style>
