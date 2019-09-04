import React from 'react';

import { links } from '../../../resources/mendix.json';

const StartButton = () => (
    <a href={links.signup} className="MxDock__start-button">
        Start For Free
    </a>
);

export default StartButton;
