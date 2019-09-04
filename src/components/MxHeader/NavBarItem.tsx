import React from 'react';

import NavBarMenu, { Node } from './NavBarMenu';
import NavBarMenuToggle from './NavBarMenuToggle';
import { navigateByCallingMicroflow } from '../../utils/mxHelpers';
import { onSprintr } from '../../utils/environmentHelpers';

interface NavBarItemProps extends Node {
    isOnMobile: boolean;
    nodes?: Node[];
}

interface NavBarItemState {
    isMenuOpen: boolean;
}

/**
 * Use hyperlink or microflow
 * 1. if user is *on Sprintr*, use microflow to navigate *within* Sprintr
 *    because it's a lot faster than deeplink
 * 2. if the above condition is not met, always use deeplink (i.e. use hyperlink), e.g.
 *    - on Forum, go to Apps
 *    - on Sprintr, go to Apps
 *  */

class NavBarItem extends React.Component<NavBarItemProps, NavBarItemState> {
    state = { isMenuOpen: false };

    toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        this.setState(({ isMenuOpen }) => ({ isMenuOpen: !isMenuOpen }));
    };

    render() {
        const {
            label,
            link,
            microflow,
            nodes,
            external,
            isOnMobile,
        } = this.props;
        const { isMenuOpen } = this.state;
        const navigate = () => navigateByCallingMicroflow(microflow, link);

        return (
            <div
                className={
                    isOnMobile
                        ? 'MxHeader__nav-bar-item'
                        : 'MxHeader__nav-bar-item--desktop'
                }
            >
                {onSprintr() || (isOnMobile && nodes && nodes.length > 0) ? (
                    <span
                        className="MxHeader__nav-bar-item-link"
                        onClick={navigate}
                        role="button"
                        onKeyPress={navigate}
                    >
                        {label}
                        {isOnMobile && (
                            <NavBarMenuToggle
                                isOpen={isMenuOpen}
                                onClick={this.toggleMenu}
                            />
                        )}
                    </span>
                ) : (
                    <a
                        href={link}
                        className={
                            isOnMobile
                                ? 'MxHeader__nav-bar-item-link'
                                : 'MxHeader__nav-bar-item-link--desktop'
                        }
                        target={external ? '_blank' : '_self'}
                    >
                        {label}
                    </a>
                )}
                {((isOnMobile && isMenuOpen) || !isOnMobile) && (
                    <NavBarMenu
                        nodes={nodes}
                        isOnMobile={isOnMobile}
                    ></NavBarMenu>
                )}
            </div>
        );
    }
}

export default NavBarItem;
