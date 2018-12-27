<template>
  <div class="c-form-item">
    <div class="label-wrapper">
      <label v-if="label" :class="[{required:isRequired}]">{{ label }}</label>
    </div>
    <div>
      <slot></slot>
    </div>
    <div class="validate-message-wrapper">
      <div v-if="validateState === 'error'" class="validate-message">{{ validateMessage }}</div>
    </div>
  </div>
</template>
<script>
import Emitter from "@/utils/mixins/emitter.js";
/* 当每个 FormItem 渲染时，将其自身（this）作为参数通过 dispatch 派发到 Form 组件中，然后通过一个数组缓存起来；同理当 FormItem 销毁时，将其从 Form 缓存的数组中移除。 */

/* 数据验证 */
import AsyncValidator from "async-validator";

/* 重置与清空 */
/* 重置需要缓存一分初始值 */

export default {
  name: "CFormItem",
  mixins: [Emitter],
  inject: ["formInject"],
  created() {
    /* 如果没有传入 prop，则无需校验，也就无需缓存 */
    if (this.prop) {
      /* 往form注册 */
      this.dispatch("CForm", "onFormItemAdd", this);
      /* 设置初始值，以便在重置时恢复默认值 */
      this.initialValue = this.fieldValue;
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
  data() {
    return {
      validateState: "", // 校验状态
      validateMessage: "", // 校验不通过时的提示信息
      initialValue: "",
      isRequired: true //是否为必填
    };
  },
  methods: {
    watchItem() {
      // debugger;
      this.$on("onFieldBlur", this.onFieldBlur);
      this.$on("onFieldChange", this.onFieldChange);
    },
    // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
    getRules() {
      let formRules = this.formInject.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },
    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        rule => !!rule.trigger && ~rule.trigger.indexOf(trigger)
      );
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback = function() {}) {
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        return true;
      }

      // 设置状态为校验中
      this.validateState = "validating";
      // 以下为 async-validator 库的调用方法
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";
        callback(this.validateMessage);
      });
    },
    onFieldBlur(event) {
      console.log("FormItem onFieldBlur", event);
      this.validate("blur");
    },
    onFieldChange(event) {
      console.log("FormItem onFieldChange", event);
      this.validate("change");
    },
    // 重置数据
    resetField() {
      this.validateState = "";
      this.validateMessage = "";
      this.formInject.model[this.prop] = this.initialValue;
    }
  },
  computed: {
    // 从 Form 的 model 中动态得到当前表单组件的数据
    fieldValue() {
      return this.formInject.model[this.prop];
    }
  },
  /* 组件销毁前，将实例从 Form 的缓存中移除 */
  beforeDestroy() {
    this.dispatch("CForm", "onFormItemRemove", this);
  }
};
</script>

<style lang="scss" scoped>
.c-form-item {
  .label-wrapper {
    .required {
      &::before {
        content: "*";
        color: red;
      }
    }
  }
  .validate-message-wrapper {
    .validate-message {
      color: red;
    }
  }
}
</style>
