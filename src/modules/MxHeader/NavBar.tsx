import React from 'react';

import NavBarComponent from '../../components/NavBar';
import NavBarItem, { NavBarItemProps } from './NavBarItem';

const NavBar = ({ isMobileNavBarOpen }: { isMobileNavBarOpen: boolean }) => {
    return (
        <NavBarComponent
            className={
                isMobileNavBarOpen
                    ? 'MxHeader__nav-bar--mobile-menu-open'
                    : 'MxHeader__nav-bar'
            }
        >
            {({ key, ...data }: NavBarItemProps) => (
                <NavBarItem
                    key={key}
                    {...data}
                    isOnMobile={isMobileNavBarOpen}
                />
            )}
        </NavBarComponent>
    );
};

export default NavBar;
