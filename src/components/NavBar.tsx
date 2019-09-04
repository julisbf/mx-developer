import React from 'react';

import { getCurrentApp, BEAVER } from '../utils/environmentHelpers';
import navbarItemData from '../resources/menu/navbar.json';

const NavBar = ({
    className,
    children,
}: {
    className: string;
    children: Function;
}) => {
    const currentApp = getCurrentApp();
    /**
     * Why the `filter`?
     * We need to hide Sprintr-related NavBarItems on `beaver` (apps owned by digital ecosystem team)
     *  */
    return (
        <div className={className}>
            {navbarItemData
                .filter(
                    itemData =>
                        currentApp !== BEAVER ||
                        (currentApp === BEAVER && !itemData.microflow)
                )
                .map(itemData => children(itemData))}
        </div>
    );
};

export default NavBar;
