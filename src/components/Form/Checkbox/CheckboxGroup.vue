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
    return {
      currentValue: this.value,
      childrens: []
    };
  },
  methods: {
    updateValue(isSet) {
      let vm = this;
      vm.updateValue.count = vm.updateValue.count || 1;
      if (vm.updateValue.timer) {
        debugger;
        clearTimeout(vm.updateValue.timer);
        vm.updateValue.count = vm.updateValue.count || 1;
        vm.updateValue.timer = false;
      }
      vm.updateValue.timer = setTimeout(() => {
        vm.childrens = findComponentsDownward(this, "CCheckbox");
        if (vm.childrens) {
          if (isSet) {
            /* set */
            vm.childrens.forEach(child => {
              child.currentValue = !!~vm.value.indexOf(child.label);
            });
          } else {
            let arr = [];
            vm.childrens.forEach(child => {
              let isChecked = child.currentValue;
              if (isChecked) return arr.push(child.label);
            });
            vm.currentValue = arr;
          }
        }
        console.log("vm.currentValue", vm.currentValue, vm.updateValue.count++);
      }, 1000);
    },
    change(data) {
      this.currentValue = data;
      this.$emit("input", data);
      /* 校验工作 */
      this.dispatch("CFormItem", "onFieldChangeValidate", data);
    }
  },
  mounted() {
    this.updateValue(true);
  },
  watch: {
    value() {
      console.log("checkboxGroup value update");
      this.updateValue(true);
    },
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
