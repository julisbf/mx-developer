import React from 'react';

import supportMenuItems from '../../../resources/menu/support.json';

const SupportMenu = () => (
    <ul className="MxDock__support-menu">
        {supportMenuItems.map(item => (
            <li className="MxDock__support-menu-item" key={item.url}>
                <a className="MxDock__support-menu-item-link" href={item.url}>
                    {item.label}
                </a>
            </li>
        ))}
    </ul>
);

const Support = () => (
    <div className="MxDock__support">
        <SupportMenu />
    </div>
);

export default Support;
