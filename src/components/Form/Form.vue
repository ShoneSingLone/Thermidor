<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "CForm",
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  provide() {
    return {
      formInject: this
    };
  },
  /* 因为Vue渲染是由内而外，所以在mounted才监听是无法满足需求 */
  created() {
    this.$on("onFormItemAdd", formItem => {
      /* 有prop才需要验证，才会缓存 */
      if (formItem) this.formItems.push(formItem);
    });
    this.$on("onFormItemRemove", formItem => {
      if (formItem.prop)
        this.formItems.splice(this.formItems.indexOf(formItem), 1);
    });
  },
  data() {
    return {
      formItems: []
    };
  },
  methods: {
    // 公开方法：全部重置数据
    resetformItems() {
      this.formItems.forEach(formItem => {
        formItem.resetField();
      });
    },
    // 公开方法：全部校验数据，支持 Promise
    validate(callback) {
      return new Promise((resolve, reject) => {
        let valid = true;
        let count = 0;
        let messageArray = [];
        this.formItems.forEach(field => {
          field.validate("", errors => {
            if (errors) {
              valid = false;
              messageArray.push(errors);
            }
            if (++count === this.formItems.length) {
              /* 既可以是promise */
              if (!valid) {
                reject(messageArray);
              } else {
                // 全部完成
                resolve(valid);
              }
              /* 也可以是一般的回调 */
              if (typeof callback === "function") {
                callback(valid, messageArray);
              }
            }
          });
        });
      });
    }
  }
};
</script>