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
                ? 'MxHeader__nav-bar-menu-toggle--open'
                : 'MxHeader__nav-bar-menu-toggle'
        }
        onClick={onClick}
        type="button"
    >
        {isOpen ? 'Close' : 'Expand'}
    </button>
);

export default NavBarMenuToggle;
