import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import React from 'react';
import { LocaleSelector as LocaleSelectorBase } from './locale-selector';
import { LocaleSelectorProps } from './locale-selector/types';
import commonEN from './en/common.json';
import commonRU from './ru/common.json';
import navigationRU from './ru/navigation.json';
import navigationEN from './en/navigation.json';
import authRU from '__root/locales/ru/auth.json';
import authEN from '__root/locales/en/auth.json';
import homeRU from '__root/locales/ru/home.json';
import homeEN from '__root/locales/en/home.json';

const option: InitOptions = {
  resources: {
    ru: {
      auth: authRU,
      common: commonRU,
      home: homeRU,
      navigation: navigationRU,
    },
    en: {
      auth: authEN,
      common: commonEN,
      home: homeEN,
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
