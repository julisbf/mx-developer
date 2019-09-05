import React from 'react';

interface MobileMenuProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isOn: boolean;
}

const ToggleOnMobile = ({ onClick, isOn }: MobileMenuProps) => (
    <button
        onClick={onClick}
        className="MxHeader__toggle-on-mobile"
        type="button"
    >
        <span
            className={
                isOn
                    ? 'MxHeader__toggle-on-mobile-box--on'
                    : 'MxHeader__toggle-on-mobile-box'
            }
        >
            <span
                className={
                    isOn
                        ? 'MxHeader__toggle-on-mobile-middle-bar--on'
                        : 'MxHeader__toggle-on-mobile-middle-bar'
                }
            >
                Toggle
            </span>
        </span>
    </button>
);

export default ToggleOnMobile;
