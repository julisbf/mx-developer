import React from 'react';

import MxHeader from './MxHeader';
import CollaborationDock from './CollaborationDock';
import { getItem, setItem, MX_PLATFORM } from '../utils/localstorageHelpers';

window.showNew = () => {
    setItem(MX_PLATFORM, { isShowingNew: true });
    window.location.reload();
};

window.showOld = () => {
    setItem(MX_PLATFORM, { isShowingNew: false });
    window.location.reload();
};

const HeaderContainer: React.FC = () => {
    const { isShowingNew } = getItem(MX_PLATFORM, {
        isShowingNew: false, // if user is new, give an initial value
    });

    return isShowingNew ? <CollaborationDock /> : <MxHeader />;
};

export default HeaderContainer;
