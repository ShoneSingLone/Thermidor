<template>
  <div>
    <h3>动态渲染 .vue 文件的组件—— Display</h3>
    <textarea rows="3" cols="20" v-model="code"> 在w3school，你可以找到你所需要的所有的网站建设教程。 </textarea>
    <c-display :code="code"></c-display>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
export default {
  name: "ViewDisplay",
  mounted() {},
  props: {},
  data() {
    return {
      code: ""
    };
  },
  computed: {},
  methods: {},
  components: {
    CDisplay: () => import(/* webpackChunkName: "c-container" */ "@c/Display")
  }
};
</script>

<style lang="scss" scoped>
.drag {
}
</style>
