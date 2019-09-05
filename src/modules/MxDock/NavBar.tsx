import React from 'react';

import NavBarComponent from '../../components/NavBar';
import NavBarItem, { NavBarItemProps } from './NavBarItem';

const NavBar = () => (
    <NavBarComponent className="MxDock__nav-bar">
        {({ key, ...data }: NavBarItemProps) => (
            <NavBarItem key={key} {...data} />
        )}
    </NavBarComponent>
);

export default NavBar;
