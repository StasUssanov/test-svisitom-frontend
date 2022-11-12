import React, { useState } from 'react';
import './auth-page.less';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '__root/components';
import { Button, Card, Form, Input, Spin } from 'antd';
import { usePresenter } from './auth-page.use-presenter';
import { LoadingOutlined } from '@ant-design/icons';
import { LocaleSelector } from '__root/locales';

export const AuthPage: React.FC = () => {
  const { t } = useTranslation('auth');
  const [form] = Form.useForm();
  const [isSignUp, setIsSignUp] = useState(false);
  const pr = usePresenter(form, isSignUp);

  const renderTitleExtra = (
    <Button
      type={'text'}
      onClick={() => setIsSignUp(prevState => !prevState)}
      children={isSignUp ? t('button.signIn') : t('button.signUp')}
    />
  );

  return (
    <MainLayout
      showHeader={false}
      className={'sv-auth-page'}
    >
      <Spin
        spinning={pr.loading}
        indicator={<LoadingOutlined spin/>}
        tip={`${t('common:label.loading')}...`}
      >
        <Card
          title={isSignUp ? t('label.signUp') : t('label.signIn')}
          extra={renderTitleExtra}
        >
          <Form
            name={'basic'}
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete={'off'}
          >
            <Form.Item
              label={t('label.username')}
              name={'username'}
              rules={[{ required: true, message: `${t('message.inputUsername')}` }]}
              children={<Input/>}
            />

            <Form.Item
              label={t('label.password')}
              name={'password'}
              rules={[{ required: true, message: `${t('message.inputPassword')}` }]}
              children={<Input.Password/>}
            />

            {isSignUp && <Form.Item
              label={t('label.confirmPassword')}
              name={'confirmPassword'}
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: isSignUp, message: `${t('message.confirmPassword')}` },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) return Promise.resolve();
                    return Promise.reject(new Error(t('message.confirmPasswordNotMatch')));
                  },
                }),
              ]}
              children={<Input.Password/>}
            />}

            <div className={'sv-auth-page__modal_footer'}>
              <Button
                type={'primary'}
                htmlType={'submit'}
                children={isSignUp ? t('button.signUp') : t('button.signIn')}
                onClick={pr.onSubmitModal}
              />
              <LocaleSelector/>
            </div>
          </Form>
        </Card>
      </Spin>
    </MainLayout>
  );
};
