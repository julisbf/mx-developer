import React from 'react';

interface PanelHeaderProps {
    children: React.ReactChild | React.ReactChild[];
}

const PanelHeader = ({ children }: PanelHeaderProps) => {
    return <div className="MxDock__panel-header">{children}</div>;
};

export default PanelHeader;
