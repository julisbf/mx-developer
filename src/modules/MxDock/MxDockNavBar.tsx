import React from 'react';

import NavBar from '../../components/NavBar';
import NavBarItem, { NavBarItemProps } from './NavBarItem';

const MxDockNavBar = () => (
    <NavBar className="MxDock__nav-bar">
        {({ key, ...data }: NavBarItemProps) => (
            <NavBarItem key={key} {...data} />
        )}
    </NavBar>
);

export default MxDockNavBar;
