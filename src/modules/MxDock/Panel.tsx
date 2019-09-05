import React from 'react';

interface PanelProps {
    children: React.ReactChild | React.ReactChild[];
    isOpen: boolean;
}

const Panel = ({ children, isOpen }: PanelProps) => {
    return (
        <div className={isOpen ? 'MxDock__panel--open' : 'MxDock__panel'}>
            {children}
        </div>
    );
};

export default Panel;
