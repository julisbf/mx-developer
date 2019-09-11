import { CLICK_LOGS, getItem, setItem } from './hooks/useLocalstorage';

interface ClickLog {
    s: string; // selector
    t: string; // timestamp
}

const clickLogger = (selectors: string[]) => {
    const handleClick = (event: MouseEvent) => {
        const target = event && (event.target as Element);
        selectors.forEach(selector => {
            if (target && !target.matches(selector)) return;
            event.preventDefault();

            const clickLogs: ClickLog[] = getItem(CLICK_LOGS, []);

            console.log(clickLogs);

            setItem(CLICK_LOGS, [
                ...clickLogs,
                {
                    s: selector,
                    t: new Date(),
                },
            ]);
            console.log('🎉 Clicked on');
            console.log(selector);
            console.log(event.target);
        });
    };
    document.addEventListener('click', handleClick, false);
    return handleClick;
};

export default clickLogger;
