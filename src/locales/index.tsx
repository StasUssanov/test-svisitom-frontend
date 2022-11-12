import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import React from 'react';
import { LocaleSelector as LocaleSelectorBase } from './locale-selector';
import { LocaleSelectorProps } from './locale-selector/types';
import commonEN from './en/common.json';
import commonRU from './ru/common.json';
import navigationRU from './ru/navigation.json';
import navigationEN from './en/navigation.json';
import navigationRU from './ru/navigation.json';

const option: InitOptions = {
  resources: {
    ru: {
      common: commonRU,
      navigation: navigationRU,
    },
    en: {
      common: commonEN,
      navigation: navigationEN,
    },
  },
  lng: localStorage.getItem('sv-locale') ?? 'ru',
  // debug: true,

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
};

export const LocaleSelector: React.FC<LocaleSelectorProps> = (props) => (
  <LocaleSelectorBase languages={['ru', 'en']} {...props} />
);

export default i18n
  .use(initReactI18next)
  .init(option)
  .then();