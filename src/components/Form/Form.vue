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