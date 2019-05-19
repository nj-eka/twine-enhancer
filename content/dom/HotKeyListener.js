export class HotKeyListener {
    constructor(list, options) {
        this.list = list;
        this.update(options);

        this.onKeyDown = this._onKeyDown.bind(this);

        window.addEventListener('keydown', this.onKeyDown, false);
    }

    update(options) {
        const hkToAction = [];

        this.list.forEach((button) => {
            const key = `${button.name}Hk`;
            if (options[key]) {
                hkToAction.push({
                    action: button.name,
                    key: HotKeyListener.parseHotKeyString(options[key]),
                });
            }
        });

        this.hkToAction = hkToAction;
    }

    _onKeyDown(event) {
        for (const conf of this.hkToAction) {
            if (HotKeyListener.eventMatchesHotKey(event, conf.key)) {
                window.postMessage({ action: conf.action }, '*');
                event.preventDefault();
                break;
            }
        }
    }

    static eventMatchesHotKey(event, hotKey) {
        return Object.keys(hotKey).reduce((acc, key) => {
            let compareTo = event[key];
            if (key === 'code') {
                compareTo = compareTo.toLowerCase();
            }
            return acc && (hotKey[key] === compareTo);
        }, true);
    }

    static parseHotKeyString(str) {
        const chunks = str.split(/[+ ]/);
        const hotKey = chunks.reduce((acc, current) => {
            const key = current.toLowerCase();
            if (key === 'ctrl') {
                acc.ctrlKey = true;
            } else if (key === 'alt') {
                acc.altKey = true;
            } else if (key === 'shift') {
                acc.shiftKey = true;
            } else if (key.length === 1) {
                acc.code = `key${key}`;
            } else {
                acc.code = key;
            }

            return acc;
        }, {});
        return hotKey;
    }
}