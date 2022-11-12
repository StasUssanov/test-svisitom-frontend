import React, { useMemo } from 'react';
import { usePresenter } from './locale-selector.use-presenter';
import { LocaleSelectorProps } from './types';
import { Button, Dropdown, MenuProps } from 'antd';

export const LocaleSelector: React.FC<LocaleSelectorProps> = (props) => {
  const pr = usePresenter(props);

  const items: MenuProps['items'] = useMemo(() => pr.languages
    .filter(item => item !== pr.language)
    .map(item => ({
        key: `locale-selector-key-${item}`,
        label: item.toLocaleUpperCase(),
        onClick: () => pr.changeLanguage(item),
      }),
    ), [pr.language]);

  return (
    <div className={'sv-locale-selector'}>
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        arrow
      >
        <Button
          shape={'circle'}
          type={'ghost'}
          children={pr.language.toUpperCase()}
        />
      </Dropdown>
    </div>
  );
};
