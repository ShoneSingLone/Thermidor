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
    this.$on("onFormItemAdd", field => {
      if (field) this.fields.push(field);
    });
    this.$on("onFormItemRemove", field => {
      /* 有prop才需要验证，才会缓存 */
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  }
};
</script>