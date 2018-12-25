<template>
  <div class="c-form-item">
    <div class="label-wrapper">
      <label v-if="label">{{ label }}</label>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Emitter from "@/utils/mixins/emitter.js";
/* 当每个 FormItem 渲染时，将其自身（this）作为参数通过 dispatch 派发到 Form 组件中，然后通过一个数组缓存起来；同理当 FormItem 销毁时，将其从 Form 缓存的数组中移除。 */

export default {
  name: "CFormItem",
  mixins: [Emitter],
  inject: ["formInject"],
  mounted() {
    /* 如果没有传入 prop，则无需校验，也就无需缓存 */
    if (this.prop) {
      /* 往form注册 */
      this.dispatch("CForm", "onFormItemAdd", this);
      /* 监听表单控件 */
      this.watchItem();
    }
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  methods: {
    watchItem() {
      this.$on("onFormBlur", this.onFieldBlur);
      this.$on("onFormChange", this.onFieldChange);
    },
    onFieldBlur(value) {},
    onFieldChange(value) {}
  },
  /* 组件销毁前，将实例从 Form 的缓存中移除 */
  beforeDestroy() {
    this.dispatch("CForm", "onFormItemRemove", this);
  }
};
</script>