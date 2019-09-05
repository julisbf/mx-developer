import React from 'react';

import NavBarComponent from '../../components/NavBar';
import NavBarItem, { NavBarItemProps } from './NavBarItem';
import Toggle from './NavBarMenuToggle';

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
                    block="MxHeader"
                    toggleComponent={Toggle}
                />
            )}
        </NavBarComponent>
    );
};

export default NavBar;
