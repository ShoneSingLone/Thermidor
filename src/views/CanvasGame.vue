<template>
  <transition name="fade">button
    <c-button>Button Slot</c-button>
  </transition>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";

export default {
  name: "CanvasGame",
  mounted() {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    CButton: () => import(/* webpackChunkName: "c-container" */ "@c/button/")
  }
};
</script>

<style lang="scss" scoped>
.drag {
}
</style>
