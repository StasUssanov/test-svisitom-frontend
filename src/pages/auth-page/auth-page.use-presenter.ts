import { FormInstance, message } from 'antd';
import { useState } from 'react';
import SHA from 'jssha';
import { authApi } from '__root/api';
import { useNavigate } from 'react-router-dom';
import { routeList } from '__root/router';
import { config } from '__root/config';

export const usePresenter = (form: FormInstance, isSignUp: boolean) => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitModal = () => {
    form.validateFields()
      .then((values) => {
        setLoading(true);

        const shaObj = new SHA('SHA-1', 'TEXT', { encoding: 'UTF8' });
        shaObj.update(values.password);
        const request = {
          username: values.username.trim(),
          password: shaObj.getHash('HEX'),
        };

        if (isSignUp) authApi.signUp(request).then(handlerResult);
        else authApi.signIn(request).then(handlerResult);
      })
      .finally(() => setLoading(false));
  };

  const updateLocalStorage = (key: string, value?: string) => {
    if (value === null || value === undefined) localStorage.removeItem(key);
    else localStorage.setItem(key, value.toString());
  };

  const handlerResult = (params: { status: string, accessToken?: string, refreshToken?: string }) => {
    if (params.status === 'SUCCESS') {
      updateLocalStorage(config.tokens.access, params.accessToken);
      updateLocalStorage(config.tokens.refresh, params.refreshToken);
      navigate(routeList.home.path);
    } else {
      updateLocalStorage(config.tokens.access);
      updateLocalStorage(config.tokens.refresh);
      message.warning(params.status).then();
    }
  };

  return ({
    loading,
    onSubmitModal,
  });
};
