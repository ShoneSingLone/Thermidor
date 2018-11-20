<template>
  <transition :name="transitionName">
    <div ref="drag" class="drag">
      <div class="hide">
      </div>
    </div>
  </transition>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
let thisVue;

export default {
  name: "Drag",
  mounted() {
    thisVue = this;

    let DOM_drag = thisVue.$refs.drag;
    debugger;
    // 获取鼠标点击时在div中的相对位置
    DOM_drag.onmousedown = function(event) {
      event = event || window.event;

      let relaX = event.clientX - this.offsetLeft;
      let relaY = event.clientY - this.offsetTop;

      // 获取当前鼠标位置，减去与div的相对位置得到当前div应该被拖拽的位置
      DOM_drag.onmousemove = function(event) {
        event = event || window.event;
        DOM_drag.style.left = event.clientX - relaX + "px";
        DOM_drag.style.top = event.clientY - relaY + "px";
      };
      DOM_drag.onmouseup = function() {
        DOM_drag.onmousemove = null;
        DOM_drag.onmouseup = null;
      };
      DOM_drag.onmouseout = function() {
        DOM_drag.onmousemove = null;
        DOM_drag.onmouseup = null;
      };
    };
  },
  props: {},
  data() {
    return {
      transitionName: "",
      selected: [],
      relaX: 0,
      relaY: 0,
      dragStyle: { transform: `translate(0,0)` }
    };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.drag {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #bcbcbc;
  position: absolute;
  text-align: center;
  line-height: 100px;
  transition: all 0.1s;
  &:hover {
    cursor: move;
  }
}
</style>
