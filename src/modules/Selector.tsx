import React, { useState, useEffect } from 'react';

import MxHeader from './MxHeader';
import MxDock from './MxDock';
import {
    getItem,
    setItem,
    onItem,
    offItem,
    IS_SHOWING_NEW,
} from '../utils/localstorageHelpers';
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
    const initialIsShowingNew: boolean = getItem(
        IS_SHOWING_NEW,
        false // if user is new, give an initial value
    );

    const [isShowingNew, setIsShowingNew] = useState(initialIsShowingNew);

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
