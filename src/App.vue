<template>
  <div id="app">
    <ul class="nav horizontal" ref="app">
      <li class="item">
        <router-link to="/">Home</router-link>
      </li>
      <li class="item">
        <router-link to="/about">About</router-link>
      </li>
      <li class="item">
        <router-link to="/drag">Drag</router-link>
      </li>
      <li class="item">
        <router-link to="/scrollBar">scrollBar</router-link>
      </li>
      <li class="item">
        <router-link to="/form">form</router-link>
      </li>
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
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
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
