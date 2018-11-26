<template>
  <transition :name="transitionName">
    <c-layer></c-layer>
  </transition>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";

export default {
  name: "ViewLayer",
  mounted() {},
  props: {},
  data() {
    return { transitionName: "", selected: [] };
  },
  computed: {},
  methods: {},
  components: {
    "c-layer": () => import(/* webpackChunkName: "c-container" */ "@c/Layer")
  }
};
</script>

<style lang="scss" scoped>
#dragCircle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #bcbcbc;
  position: absolute;
  text-align: center;
  line-height: 100px;
  &::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
