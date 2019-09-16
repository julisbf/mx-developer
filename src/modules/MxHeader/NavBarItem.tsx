import React from 'react';

import NavBarMenuToggle from './NavBarMenuToggle';
import NavBarMenu from './NavBarMenu';

import { NodeInJsonFile } from '../../typings';

import { navigateByCallingMicroflow } from '../../utils/mxHelpers';
import { getEnvironmentLink } from '../../utils/environmentHelpers';

export interface NavBarItemProps extends NodeInJsonFile {
    isOnMobile: boolean;
    nodes?: NodeInJsonFile[];
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
        event.preventDefault();
        this.setState(({ isMenuOpen }) => ({ isMenuOpen: !isMenuOpen }));
    };

    render() {
        const {
            label,
            link: rawLink,
            microflow,
            nodes,
            external,
            isOnMobile,
        } = this.props;
        const { isMenuOpen } = this.state;
        const link = getEnvironmentLink(rawLink);
        const navigate = () => navigateByCallingMicroflow(microflow, link);
        const showNavBarMenuToggle = isOnMobile && nodes && nodes.length > 0;

        return (
            <div
                className={
                    isOnMobile
                        ? `MxHeader__nav-bar-item`
                        : `MxHeader__nav-bar-item--desktop`
                }
            >
                <a
                    href={link}
                    className={
                        isOnMobile
                            ? `MxHeader__nav-bar-item-link`
                            : `MxHeader__nav-bar-item-link--desktop`
                    }
                    target={external ? '_blank' : '_self'}
                    onClick={navigate}
                    role="button"
                    onKeyPress={navigate}
                >
                    {label}
                    {showNavBarMenuToggle && (
                        <NavBarMenuToggle
                            isOpen={isMenuOpen}
                            onClick={this.toggleMenu}
                        />
                    )}
                </a>

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
