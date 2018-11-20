<template>
  <transition :name="transitionName">
    <div ref="drag" @mousedown="mousedown($event)" class="drag" :style="dragStyle" @mouseout="onmouseup">
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

    var dragCircle = document.getElementById("dragCircle");
    debugger;
    // 获取鼠标点击时在div中的相对位置
    dragCircle.onmousedown = function(ev) {
      var ev = ev || window.event;

      var relaX = ev.clientX - this.offsetLeft;
      var relaY = ev.clientY - this.offsetTop;

      // 获取当前鼠标位置，减去与div的相对位置得到当前div应该被拖拽的位置
      document.onmousemove = function(ev) {
        var ev = ev || window.event;
        dragCircle.style.left = ev.clientX - relaX + "px";
        dragCircle.style.top = ev.clientY - relaY + "px";
      };
      document.onmouseup = function(ev) {
        var ev = ev || window.event;
        document.onmousemove = null;
        document.onmouseup = null;
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
  methods: {
    mousedown(event) {
      let eleDrag = thisVue.$refs.drag;
      let rect = eleDrag.getBoundingClientRect();
      thisVue.relaX = event.clientX - rect.left;
      thisVue.relaY = event.clientY - rect.top;
      console.log(thisVue.relaX, thisVue.relaY);

      eleDrag.onmousemove = event => {
        let xAxio = event.clientX - thisVue.relaX;
        let yAxio = event.clientY - thisVue.relaY;
        xAxio = xAxio === 0 ? 0 : `${xAxio}px`;
        yAxio = yAxio === 0 ? 0 : `${yAxio}px`;
        thisVue.dragStyle = {
          transform: `translate(${xAxio},${yAxio})`
        };
        console.log(thisVue.dragStyle);
      };
    },
    onmouseup: () => {
      let eleDrag = thisVue.$refs.drag;
      eleDrag.onmousemove = null;
    }
  },
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
}
</style>
