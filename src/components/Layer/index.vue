<template>
  <transition :name="transitionName">
    <div
      class="c-layer"
      @mousedown="handleTitleMousedown($event)"
      :style="{transform:`translate(${xAxis}px,${yAxis}px)`}"
    >
      <div class="iframe">
        <div
          class="title"
          style="cursor: move;"
          @mouseout="handleTitleMouseout"
        >信息</div>

        <div class="content">
          <iframe
            scrolling="auto"
            allowtransparency="true"
            id="iframe3"
            name="iframe3"
            onload="this.className='';"
            class=""
            frameborder="0"
            src="http://fly.layui.com/"
            style="height: 457px;"
          ></iframe>
        </div>
        <span class="setwin">
          <a
            class="min"
            href="javascript:;"
          >
            <cite></cite>
          </a>
          <a
            class="ico max"
            href="javascript:;"
          ></a>
          <a
            class="ico close close1"
            href="javascript:;"
          ></a>
        </span>
        <span class="resize"></span>
      </div>
    </div>
  </transition>
</template>

<script>
import EventHandler from "@u/eventNameSpace";

let thisVue;
export default {
  name: "Layer",
  mounted() {
    thisVue = this;
    EventHandler.on(window, "mouseup.layer", () => {
      console.log("offDragEvent");
      thisVue.offDragEvent();
    });
  },
  props: {},
  data() {
    return {
      transitionName: "fade",
      xAxis: 0,
      yAxis: 0
    };
  },
  computed: {},
  methods: {
    offDragEvent() {
      EventHandler.off(window, "mousemove.layer");
      console.log("mousemove.layer");
    },
    handleTitleMouseout() {
      console.log("handleTitleMouseout offDragEvent");
      this.offDragEvent();
    },
    handleTitleMousedown(event = window.event) {
      let { clientX, clientY } = event;
      // console.log("mousedown", clientX, clientY);
      let mouseClickAxis = {
        clientX,
        clientY
      };
      // 记录点击时，元素位置
      let xAxis = Number(thisVue.xAxis);
      let yAxis = Number(thisVue.yAxis);

      let handleMouseMove = (event = window.event) => {
        let { clientX, clientY } = event;
        // console.log("mousemove", clientX, clientY);
        thisVue.xAxis = xAxis + clientX - mouseClickAxis.clientX;
        thisVue.yAxis = yAxis + clientY - mouseClickAxis.clientY;
      };
      //鼠标移动的相对位置
      EventHandler.on(window, "mousemove.layer", handleMouseMove);
    }
  },
  watch: {},
  components: {}
};
</script>

<style lang="scss" src="./index.scss">
</style>
