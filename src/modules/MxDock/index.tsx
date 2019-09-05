import React, { useState } from 'react';
import classNames from 'classnames';

// import observe from '../../utils/observe';
import Logo from '../../components/Logo';

import NavBar from './NavBar';
import Toggle from './Toggle';
import Panel from './Panel';
import PanelHeader from './PanelHeader';
import Authenticate from '../../components/Authenticate';
import Settings from './Settings';
import { getCurrentApp, BEAVER, SUPPORT } from '../../utils/environmentHelpers';
import { Provider } from '../../context/store';

import logoImage from '../../resources/img/black_mendix_logo.svg';
import '../../style/MxDock.scss';

interface MxDockProps {
    idTokenProviderMF?: string;
}

/**
 * `mx-underlay` is the css class of a modal element; its z-index is around 100.
 * Meaning that Header will be on top of the modal, which is weird.
 * So, we observe whenever `mx-underlay` appears, change Header's z-index to 99.
 * TODO:
 * change z-index of `mx-underlay` in the design system. So we can remove this observer.
 */
// let modalObserver: MutationObserver;

const MxDock: React.FC<MxDockProps> = ({ idTokenProviderMF }) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [isBackground, setIsBackground] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    // modalObserver = observe(() => {
    //     const elements = document.getElementsByClassName('mx-underlay');
    //     elements.length > 0 ? setIsBackground(true) : setIsBackground(false);
    // });

    // useEffect(() => () => modalObserver.disconnect());

    const currentApp = getCurrentApp();
    const showSettings = ![BEAVER, SUPPORT].includes(currentApp);

    const initialState = { idTokenProviderMF };
    return (
        <Provider initialState={initialState}>
            <div
                className={classNames(
                    'MxDock'
                    // { background: isBackground }
                )}
            >
                <div className="MxDock__base">
                    <Authenticate />
                    <Toggle onClick={toggle} />
                    {showSettings && <Settings />}
                </div>
                <Panel isOpen={isOpen}>
                    <PanelHeader>
                        <Toggle onClick={toggle} />
                        <Logo block="MxDock" src={logoImage} />
                    </PanelHeader>
                    <NavBar />
                </Panel>
            </div>
        </Provider>
    );
};

export default MxDock;
