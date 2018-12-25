<template>
  <div id="app">
    <!-- <c-button>button</c-button> -->
    <ul class="nav" ref="app">
      <c-tree-route class="item" :treeData="routeTreeData" @clickItem="handleClickItem"></c-tree-route>
    </ul>
    <transition name="fade-cross">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import routeObj from "./router.js";
export default {
  name: "App",
  mounted() {
    window.app = this.$refs.app;
    console.log("App");
  },
  data() {
    return {
      routeTreeData: {
        name: "My Tree",
        children: routeObj.options.routes
      }
    };
  },
  methods: {
    handleClickItem(item) {
      this.$router.push({ name: item.name, query: { userId: 123 } });
    }
  },
  components: {
    CTreeRoute: () => import(/* webpackChunkName: "TreeRout" */ "@c/Tree/route.vue"),
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  .nav {
    position: fixed;
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #2c3e50;
      }
    }
    &.horizontal {
      .item {
        display: inline-block;
        margin: 0 5px;
      }
    }
  }
}
.fade-cross {
  &-enter-active {
    transition: opacity 0.5s 0.5s ease;
    opacity: 0;
  }

  &-leave-active {
    transition: opacity 0.5s ease;
    opacity: 1;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter-to,
  &-leave {
    opacity: 1;
  }
}
* {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
