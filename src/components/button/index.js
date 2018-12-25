import button from './Button.vue';
export default button;

/* 启发：代码逻辑分割，如果有统一的操作 */
export let buttonMixins = {
    methods: {
        handleClick() {
            this.$emit("click", "hehe")
        }
    },
}