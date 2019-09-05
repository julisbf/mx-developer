import React from 'react';
import ReactDOM from 'react-dom';

import Selector from './modules/Selector';
import MxFooter from './modules/MxFooter';

import observe from './utils/observe';

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
        header = mount('mxHeader', Selector);
        footer = mount('mxFooter', MxFooter);
        if (header && footer) {
            observer.disconnect();
        }
    });
};

loadComponent();
