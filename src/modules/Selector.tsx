import React, { useEffect } from 'react';

import MxHeader from './MxHeader';
import MxDock from './MxDock';
import {
    setItem,
    onItem,
    offItem,
    IS_SHOWING_NEW,
} from '../utils/hooks/useLocalstorage';
import useLocalstorage from '../utils/hooks/useLocalstorage';
import clickLogger from '../utils/clickLogger';

window.showNew = () => {
    setItem(IS_SHOWING_NEW, true);
    window.location.reload();
};

window.showOld = () => {
    setItem(IS_SHOWING_NEW, false);
    window.location.reload();
};

const Selector: React.FC = props => {
    const [isShowingNew, setIsShowingNew] = useLocalstorage<boolean>(
        IS_SHOWING_NEW,
        false
    );

    onItem(IS_SHOWING_NEW, setIsShowingNew);

    const handleClick = clickLogger([
        '.MxDock__toggle',
        '.MxFooter',
        '.MxDock',
    ]);

    // unsubscribe
    useEffect(() => () => {
        document.removeEventListener('click', handleClick);
        offItem(IS_SHOWING_NEW, setIsShowingNew);
    });

    return isShowingNew ? <MxDock {...props} /> : <MxHeader {...props} />;
};

export default Selector;
