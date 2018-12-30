<template>
  <div :id="`c-checkbox-wrapper${id}`" :class="['c-checkbox-wrapper',{'group-item':isGroup}]">
    <label class="c-checkbox-label" :for="id">
      <slot></slot>
    </label>
    <span class="c-checkbox-value">
      <input type="checkbox" :id="id" :disabled="disabled" v-model="currentValue">
    </span>
  </div>
</template>

<script>
import Emitter from "@/utils/mixins/emitter.js";
import { findComponentUpward } from "@/utils/assist.js";
export default {
  name: "CCheckbox",
  created() {
    console.log("CCheckbox created", this._uid);
  },
  mounted() {
    console.log("CCheckbox mounted", this._uid);
    this.isGroup = !!findComponentUpward(this, "CCheckboxGroup");
    if (this.isGroup) {
      this.currentValue = this.$parent.childrensLabels[this.label];
    } else {
      this.currentValue = Boolean(this.value === this.trueValue);
    }
  },
  mixins: [Emitter],
  inject: ["formItemInject"],
  model: {
    prop: "value",
    event: "change" //语法糖相应的触发事件
  },
  props: {
    value: {
      //与外层的v-model对应
      defalut: false
    },
    options: {
      type: Object
    },
    label: {
      type: String
    }
  },
  data() {
    return {
      currentValue: false /* 当前Checkbox的true或者false，与外层的modelValue不一定一致，与trueValue falseValue相关 */,
      isGroup: false,
      text: ""
    };
  },
  computed: {
    id() {
      const id = `CCheckbox${this._uid}`;
      return id;
    },
    disabled() {
      return (this.options && this.options.disabled) || false;
    },
    /* 返回的真假值不一定是true或者false，可能是【是】、【否】 */
    trueValue() {
      return (this.options && this.options.trueValue) || true;
    },
    falseValue() {
      return (this.options && this.options.falseValue) || false;
    }
  },
  methods: {},
  watch: {
    currentValue(checked) {
      /* v-model默认props：value event input 如果不使用model 属性自定义
       *  model: {
       *    prop: 'value',
       *    event: 'change'
       *  }
       * v-bind:checked="value"本身只是
       **/
      if (this.isGroup) {
        /* 如果是分组，绑定在外层group */
        this.$parent.childrensLabels[this.label] = checked;
        this.$parent.updateValue();
      } else {
        const value = checked ? this.trueValue : this.falseValue;
        /* 如果是单个的，直接绑定在外层 */
        this.$emit("change", value);
        /* 校验工作 */
        this.dispatch("CFormItem", "onFieldChangeValidate", value);
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
