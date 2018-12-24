# 参考资料

[Vue.js 组件精讲](https://juejin.im/book/5bc844166fb9a05cd676ebca/section/5bc844a45188255c60044ef4#heading-1)

## 组件间的通信 

$emit， $on， $off ref 和 $parent / $children
[Vue 组件通信之 Bus](https://juejin.im/post/5a4353766fb9a044fb080927)
>关键是bus需要在销毁之前清除监听

```js
created() {
  this.$bus.$on('todoSth', (params) => {  //获取传递的参数并进行操作
      //todo something
  })
},
methods: {
  todo: function () {
    this.$bus.$emit('todoSth', params);  //params是传递的参数
    //...
  }
},
// 最好在组件销毁前
// 清除事件监听
beforeDestroy () {
  this.$bus.$off('todoSth');
},
```

[provide-inject](https://cn.vuejs.org/v2/api/#provide-inject)

## main

  props slot event 
  编写components就是面向接口编程，是对“是什么，就能做什么”的抽象。

## Components

### Tree

[树形菜单文档 - layui.tree](https://www.layui.com/doc/modules/tree.html)
[Vue递归](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E9%80%92%E5%BD%92%E7%BB%84%E4%BB%B6)

```js
//在本地注册组件的时候，你可以使用 webpack 的异步 import：
components: {
  TreeFolderContents: () => import('./tree-folder-contents.vue')
}
```

### Button

- [inheritAttrs](https://cn.vuejs.org/v2/api/#inheritAttrs)
- [slot](https://cn.vuejs.org/v2/guide/components-slots.html)

