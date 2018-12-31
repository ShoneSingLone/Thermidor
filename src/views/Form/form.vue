<template>
  <transition :name="'transitionName'">
    <div id="view-form">
      <div class="key-value-warpper">
        <ul>
          <li class="key-value" v-for="(item, index) of formValidate" :key="index">
            <span class="props">{{index}}</span>
            <span class="divide"></span>
            <span class="content">{{item}}</span>
          </li>
        </ul>
      </div>
      <c-form :model="formValidate" :rules="ruleValidate" ref="form">
        <c-form-item label="用户名" prop="name">
          <c-input v-model="formValidate.name"></c-input>
        </c-form-item>
        <c-form-item label="邮箱" prop="mail">
          <c-input v-model="formValidate.mail"></c-input>
        </c-form-item>
        <c-form-item label="checkbox.single" prop="checkboxSingle">
          <c-checkbox
            v-model="formValidate.checkboxSingle"
            :options="{trueValue:'是',falseValue:'否',disabled:false}"
          ></c-checkbox>
        </c-form-item>
        <c-form-item label="checkbox.multiple" prop="checkboxMultiple" class="panel">
          <c-checkbox-group v-model="formValidate.checkboxMultiple">
            <c-checkbox label="option1">选项 1</c-checkbox>
            <c-checkbox label="option2">选项 2</c-checkbox>
            <c-checkbox label="option3">选项 3</c-checkbox>
            <c-checkbox label="option4">选项 4</c-checkbox>
            <c-checkbox label="option5">选项 5</c-checkbox>
            <c-checkbox label="option6">选项 6</c-checkbox>
            <c-checkbox label="option7">选项 7</c-checkbox>
          </c-checkbox-group>
        </c-form-item>
      </c-form>
      <div class="operator panel">
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
        mail: "",
        checkboxSingle: "是",
        checkboxMultiple: [
          "option1",
          "option2",
          "option3",
          "option4",
          "option5",
          "option6"
        ]
      },
      ruleValidate: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        checkboxSingle: [
          // { required: true, message: "checkboxSingle不能为空", trigger: "blur" }
        ],
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
    CCheckboxGroup: () =>
      import(/* webpackChunkName: "form.checkbox.group" */ "@c/Form/Checkbox/CheckboxGroup.vue"),
    CCheckbox: () =>
      import(/* webpackChunkName: "form.checkbox" */ "@c/Form/Checkbox/Checkbox.vue"),
    CInput: () =>
      import(/* webpackChunkName: "form.input" */ "@c/Form/Input/Input.vue")
  }
};
</script>

<style lang="scss" scoped>
@mixin panel() {
  @include elevation2();
  border: 2px solid black;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem;
}
#view-form {
  .panel {
    @include panel;
  }
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  .key-value-warpper {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 1rem;
    background-color: #00968878;
    border-radius: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

    @include elevation2();
    .key-value {
      display: flex;
      justify-content: space-around;
      span {
        color: white;
      }
      .divide {
        flex: 1;
      }
    }
  }
}
</style>
