import React from 'react';

import { getCurrentApp, BEAVER } from '../../utils/environmentHelpers';

import navbarItemData from '../../resources/menu/navbar.json';
import NavBarItem from './NavBarItem';

const NavBar = () => {
    const currentApp = getCurrentApp();

    /**
     * Why the `filter`?
     * We need to hide Sprintr-related NavBarItems on `beaver` (apps owned by digital ecosystem team)
     *  */
    return (
        <div className="MxDock__nav-bar">
            {navbarItemData
                .filter(
                    itemData =>
                        currentApp !== BEAVER ||
                        (currentApp === BEAVER && !itemData.microflow)
                )
                .map(({ key, ...data }) => (
                    <NavBarItem key={key} {...data} />
                ))}
        </div>
    );
};

export default NavBar;
