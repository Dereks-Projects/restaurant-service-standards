// src/utils/analytics.js
import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-KV806MZ0LT'; // Replace with your actual ID

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};