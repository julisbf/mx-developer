import React from 'react';

interface MobileMenuProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Toggle = ({ onClick }: MobileMenuProps) => (
    <button onClick={onClick} className="MxDock__toggle" type="button">
        Toggle
    </button>
);

export default Toggle;
