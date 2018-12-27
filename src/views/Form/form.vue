<template>
  <transition :name="'transitionName'">
    <div id="view-form">
      <c-form :model="formValidate" :rules="ruleValidate" ref="form">
        <c-form-item label="用户名" prop="name">
          <c-input v-model="formValidate.name"></c-input>
        </c-form-item>
        <c-form-item label="邮箱" prop="mail">
          <c-input v-model="formValidate.mail"></c-input>
        </c-form-item>
      </c-form>
      {{formValidate}}
      <div class="operator">
        <button @click="handleSubmit">提交</button>
        <button @click="handleReset">重置</button>
      </div>
    </div>
  </transition>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";

export default {
  name: "ViewForm",
  mounted() {
    //某些需要在mounted之后完成的初始化
    let vm = this;
    this.$nextTick()
      .then(() => {
        vm.$emit("mounted", vm.$el);
      })
      .catch(error => {
        console.error(error);
      });
    console.log("mounted");
  },
  data() {
    return {
      formValidate: {
        name: "",
        mail: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        mail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    handleSubmit() {
      this.$refs.form
        .validate()
        .then(success => {
          console.log(success);
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleReset() {
      this.$refs.form.resetformItems();
    }
  },
  components: {
    CForm: () => import(/* webpackChunkName: "Form" */ "@c/Form/Form.vue"),
    CFormItem: () =>
      import(/* webpackChunkName: "form.item" */ "@c/Form/FormItem.vue"),
    CInput: () =>
      import(/* webpackChunkName: "form.input" */ "@c/Form/Input/Input.vue")
  }
};
</script>

<style lang="scss" scoped>
#view-form {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
