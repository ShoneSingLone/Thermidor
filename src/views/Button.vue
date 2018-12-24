<template>
  <transition :name="transitionName"></transition>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
let thisVue;

export default {
  name: "Drag",
  mounted() {},
  props: {},
  data() {
    return { transitionName: "" };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.drag {
}
</style>
