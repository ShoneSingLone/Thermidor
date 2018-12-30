<template>
  <div class="c-checkbox-group-wrapper">
    <slot></slot>
  </div>
</template>
<script>
import { findComponentsDownward } from "@/utils/assist.js";
import Emitter from "@/utils/mixins/emitter.js";

export default {
  name: "CCheckboxGroup",
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    let currentValue = this.value;
    let childrensLabels = {};
    currentValue.forEach(value => {
      childrensLabels[value] = true;
    });
    return {
      currentValue,
      childrensLabels,
      childrens: []
    };
  },
  methods: {
    updateValue() {
      let arr = Object.keys(this.childrensLabels).filter(key => {
        return this.childrensLabels[key];
      });
      this.currentValue = arr;
      /* 子组件需要注册才能动态更改 */
    },
    change(data) {
      this.currentValue = data;
      this.$emit("input", data);
      /* 校验工作 */
      this.dispatch("CFormItem", "onFieldChangeValidate", data);
    }
  },
  created() {
    console.log("CCheckboxGroup created", this._uid);
    this.childrens = findComponentsDownward(this, "CCheckbox");
  },
  mounted() {
    console.log("CCheckboxGroup mounted", this._uid);
  },
  watch: {
    currentValue(newValue) {
      console.log("checkboxGroup currentValue update");
      /* 如果是单个的，直接绑定在外层 */
      this.$emit("input", newValue);
      /* 校验工作 */
      this.dispatch("CFormItem", "onFieldChangeValidate", newValue);
    }
  }
};
</script>
