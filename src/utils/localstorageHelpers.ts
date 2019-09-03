import { get, set, on } from 'local-storage';

export const MX_PLATFORM = 'mxPlatform';

export const getItem = (key: string = MX_PLATFORM, initialValue: any = {}) => {
    try {
        const item = get(MX_PLATFORM);
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
