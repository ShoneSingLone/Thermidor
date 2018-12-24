<template>
  <button :class="'c-button_' + size" :disabled="disabled"></button>
</template>

<script>
import { isOneOfList } from "@c/utils/is.js";

export default {
  name: "Button",
  mounted() {},
  props: {
    size: {
      validator(value) {
        return isOneOfList(value, ["small", "large", "default"]);
      },
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { transitionName: "" };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

<style lang="scss" scoped src="./button.scss">
</style>
