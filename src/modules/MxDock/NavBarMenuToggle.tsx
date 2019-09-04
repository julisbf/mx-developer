import React from 'react';

const NavBarMenuToggle = ({
    isOpen = false,
    onClick,
}: {
    isOpen: boolean;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) => (
    <button
        className={
            isOpen
                ? 'MxDock__nav-bar-menu-toggle--open'
                : 'MxDock__nav-bar-menu-toggle'
        }
        onClick={onClick}
    >
        {isOpen ? 'Close' : 'Expand'}
    </button>
);

export default NavBarMenuToggle;
