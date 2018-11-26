<template>
  <div id="app">
    <ul class="nav " ref="app">
      <c-tree-route class="item" :treeData="routeTreeData" @clickItem="handleClickItem"> </c-tree-route>
    </ul>
    <transition name="fade-cross">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
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
        children: [
          {
            name: "hello"
          },
          {
            name: "wat"
          },
          {
            name: "child folder",
            children: [
              {
                name: "child folder",
                children: [
                  {
                    name: "hello"
                  },
                  {
                    name: "wat"
                  }
                ]
              },
              {
                name: "hello"
              },
              {
                name: "wat"
              },
              {
                name: "child folder",
                children: [
                  {
                    name: "hello"
                  },
                  {
                    name: "wat"
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    handleClickItem(item) {
      console.log("Item", item);
    }
  },
  components: {
    CTreeRoute: () =>
      import(/* webpackChunkName: "TreeRout" */ "@c/Tree/route.vue")
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
