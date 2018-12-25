<template>
  <button :class="'c-button_' + size" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
import { isOneOfList } from "@/utils/is.js";

export default {
  name: "CButton",
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
