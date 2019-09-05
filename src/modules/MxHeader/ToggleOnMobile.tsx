import React from 'react';

interface MobileMenuProps {
    toggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isOn: boolean;
}

const ToggleOnMobile = ({ toggle, isOn }: MobileMenuProps) => (
    <button
        onClick={toggle}
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
            />
        </span>
    </button>
);

export default ToggleOnMobile;
