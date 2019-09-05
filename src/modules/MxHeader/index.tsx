import React from 'react';
import debounce from 'tiny-debounce';

import observe from '../../utils/observe';
import Authenticate from '../../components/Authenticate';
import ToggleOnMobile from './ToggleOnMobile';
import Logo from '../../components/Logo';
import NavBar from './NavBar';
import Settings from './Settings';
import { getCurrentApp, BEAVER, SUPPORT } from '../../utils/environmentHelpers';
import { getWindowSize, PHONE, SCREEN_SM } from '../../utils/screenSizeHelpers';
import { Provider } from '../../context/store';

import logoImage from '../../resources/img/mx_logo.png';
import '../../style/MxHeader.scss';

interface MxHeaderProps {
    idTokenProviderMF?: string;
}

interface MxHeaderState {
    isMobileNavBarOpen: boolean;
    setAsBackground: boolean;
}

/**
 * `mx-underlay` is the css class of a modal element; its z-index is around 100.
 * Meaning that Header will be on top of the modal, which is weird.
 * So, we observe whenever `mx-underlay` appears, change Header's z-index to 99.
 * TODO:
 * change z-index of `mx-underlay` in the design system. So we can remove this observer.
 */
let modalObserver: MutationObserver;

class MxHeader extends React.Component<MxHeaderProps, MxHeaderState> {
    state = { isMobileNavBarOpen: false, setAsBackground: false };

    componentDidMount() {
        window.addEventListener('resize', this.closeMobileMenuOnBigScreen);
        modalObserver = observe(() => {
            const elements = document.getElementsByClassName('mx-underlay');
            elements.length > 0
                ? this.setState({ setAsBackground: true })
                : this.setState({ setAsBackground: false });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.closeMobileMenuOnBigScreen);
        modalObserver && modalObserver.disconnect();
    }

    closeMobileMenuOnBigScreen = debounce(() => {
        const { isMobileNavBarOpen } = this.state;
        const windowSize = getWindowSize(window.innerWidth);
        const shouldShowMobileMenu = [PHONE, SCREEN_SM].includes(windowSize);
        if (!shouldShowMobileMenu && isMobileNavBarOpen)
            this.setState({ isMobileNavBarOpen: false });
    }, 100);

    toggleMobileNavBar = () =>
        this.setState(({ isMobileNavBarOpen }) => ({
            isMobileNavBarOpen: !isMobileNavBarOpen,
        }));

    render() {
        const { idTokenProviderMF } = this.props;
        const { isMobileNavBarOpen, setAsBackground } = this.state;

        const currentApp = getCurrentApp();
        const showSettings = ![BEAVER, SUPPORT].includes(currentApp);

        const initialState = { idTokenProviderMF };
        return (
            <Provider initialState={initialState}>
                <div
                    className={
                        !setAsBackground
                            ? 'MxHeader__container'
                            : 'MxHeader__container--background'
                    }
                >
                    <div className="MxHeader">
                        <Authenticate />
                        <ToggleOnMobile
                            onClick={this.toggleMobileNavBar}
                            isOn={isMobileNavBarOpen}
                        />
                        <Logo block="MxHeader" src={logoImage} />
                        <NavBar isMobileNavBarOpen={isMobileNavBarOpen} />
                        <div className="MxHeader__white-space"></div>
                        {showSettings && <Settings />}
                    </div>
                </div>
            </Provider>
        );
    }
}

export default MxHeader;
