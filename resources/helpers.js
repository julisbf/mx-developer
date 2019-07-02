/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }] */
import Vue from 'vue';

const getEnvironment = () => {
  const domain = location.origin;

  if (
    domain.indexOf('-test.mendixcloud.com') !== -1 ||
    domain.indexOf('home-test.mendix.com') !== -1 ||
    domain.indexOf('home-test.mendix.dev') !== -1
  ) {
    return '-test';
  } else if (
    domain.indexOf('-accp.mendixcloud.com') !== -1 ||
    domain.indexOf('home-accp.mendix.com') !== -1 ||
    domain.indexOf('home-accp.mendix.dev') !== -1
  ) {
    return '-accp';
  }

  return '';
};

const sprintrRegEx = /https:\/\/(.+?\.|)sprintr\.home(-test|-accp)?\.(mendix\.(com|dev)|dev\.mendix\.com)/;
const cloudRegEx = /https:\/\/(.+?\.|)cloud\.home(-test|-accp)?\.(mendix\.(com|dev)|dev\.mendix\.com)/;

const heimdDalRegEx = /https:\/\/(.+?\.|)cdp(-test|-accp)?\.(mendixcloud\.com|mendix\.dev|dev\.mendix\.com)/;
const brokkrRegEx = /https:\/\/(.+?\.|)clp(-test|-accp)?\.(mendixcloud\.com|mendix\.dev|dev\.mendix\.com)/;

const appstoreRegEx = /https:\/\/(.+?\.|)appstore\.home(-test|-accp)?\.(mendix\.(com|dev)|dev\.mendix\.com)/;
const beaverRegEx = /https:\/\/(.+?\.|)sapodatamodelcreator(-test|-accp)?\.(mendixcloud\.com|mendix\.dev|dev\.mendix\.com)/;

const modelShareRegEx = /https:\/\/modelshare\.mendixcloud\.com/;

const forumRegEx = /https:\/\/forum\.mendixcloud\.com/;

const onSprintr = () => sprintrRegEx.test(location.origin);
const onCloud = () => cloudRegEx.test(location.origin);

const onHeimdal = () => heimdDalRegEx.test(location.origin);
const onBrokkr = () => brokkrRegEx.test(location.origin);

const onAppStore = () => appstoreRegEx.test(location.origin);
const onBeaver = () => beaverRegEx.test(location.origin);

const onModelShare = () => modelShareRegEx.test(location.origin);
const onForum = () => forumRegEx.test(location.origin);

const mxEnv = () => {
  if (onSprintr()) {
    return 'sprintr';
  }
  if (onCloud()) {
    return 'cloud';
  }
  if (onAppStore()) {
    return 'appstore';
  }
  if (onHeimdal()) {
    return 'heimdal';
  }
  if (onBrokkr()) {
    return 'brokkr';
  }
  if (onBeaver()) {
    return 'beaver';
  }
  if (onModelShare()) {
    return 'modelshare';
  }
  if (onForum()) {
    return 'forum';
  }
  return 'community';
};

const replaceEnvLink = link => {
  if (link && link.indexOf('developer.mendixcloud.com') !== -1) {
    return link.replace('developer.mendixcloud.com', `developer${getEnvironment()}.mendixcloud.com`);
  }
  if (!link || link.indexOf('home.mendix.com') === -1) {
    return link;
  }
  if (location.origin.indexOf('home.mendix.dev') !== -1) {
    return link.replace('home.mendix.com', `home.mendix.dev`);
  }
  if (location.origin.indexOf('dev.mendix.com') !== -1) {
    // MXLAB integration (https://prefix.app.home.dev.mendix.com)
    const urlParts = location.origin.split('.').map(part => part.replace(/http(s)?:\/\//, ''));
    const firstPart = urlParts[0];
    const nonIndex = ['sprintr', 'sprintr', 'home', 'cloud', 'cdp', 'cdp-test', 'cdp-accp', 'clp', 'clp-test', 'clp-accp', 'appstore'].indexOf(firstPart) === -1;
    if (nonIndex) {
      return link.replace(/(http(s)?:\/\/)/, `$1${firstPart}.`).replace('home.mendix.com', `home.dev.mendix.com`);
    }
    return link.replace('home.mendix.com', `home.dev.mendix.com`);
  }
  return link.replace('home.mendix.com', `home${getEnvironment()}.mendix.com`);
};

const constants = {
  copyRight: `Copyright &copy; ${(new Date()).getFullYear()} Mendix Technology B.V.`
};

const urls = {
  platform: replaceEnvLink('https://home.mendix.com/'),
  developer: replaceEnvLink('https://sprintr.home.mendix.com/link/myprofile'),
  community: replaceEnvLink('https://developer.mendixcloud.com/link/dashboard/'),
  github: 'https://github.com/mendix',
  twitter: 'https://twitter.com/MendixDeveloper',
  linkedin: 'https://www.linkedin.com/company/mendix',
  googleplus: 'https://plus.google.com/+MendixSocial',
  facebook: 'https://www.facebook.com/mendixsoftware',
  instagram: 'https://www.instagram.com/mendixinc/'
};

const isSmallViewport = () => window.innerWidth <= 992;
const isPhoneViewport = () => window.innerWidth <= 480;

const clickMf = (mfName, fallback = false, showProgress = false) => {
  if (window.mx && window.mx.data && window.mx.data.action) {
    let p = null;
    if (showProgress && window.mx.ui.showProgress) {
      p = window.mx.ui.showProgress();
    }
    window.mx.data.action({
      params: {
        actionname: mfName
      },
      callback: () => {
        if (showProgress && window.mx.ui.hideProgress && p !== null) {
          window.mx.ui.hideProgress(p);
        }
      },
      error: () => {
        if (showProgress && window.mx.ui.hideProgress && p !== null) {
          window.mx.ui.hideProgress(p);
        }
        if (fallback) {
          window.location = fallback;
        }
      }
    });
  } else if (fallback) {
    window.location = fallback;
  }
};

const waitForElementIdCb = (id, func, num = 200) => {
  const el = document.getElementById(id);
  if (el !== null) {
    func(el, num);
    return;
  }
  if (num <= 0) {
    return; // console.log(`[MX-HEADER-FOOTER] Cannot find element with ID: ${id}`);
  }
  setTimeout(() => {
    waitForElementIdCb(id, func, num - 1);
  }, 10);
};

const waitForElementId = (id, vueComponent, store, num = 200) => {
  const el = document.getElementById(id);
  if (el !== null) {
    const ignoredElement = new Vue({
      el: `#${id}`,
      store,
      render: h => h(vueComponent)
    });
    return;
  }
  if (num <= 0) {
    return; // console.log(`[MX-HEADER-FOOTER] Cannot find element with ID: ${id}`);
  }
  setTimeout(() => {
    waitForElementId(id, vueComponent, store, num - 1);
  }, 10);
};

const waitFor = (predicate, callback, timeoutCallback = () => {}, num = 200) => {
  if (predicate()) {
    callback();
    return;
  }
  if (num <= 0) {
    timeoutCallback();
    return;
  }
  setTimeout(() => {
    waitFor(predicate, callback, timeoutCallback, num - 1);
  }, 10);
};

const waitForMX = (callback, timeoutCallback = () => {}) =>
  waitFor(() => typeof window.mx !== 'undefined' && window.mx.session, callback, timeoutCallback);

const hasElement = className => document.getElementsByClassName(className).length > 0;

const waitForElementClass = (className, vueComponent, store, num = 200) => {
  const el = document.getElementsByClassName(className);
  if (el.length === 1) {
    const ignoredElement = new Vue({
      el: `.${className}`,
      store,
      render: h => h(vueComponent)
    });
    return;
  }
  if (num <= 0) {
    return; // console.log(`[MX-HEADER-FOOTER] Cannot find element with ID: ${id}`);
  }
  setTimeout(() => {
    waitForElementClass(className, vueComponent, store, num - 1);
  }, 10);
};

const getSideBarToggle = () => {
  if (!window.mx || !window.dijit || !window.dijit.registry) {
    return null;
  }
  const sidebarToggles = window.dijit.registry.toArray().filter(w => w.id && w.id.indexOf('mxui_widget_SidebarToggleButton') !== -1);
  if (sidebarToggles.length) {
    return sidebarToggles[0];
  }
  return null;
};

export {
  urls,
  isSmallViewport,
  isPhoneViewport,
  constants,
  hasElement,
  onSprintr,
  onCloud,
  onAppStore,
  onHeimdal,
  onBrokkr,
  onBeaver,
  onModelShare,
  waitForElementId,
  waitForElementIdCb,
  waitForElementClass,
  waitForMX,
  clickMf,
  getSideBarToggle,
  replaceEnvLink,
  mxEnv
};
