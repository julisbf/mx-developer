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
    const localStorageItem: LocalStorageItem = getItem(MX_PLATFORM, {
        isShowingNew: false, // if user is new, give an initial value
    });

    const [isShowingNew, setIsShowingNew] = useState(
        localStorageItem.isShowingNew
    );

    onItem(MX_PLATFORM, (value: LocalStorageItem) => {
        setIsShowingNew(value.isShowingNew);
    });

    return isShowingNew ? (
        <CollaborationDock {...props} />
    ) : (
        <MxHeader {...props} />
    );
};

export default HeaderContainer;
