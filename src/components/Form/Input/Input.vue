<template>
  <div :class="{'c-input-wrapper':true,'focus':isFocus}">
    <input
      class="c-input"
      type="text"
      v-model="currentValue"
      @focus="handleFocus"
      @blur="handleBlur"
      :placeholder="placeholder"
    >
  </div>
</template>

<script>
import Emitter from "@/utils/mixins/emitter.js";

// import { mapGetters, mapActions } from "vuex";
export default {
  name: "CInput",
  mixins: [Emitter],
  model: {},
  props: {
    placeholder: {
      default: "请输入"
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isFocus: false
    };
  },
  computed: {},
  methods: {
    handleFocus() {
      this.isFocus = true;
    },
    handleBlur() {
      this.dispatch("CFormItem", "onFormBlur", this.currentValue);
      this.isFocus = false;
    }
  },
  watch: {
    value(newValue) {
      console.log(newValue);
      this.dispatch("CFormItem", "onFormChange", newValue);
      this.$emit("input", newValue);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
