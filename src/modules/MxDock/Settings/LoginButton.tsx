import React from 'react';
import { connect } from '../../../context/store';

import loginAvatar from '../../../resources/img/header/avatar.svg';

const LoginButton = ({ loginUrl }: { loginUrl: string }) => (
    <a href={loginUrl} className="MxDock__profile" title="Click here to login">
        <img
            src={loginAvatar}
            alt="Click here to login"
            className="MxDock__avatar"
        />
    </a>
);

export default connect()(React.memo(LoginButton));
