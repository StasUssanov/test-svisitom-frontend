import React, { useState } from 'react';
import './home-page.less';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '__root/components';
import { Badge, Button, Form, Input, Modal, PageHeader, Space, Table, Typography } from 'antd';
import { usePresenter } from './home-page.use-presenter';
import { Moment } from 'moment';
import { ColumnsType } from 'antd/es/table';
import { TStatusDto } from '__root/api';

export const HomePage: React.FC = () => {
  const pr = usePresenter();
  const { t } = useTranslation('home');

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [openModalNodeEdit, setOpenModalNodeEdit] = useState<TStatusDto>();
  const [form] = Form.useForm();

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => setSelectedRowKeys(newSelectedRowKeys),
  };

  const cleanSelectedRowKeys = () => {
    setSelectedRowKeys([]);
  };

  const renderTableExtra = (<Space>
    <Typography.Text
      children={t('label.toggle-status')}
    />
    <Button
      disabled={!Boolean(selectedRowKeys.length)}
      children={t('button.power-on')}
      onClick={() => pr.toggleStatus(selectedRowKeys, true, cleanSelectedRowKeys)}
    />
    <Button
      disabled={!Boolean(selectedRowKeys.length)}
      children={t('button.power-off')}
      onClick={() => pr.toggleStatus(selectedRowKeys, false, cleanSelectedRowKeys)}
    />
  </Space>);

  const renderNameCell = (value: string, node: TStatusDto) => (<span
    children={value}
    onClick={() => {
      form.setFieldsValue(node);
      setOpenModalNodeEdit(node);
    }}
  />);

  const renderNameForm: React.ReactNode = (
    <Form
      name={'basic'}
      form={form}
      layout={'vertical'}
    >
      <Form.Item
        name={'uuid'}
        children={<input/>}
        hidden
      />

      <Form.Item
        name={'name'}
        label={t('label.name')}
        rules={[{ min: 3, message: `${t('message.min')}` }]}
        children={<Input/>}
      />
    </Form>
  );

  const renderDateCell = (value: Moment) => (<span
    children={value.format('DD.MM.y')}
  />);

  const renderStatusCell = (value: boolean) => (<Badge
    status={value ? 'processing' : 'default'}
    text={t(value ? 'label.power-on' : 'label.power-off')}
  />);

  const columns: ColumnsType<TStatusDto> = [
    {
      title: t('label.serialNumber'),
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      sorter: {
        compare: (a: TStatusDto, b: TStatusDto) => {
          if (a?.serialNumber && b.serialNumber) return a.serialNumber.localeCompare(b.serialNumber);
          return 0;
        },
      },
    },
    {
      className: 'sv-table-cell__name',
      title: t('label.name'),
      dataIndex: 'name',
      key: 'name',
      render: renderNameCell,
      sorter: {
        compare: (a: TStatusDto, b: TStatusDto) => {
          if (a.name && b.name) return a.name.localeCompare(b.name);
          return 0;
        },
      },
    },
    {
      title: t('label.date'),
      dataIndex: 'date',
      key: 'date',
      render: renderDateCell,
      sorter: {
        compare: (a: TStatusDto, b: TStatusDto) => {
          if (a.date && b.date) return a.date.unix() - b.date.unix();
          return 0;
        },
      },
    },
    {
      title: t('label.status'),
      dataIndex: 'status',
      key: 'status',
      render: renderStatusCell,
      sorter: {
        compare: (a: TStatusDto, b: TStatusDto) => Number(a.status) - Number(b.status),
      },
    },
  ];

  const handleOk = () => {
    form.validateFields().then(values => {
      pr.update(
        values,
        () => {
          form.resetFields();
          setOpenModalNodeEdit(undefined);
        },
      );
    });
  };

  const handleCancel = () => {
    setOpenModalNodeEdit(undefined);
  };

  return (
    <MainLayout>
      <PageHeader
        title={t('common:label.homePage')}
        ghost={false}
        extra={renderTableExtra}
      >
        <Table
          loading={pr.loading}
          columns={columns}
          rowKey={'uuid'}
          rowSelection={rowSelection}
          dataSource={pr.dataSource}
        />;
      </PageHeader>
      <Modal
        open={Boolean(openModalNodeEdit)}
        destroyOnClose={true}
        confirmLoading={pr.loading}
        okText={t('common:button.update')}
        cancelText={t('common:button.cancel')}
        onOk={handleOk}
        onCancel={handleCancel}
        children={renderNameForm}
      />
    </MainLayout>
  );
};
