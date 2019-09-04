import React from 'react';
import { navigateByCallingMicroflow } from '../utils/mxHelpers';
import {
    SPRINTR,
    getCurrentApp,
    getEnvironmentLink,
} from '../utils/environmentHelpers';

import { connect } from '../context/store';
import { links, microflows } from '../resources/mendix.json';
import logoImage from '../resources/img/mx_logo.png';

const currentApp = getCurrentApp();

interface LogoProps {
    loginUrl: string;
    loggedIn: boolean;
    block: string;
}

const Logo = ({ loginUrl, loggedIn, block }: LogoProps) => {
    const homeUrl = loggedIn ? getEnvironmentLink(links.home) : loginUrl;
    const navigateToHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (currentApp === SPRINTR) {
            event.preventDefault();
            navigateByCallingMicroflow(microflows.sprintr.home, homeUrl);
        }
    };
    return (
        <a href={homeUrl} onClick={navigateToHome} className={`${block}__home`}>
            <img src={logoImage} alt="Logo" className={`${block}__logo`} />
        </a>
    );
};

export default connect()(React.memo(Logo));
