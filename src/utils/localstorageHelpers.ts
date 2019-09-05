import { get, set, on, off } from 'local-storage';

export const IS_SHOWING_NEW = 'mx__is-showing-new';
export const CLICK_LOGS = 'mx__click-logs';

export const getItem = (key: string, initialValue: any = {}) => {
    try {
        const item = get(key);
        if (!item) {
            set(key, initialValue);
            return initialValue;
        }
        return item;
    } catch (error) {
        console.error('Failed to get item from localstorage.');
    }
};

export const setItem = set;
export const onItem = on;
export const offItem = off;
