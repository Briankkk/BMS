import React, { PureComponent, Fragment } from 'react';
import {Form,Card,Button,Divider,Input,InputNumber,Select,DatePicker,Popconfirm} from 'antd';
import moment from 'moment';
import { FormTable,FormField,FooterToolbar,ListEditableCell,EditableCell } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';

const { TextArea } = Input;

function disabledDate(current) {
  return current && current < moment().endOf('day');
}

@Form.create()
export default class PurchaseAdd extends PureComponent {

  render() {
    const {supplierList,loading,handleAdd,handleCancel,form} = this.props;

    const columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        render: (text, record, index)=><span>{index + 1}</span>
      },
      {
        title: '原料名称',
        dataIndex: 'MATER_ID',
        sorter:true,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select showSearch filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{ minWidth: 150, width: '100%' }} placeholder="请选择原料">
                {supplierList.map((supplier,idx) =>
                  <Select.Option key={`key_${idx}`} value={supplier.SUPPLIER_ID}>{supplier.SUPPLIER_NAME}</Select.Option>)
                }
              </Select>
            );
          }
          return text;
        },
      },
      {
        title: '原料数量',
        dataIndex: 'MATER_NUM',
        render: (text, record) => {
          if (record.editable) {
            return (
              <InputNumber
                value={text}
                autoFocus
              />
            );
          }
          return text;
        },
      },
      {
        title: '原料规格',
        dataIndex: 'MATER_SPEC',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                placeholder="原料规格"
                onChange={e => this.handleFieldChange(e, 'name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
              />
            );
          }
          return text;
        },
      },
      {
        title: '原料单价',
        dataIndex: 'UNIT_PRICE',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                placeholder="原料单价"
              />
            );
          }
          return text;
        },
      },
      {
        title: '原料总价',
        dataIndex: 'PRICE',
      },
      {
        title: '交货时间',
        dataIndex: 'DELIVER_DATE',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                placeholder="原料规格"
              />
            );
          }
          return text;
        },
      },
      {
        title: '备注',
        dataIndex: 'MATER_REMRAK',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                placeholder="原料规格"
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          //if (!!record.editable && this.state.loading) {
          //  return null;
          //}
          if (record.editable) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },


    ];

    return (
      <Fragment>
        <Card title="采购单概要" className={styles.card}  bordered={false}>
          <Form onSubmit={handleAdd}  style={{ marginTop: 8 }}>
            <FormField
              form={form}
              label="供应商"
              name="SUPPLIER_ID"
              required={true}
            >
              <Select showSearch filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{ width: '100%' }} placeholder="请选择供应商">
                {supplierList.map((supplier,idx) =>
                 <Select.Option key={`key_${idx}`} value={supplier.SUPPLIER_ID}>{supplier.SUPPLIER_NAME}</Select.Option>)
                }
              </Select>
            </FormField>
            <FormField
              form={form}
              label="交货时间"
              name="DELIVER_DATE"
              required={true}
            >
              <DatePicker disabledDate={disabledDate} style={{ width: '100%' }}/>
            </FormField>
            <FormField
              form={form}
              label="联系电话"
              name="PHONE"
            >
              <Input />
            </FormField>
            <FormField
              form={form}
              label="备注"
              name="REMARK"
            >
              <TextArea />
            </FormField>
          </Form>
        </Card>

        <Card title="采购单原料" bordered={false}>
          <FormField
            form={form}
            initialValue={[]}
            wrapperCol={{ span: 24 }}
            name="maters"
          >
            <FormTable columns={columns}/>
          </FormField>
        </Card>
        <FooterToolbar >
          <Button type="primary" loading={loading}>
            确定
          </Button>
          <Button type="ghost" style={{ marginLeft: 8 }} onClick={handleCancel} >
            取消
          </Button>
        </FooterToolbar>
      </Fragment>
    );
  }
}






