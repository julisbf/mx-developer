import React from 'react';
import ReactDOM from 'react-dom';

import MxHeader from './components/MxHeader';
import CollaborationDock from './components/CollaborationDock';
import MxFooter from './components/MxFooter';
import { getItem, setItem, MX_PLATFORM } from './utils/localstorageHelpers';

import observe from './utils/observe';

import './style/MxHeader.scss';
import './style/MxFooter.scss';

let header: Element;
let footer: Element;

const mount = (className: string, Component: React.ComponentType<any>) => {
    const element = document.getElementsByClassName(className)[0];
    if (element) ReactDOM.render(<Component />, element);
    return element;
};

const { isShowingNew } = getItem(MX_PLATFORM, {
    isShowingNew: false, // if user is new, give an initial value
});

window.showNew = () => {
    setItem(MX_PLATFORM, { isShowingNew: true });
    // TODO: ask React to re-render
};

window.showOld = () => {
    setItem(MX_PLATFORM, { isShowingNew: false });
    // TODO: ask React to re-render
};

observe(observer => {
    header = mount('mxHeader', isShowingNew ? CollaborationDock : MxHeader);
    footer = mount('mxFooter', MxFooter);
    if (header && footer) {
        observer.disconnect();
    }
});
