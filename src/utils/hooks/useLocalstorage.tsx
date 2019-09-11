import { useState } from 'react';
import { get, set, on, off } from 'local-storage';

export const IS_SHOWING_NEW = 'mx__is-showing-new';
export const CLICK_LOGS = 'mx__click-logs';

export const getItem = (key: string, initialValue: any) => {
    try {
        const item: string = get(key);
        if (!item) set(key, initialValue);
        return item || initialValue;
    } catch (error) {
        console.error(error);
        return initialValue;
    }
};

export const setItem = set;
export const onItem = on;
export const offItem = off;

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState(() =>
        getItem(key, initialValue)
    );

    const setValue = (value: T) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            set(key, valueToStore);
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
