import React, { useState } from 'react';

import NavBarMenu, { Node } from './NavBarMenu';
import Toggle from './NavBarMenuToggle';
import { navigateByCallingMicroflow } from '../../utils/mxHelpers';
import { onSprintr } from '../../utils/environmentHelpers';

export interface NavBarItemProps extends Node {
    nodes?: Node[];
}

/**
 * Use hyperlink or microflow
 * 1. if user is *on Sprintr*, use microflow to navigate *within* Sprintr
 *    because it's a lot faster than deeplink
 * 2. if the above condition is not met, always use deeplink (i.e. use hyperlink), e.g.
 *    - on Forum, go to Apps
 *    - on Sprintr, go to Apps
 *  */

const NavBarItem: React.FC<NavBarItemProps> = ({
    label,
    link,
    microflow,
    nodes,
    external,
}: NavBarItemProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    const navigate = () => navigateByCallingMicroflow(microflow, link);

    return (
        <div className="MxDock__nav-bar-item">
            {onSprintr() || (nodes && nodes.length > 0) ? (
                <span
                    className="MxDock__nav-bar-item-link"
                    onClick={navigate}
                    role="button"
                    onKeyPress={navigate}
                >
                    {label}
                    <Toggle isOpen={isMenuOpen} onClick={toggleMenu} />
                </span>
            ) : (
                <a
                    href={link}
                    className="MxDock__nav-bar-item-link"
                    target={external ? '_blank' : '_self'}
                >
                    {label}
                </a>
            )}
            {isMenuOpen && <NavBarMenu nodes={nodes}></NavBarMenu>}
        </div>
    );
};

export default NavBarItem;
