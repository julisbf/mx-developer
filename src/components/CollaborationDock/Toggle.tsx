import React from 'react';

interface ToggleProps {
    onClick: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ onClick }) => {
    return <div onClick={onClick}></div>;
};

export default Toggle;
