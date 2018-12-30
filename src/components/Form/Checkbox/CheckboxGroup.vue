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
      // let vm = this;
      // vm.childrens = findComponentsDownward(this, "CCheckbox");
      // if (vm.childrens) {
      //   const ACTIONS = {
      //     set: () => {
      //       /* set */
      //       vm.childrens.forEach(child => {
      //         /* 会触发事件发生吗？ */
      //         child.currentValue = !!~value.indexOf(child.label);
      //       });
      //       return false;
      //     },
      //     update: () => {
      //       let arr = [];
      //       vm.childrens.forEach(child => {
      //         let isChecked = child.currentValue;
      //         if (isChecked) return arr.push(child.label);
      //       });
      //       vm.currentValue = arr;
      //       return false;
      //     }
      //   };
      //   ACTIONS[command] && ACTIONS[command]();
      // }
      // console.log("vm.currentValue", vm.currentValue, vm.updateValue.count++);
      // vm.updateValue.count = vm.updateValue.count || 1;
      // if (vm.updateValue.timer) {
      //   clearTimeout(vm.updateValue.timer);
      //   vm.updateValue.timer = false;
      // }
      // vm.updateValue.timer = setTimeout(() => {}, 48);
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
