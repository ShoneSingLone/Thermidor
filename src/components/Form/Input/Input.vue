<template>
  <input
    type="text"
    :value="value"
    :placeholder="placeholder"
    @input="handleInput"
    @blur="handleBlur"
  >
</template>
<script>
import Emitter from "@/utils/mixins/emitter.js";
/* Vue推荐只有数据的所有者才能修改数据 */
export default {
  name: "CInput",
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: ""
    },
    options: {
      type: Object
    }
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.$emit("input", value);
      this.dispatch("CFormItem", "onFormChange", value);
    },
    handleBlur() {
      this.dispatch("CFormItem", "onFormBlur", this.value);
    }
  },
  computed: {
    placeholder() {
      return (this.options && this.options.placeholder) || "请输入";
    }
  }
};
</script>