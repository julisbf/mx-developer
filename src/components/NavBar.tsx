import React from 'react';

import { getCurrentApp, BEAVER, DATAHUB } from '../utils/environmentHelpers';
import navbarItemData from '../resources/menu/navbar.json';

const NavBar = ({
    className,
    children,
}: {
    className: string;
    children: Function;
}) => {
    const currentApp = getCurrentApp();

    return (
        <div className={className}>
            {navbarItemData
                .filter(itemData => {
                    /**
                     * hide Sprintr-related NavBarItems on `beaver` (apps owned by digital ecosystem team)
                     *  */
                    return (
                        currentApp !== BEAVER ||
                        (currentApp === BEAVER && !itemData.microflow)
                    );
                })
                .filter(itemData => {
                    /**
                     * only show `Data Hub` when it's on `https://hub.mendixcloud.com`
                     *  */

                    return currentApp === DATAHUB || itemData.key !== DATAHUB;
                })
                .map(itemData => children(itemData))}
        </div>
    );
};

export default NavBar;
