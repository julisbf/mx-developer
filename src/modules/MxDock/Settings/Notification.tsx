import React from 'react';

import { navigateByCallingMicroflow } from '../../../utils/mxHelpers';
import {
    onSprintr,
    getEnvironmentLink,
} from '../../../utils/environmentHelpers';
import { links, microflows } from '../../../resources/mendix.json';

const Notification = () => {
    const deepLink = getEnvironmentLink(links.sprintr.notifications);
    const onClick = () =>
        navigateByCallingMicroflow(microflows.sprintr.notifications, deepLink);

    return onSprintr() ? (
        <a
            href={getEnvironmentLink(links.sprintr.notifications)}
            className="MxDock__notification"
        >
            Notification
        </a>
    ) : (
        <button
            className="MxDock__notification"
            onClick={onClick}
            onKeyDown={onClick}
        >
            Notification
        </button>
    );
};

export default Notification;
