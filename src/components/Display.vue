<template>
  <div class="c-display-wrapper" ref="display"></div>
</template>

<script>
import randomStr from "@/utils/random_str.js";
import Vue from "vue";

export default {
  name: "CDisplay",
  props: {
    code: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.renderCode();
  },
  beforeDestroy() {
    this.destroyCode();
  },
  data() {
    return {
      html: "",
      js: "",
      css: "",
      component: null,
      id: randomStr()
    };
  },
  methods: {
    destroyCode() {
      /* css */
      const $target = document.getElementById(this.id);
      if ($target) $target.parentNode.removeChild($target);
      /* dom js */
      if (this.component) {
        this.$refs.display.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    },
    renderCode() {
      this.splitCode();
      /* 简单验证 */
      if (this.html !== "" && this.js !== "") {
        /* 转换为JS对象 */
        const parseStrToFunc = new Function(this.js)();
        parseStrToFunc.template = this.html;
        /* 创建组件 */
        const Component = Vue.extend(parseStrToFunc);
        /* 实例化 、并未挂载*/
        this.component = new Component().$mount();
        /* 挂载、可用 */
        this.$refs.display.appendChild(this.component.$el);

        if (this.css !== "") {
          const style = document.createElement("style");
          style.type = "text/css";
          style.id = this.id;
          style.innerHTML = this.css;
          document.getElementsByTagName("head")[0].appendChild(style);
        }
      }
    },
    getSource(source, type) {
      /* 找到头尾的位置 */
      const regex = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(regex);

      if (!openingTag) return "";
      else openingTag = openingTag[0];
      /* 截取中间的 */
      return source.slice(
        source.indexOf(openingTag) + openingTag.length,
        source.lastIndexOf(`</${type}>`)
      );
    },
    splitCode() {
      const script = this.getSource(this.code, "script").replace(
        /export default/,
        "return "
      );
      const style = this.getSource(this.code, "style");
      const template =
        '<div id="app">' + this.getSource(this.code, "template") + "</div>";

      this.js = script;
      this.css = style;
      this.html = template;
    }
  },
  watch: {
    /* code 更新后重新渲染，整个过程重来一遍 */
    code(value) {
      console.log("dispaly code:", value);
      this.destroyCode();
      this.renderCode();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.c-display-wrapper {
}
</style>
