<template>
  <transition :name="transitionName">
    <div id="view-scrollbar">
      <ul>
        <li class="template" v-for="(item, index) in 1000" :key="index">over 1000 rows{{item}}-{{index}}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";

export default {
  name: "ViewScrollBar",
  mounted() {},
  beforeRouteEnter: (to, from, next) => {
    console.warn("beforeRouteEnter Sample");
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // next(vm => {});
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.warn("beforeRouteUpdate Sample");
    next();
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    console.warn("beforeRouteLeave Sample");
    next();
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
  props: {},
  data() {
    return { transitionName: "", selected: [] };
  },
  computed: {},
  methods: {},
  components: {
    "c-h": () => import(/* webpackChunkName: "c-container" */ "@c/HelloWorld")
  }
};
</script>

<style lang="scss" scoped>
#dragCircle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #bcbcbc;
  position: absolute;
  text-align: center;
  line-height: 100px;
  &::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
