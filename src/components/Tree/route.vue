<template>
  <transition :name="transitionName">
    <ul>
      <li class="tree" v-for="(treeData,index) in treeList" :key="index">
        <div :class="{bold: isFolder(treeData)}" @click="toggle(treeData)">
          {{treeData.name}}
          <span v-if="isFolder(treeData)">[{{isOpen ? '-' : '+'}}]</span>
          <!-- <c-tree-route v-if="isFolder(treeData)"></c-tree-route> -->
        </div>
      </li>
    </ul>
  </transition>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import { router } from "@/router.js";

console.log(router.routes);
export default {
  name: "TreeRoute",
  mounted() {},
  data() {
    return {
      transitionName: "",
      isOpen: false,
      treeList: router.routes
    };
  },
  computed: {},
  methods: {
    isFolder: function(treeData) {
      let result = !!(treeData.children && treeData.children.length);
      return result;
    },
    toggle(treeData) {
      if (this.isFolder(treeData)) {
        this.isOpen = !this.isOpen;
      } else {
        this.$emit("clickItem", treeData);
      }
    },
    changeType: function() {
      if (!this.isFolder) {
        this.$set(this.treeList, "children", []);
        this.addChild();
        this.isOpen = true;
      }
    },
    addChild: function() {
      this.treeList.children.push({
        name: "new stuff"
      });
    }
  },
  components: {
    CTreeRoute: () =>
      import(/* webpackChunkName: "TreeRout" */ "@c/Tree/route.vue")
  }
};
</script>


<style scoped lang="scss">
.item {
  cursor: pointer;
}
</style>