import React from 'react';
import ReactDOM from 'react-dom';

import HeaderContainer from './modules/HeaderContainer';
import MxFooter from './modules/MxFooter';

import observe from './utils/observe';

import './style/MxHeader.scss';
import './style/MxFooter.scss';

let header: Element;
let footer: Element;

declare global {
    interface Window {
        __MXOpenID: string;
        showNew: () => void;
        showOld: () => void;
    }
}

const mount = (className: string, Component: React.ComponentType<any>) => {
    const element = document.getElementsByClassName(className)[0];
    if (element) ReactDOM.render(<Component />, element);
    return element;
};

const loadComponent = () => {
    observe(observer => {
        header = mount('mxHeader', HeaderContainer);
        footer = mount('mxFooter', MxFooter);
        if (header && footer) {
            observer.disconnect();
        }
    });
};

loadComponent();
