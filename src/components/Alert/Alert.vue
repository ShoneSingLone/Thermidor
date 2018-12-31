<template>
  <div class="c-alert-wrapper">
    <div class="alert-main" v-for="item of notices" :key="item.name">
      <div class="alert-content">{{ item.content }}</div>
    </div>
  </div>
</template>
<script>
/*  */
let seed = 0;
function getUuid() {
  return "alert_" + Date.now() + seed++;
}
export default {
  name: "CAlert",
  data() {
    return {
      notices: {}
    };
  },
  methods: {
    add(notice) {
      let vm = this;
      const name = getUuid();
      vm.$set(vm.notices, name, notice);
      /* 定时移除，单位：秒 */
      const duration = notice.duration;
      setTimeout(() => {
        /* 触发更新 */
        vm.$set(vm.notices, name, null);
        /* 保证非空 */
        delete vm.notices[name];
      }, duration * 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.c-alert-wrapper {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none;
  transition: all 1s ease-in-out;
  .alert-content {
    display: inline-block;
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    margin-bottom: 8px;
  }
}
</style>