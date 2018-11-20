<template>
  <div :class="{'input-wrapper':true,'focus':isFocus}">
    <input class="input" type="text" :placeholder="placeholder" v-model="currentValue" @focus="handleFocus" @blur="handleBlur">
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
export default {
  name: "cInput",
  props: {
    placeholder: {
      default: "请输入"
    }
  },
  data() {
    return {
      currentValue: "",
      isFocus: false
    };
  },
  computed: {},
  methods: {
    handleFocus() {
      this.isFocus = true;
    },
    handleBlur() {
      this.isFocus = false;
    }
  },
  watch: {
    currentValue(value) {
      this.$emit("input", value);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
