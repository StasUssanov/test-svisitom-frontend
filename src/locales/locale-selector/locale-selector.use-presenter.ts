import { LocaleSelectorProps } from './types';
import { useTranslation } from 'react-i18next';

export const usePresenter = (props: LocaleSelectorProps) => {
  const { i18n } = useTranslation();
  const { language, changeLanguage } = i18n;
  const { languages = props.languages ?? ['ru', 'en'] } = props;

  const handleLangChange = (lang: string) => {
    changeLanguage(lang).then(() => {
      localStorage.setItem('sv-locale', lang);
    });
  };

  return ({
    language,
    languages,
    changeLanguage: handleLangChange,
  });
};
