import { useState } from 'react';
import { authApi } from '__root/api';
import { useNavigate } from 'react-router-dom';
import { routeList } from '__root/router';
import { config } from '__root/config';

export const usePresenter = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateLocalStorage = (key: string, value?: string) => {
    if (value === null || value === undefined) localStorage.removeItem(key);
    else localStorage.setItem(key, value.toString());
  };

  const handlerOnSignOut = () => {
    setLoading(true);
    authApi.signOut().then(() => {
      updateLocalStorage(config.tokens.access);
      updateLocalStorage(config.tokens.refresh);
      navigate(routeList.auth.path, { replace: true });
    }).finally(() => setLoading(false));
  };

  return ({
    loading,
    onSignOut: handlerOnSignOut,
  });
};
