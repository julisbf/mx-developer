import React, { useState } from 'react';

import MxHeader from './MxHeader';
import CollaborationDock from './CollaborationDock';
import {
    getItem,
    setItem,
    onItem,
    MX_PLATFORM,
} from '../utils/localstorageHelpers';

window.showNew = () => {
    setItem(MX_PLATFORM, { isShowingNew: true });
    window.location.reload();
};

window.showOld = () => {
    setItem(MX_PLATFORM, { isShowingNew: false });
    window.location.reload();
};

interface LocalStorageItem {
    isShowingNew: boolean;
}

const HeaderContainer: React.FC = props => {
    const item = getItem(MX_PLATFORM, {
        isShowingNew: false, // if user is new, give an initial value
    });

    const [isShowingNew, setIsShowingNew] = useState(item.isShowingNew);

    onItem(MX_PLATFORM, (value: LocalStorageItem) => {
        console.log(value);
        setIsShowingNew(value.isShowingNew);
    });

    return isShowingNew ? (
        <CollaborationDock {...props} />
    ) : (
        <MxHeader {...props} />
    );
};

export default HeaderContainer;
