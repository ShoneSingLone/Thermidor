/* 直接拿到实例 */

/**
 * 由一个组件，向上找到最近的指定组件
 * 
 * @param {any} context 
 * @param {any} componentName 
 * @returns 
 */
function findComponentUpward(context, componentName) {
    let parent = context.$parent;
    let name = parent.$options.name;
    /* 只要有parent符合要求就行 ： parent存在 且名字一样 */
    while (parent && (!name || [componentName].indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}

/**
 * 由一个组件，向上找到所有的指定组件返回的是数组
 * 
 * @param {any} context 
 * @param {any} componentName 
 * @returns {Array} parents
 */
function findComponentsUpward(context, componentName) {
    let parents = [];
    const parent = context.$parent;

    if (parent) {
        if (parent.$options.name === componentName) parents.push(parent);
        return parents.concat(findComponentsUpward(parent, componentName));
    } else {
        return [];
    }
}

/**
 * 由一个组件，向下找到最近的指定组件
 * @param {any} context 
 * @param {any} componentName 
 * @returns 
 */

function findComponentDownward(context, componentName) {
    const childrens = context.$children;
    let children = null;

    if (childrens.length) {
        for (const child of childrens) {
            const name = child.$options.name;

            if (name === componentName) {
                children = child;
                break;
            } else {
                children = findComponentDownward(child, componentName);
                if (children) break;
            }
        }
    }
    return children;
}

/**
 * 由一个组件，向下找到所有指定的组件
 * 使用reduce，把找到的child都拍平了
 * @param {any} context 
 * @param {any} componentName 
 * @returns 
 */

function findComponentsDownward(context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}

/**
 * 由一个组件，找到指定组件的兄弟组件
 * @param {any} context 
 * @param {any} componentName 
 * @param {boolean} [exceptMe=true] 指定组件的兄弟组件是否包括自身，默认是不包括
 * @returns 
 */
function findBrothersComponents(context, componentName, exceptMe = true) {
    let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName;
    });
    /* Vue.js 在渲染组件时，每个组件增加一个内置的唯一标识 _uid，同样的component，_uid 不一样*/
    let index = res.findIndex(item => item._uid === context._uid);
    if (exceptMe) res.splice(index, 1); /* 默认不包括，直接删除 */
    return res;
}
/**
 * 真·typeof
 * 原生typeof的效果是基本类型都对，Array null object都是object function是function
 * @param {any} obj 
 * @returns 
 */
function typeOf(obj) {
    /* 从原型链查找，确实有一些开销，按国际惯例，会有这个代码做优化┓( ´∀` )┏*/
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}
/**
 * deepCopy
 * @param {any} data 
 * @returns 
 */
function deepCopy(data) {
    const type = typeOf(data);
    let obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        return data;
    }
    if (type === 'array') {
        for (let i = 0; i < data.length; i++) {
            obj.push(deepCopy(data[i]));
        }
    } else if (type === 'object') {
        for (let i in data) {
            /* 递归 */
            obj[i] = deepCopy(data[i]);
        }
    }
    return obj;
}

export {
    findComponentUpward,
    findComponentsUpward,
    findComponentDownward,
    findComponentsDownward,
    findBrothersComponents,
    typeOf,
    deepCopy
}