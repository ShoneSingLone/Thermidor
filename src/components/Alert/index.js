import Notification from './notification.js';

let messageInstance;
/* 单例 Singleton*/
function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance();
    return messageInstance;
}

function notice({
    duration = 3,
    content = ''
}) {
    let instance = getMessageInstance();

    instance.add({
        content: content,
        duration: duration
    });
}

export default {
    info(options) {
        return notice(options);
    },
    warn(options) {
        return notice(options);
    }
}