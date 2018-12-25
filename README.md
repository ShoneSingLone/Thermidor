# 参考资料

[Vue.js 组件精讲](https://juejin.im/book/5bc844166fb9a05cd676ebca/section/5bc844a45188255c60044ef4#heading-1)

---
用Vue搞工程项目，有三个大的组件类型，由大到小（不严谨）排顺：

1. 页面，就是外部的shell壳、骨架，一般只有一个，Bus总线可以放在这里；
1. 业务组件，与具体业务相关。根据项目需求，用原子组件组合而成。重点，怎么拆分（设计）是个手艺活儿；
1. 原子组件，button就是button，不能再拆了。

---
>在设计一个新功能（features）时，可以先确定这个功能的 API 是什么，也就是说方法名、参数、使用样例，确定好 API，再来写具体的代码。

>每个组件的 name 值应当是唯一的，name 主要用于递归查找组件：Vue({name:"作为唯一ID"})

## Vue 基础

- [inheritAttrs](https://cn.vuejs.org/v2/api/#inheritAttrs)
- [slot](https://cn.vuejs.org/v2/guide/components-slots.html)

### 

## 组件间的通信

### $emit， $on， $off / ref / $parent 和$children

[Vue 组件通信之 Bus](https://juejin.im/post/5a4353766fb9a044fb080927)
>关键是bus需要在销毁之前清除监听

```js
var eventBus = {
    install(Vue,options) {
        Vue.prototype.$bus = vue
    }
};
Vue.use(eventBus);
// ...
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

### 非得要用Vuex实现组件之间的传值？

[provide-inject](https://cn.vuejs.org/v2/api/#provide-inject)
>从根组件传递，只要存在上下游关系，就可以完成通信，相当于（伪）全局变量。 this.$root只能访问根实例，相比provide-inject不够灵活。Vuex毕竟是状态管理第三方库，对于独立组件开发，只是需要组件间通信，还要依赖一个库，是不是就太...emmm...

[自行实现 dispatch 和 broadcast 方法](https://github.com/iview/iview/blob/2.0/src/mixins/emitter.js)

[Vue 1.0 dispatch broadcast](https://github.com/vuejs/vue/blob/1.0/src/instance/api/events.js)
可以在组件库自行维护，毕竟这个量级的跨组件状态还能应付。

### 代码分割

[mixins](https://cn.vuejs.org/v2/api/#provide-inject)
将不同的逻辑分到不同的js，比如 queryPanel（查询列表业务组件，需要queryClick查询，dblClick选择查询的行，返回行数据...都是queryPanel相关的操作）

## main

  props slot event
  编写components就是面向接口编程，是对“是什么，就能做什么”的抽象。比如Button：样式大小innerHTML

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