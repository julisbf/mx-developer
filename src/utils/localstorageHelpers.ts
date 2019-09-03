export const MX_PLATFORM = 'mxPlatform';

export const getItem = (key: string = MX_PLATFORM, initialValue: any = {}) => {
    try {
        const itemAsString = window.localStorage.getItem(MX_PLATFORM);
        const item = itemAsString && JSON.parse(itemAsString);
        if (!item) {
            window.localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        }
        return item;
    } catch (error) {
        console.error('Failed to get item from localstorage.');
    }
};

export const setItem = (key: string, item: string | object | null) => {
    window.localStorage.setItem(key, JSON.stringify(item));
};
