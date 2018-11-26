/* 
 *实现jQuery事件命名空间的
 *https://stackoverflow.com/questions/21817397/event-handler-namespace-in-vanilla-javascript
 *
 */


export default {
    on(domNode, event, callBackFunction, opts) {
        domNode.namespaces = domNode.namespaces || {};
        console.log(domNode.namespaces);
        domNode.namespaces[event] = callBackFunction;
        var options = opts || false;

        domNode.addEventListener(event.split('.')[0], callBackFunction, options);
        return domNode;
    },
    off(domNode, event) {
        console.log("off", event);
        domNode.removeEventListener(event.split('.')[0], domNode.namespaces[event]);
        delete domNode.namespaces[event];
        console.log(domNode.namespaces);
        return domNode;
    }
}