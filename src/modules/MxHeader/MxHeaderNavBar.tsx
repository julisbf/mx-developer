import React from 'react';

import NavBar from '../../components/NavBar';
import NavBarItem, { NavBarItemProps } from './NavBarItem';
import Toggle from './NavBarMenuToggle';

const MxHeaderNavBar = ({
    isMobileNavBarOpen,
}: {
    isMobileNavBarOpen: boolean;
}) => {
    return (
        <NavBar
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
        </NavBar>
    );
};

export default MxHeaderNavBar;
