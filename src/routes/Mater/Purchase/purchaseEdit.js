import React, { PureComponent, Fragment } from 'react';
import {Form,Card,Button,Divider,Input,Select,DatePicker,Icon,Popover} from 'antd';
import moment from 'moment';
import { FormField,FooterToolbar} from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';
import TableForm from './tableForm';
import { disabledDateBefore } from '../../../utils/utils';

const { TextArea } = Input;

const fieldLabels = {
  SUPPLIER_ID: '供应商',
  DELIVER_DATE: '交货时间',
  maters:'原料'
};

@Form.create()
export default class PurchaseEdit extends PureComponent {

  render() {
    const {supplierList,materList,loading,handleAdd,handleCancel,form} = this.props;

    const validate = () => {
      form.validateFieldsAndScroll((error, values) => {
        if (!error) {
          let maters = [];
          for (let mater of values.maters) {
            maters.push({
              MATER_ID: mater.MATER_ID.key,
              MATER_NUM: mater.MATER_NUM,
              UNIT_PRICE: mater.UNIT_PRICE,
              PRICE:(mater.UNIT_PRICE)?parseInt(mater.UNIT_PRICE)*parseInt(mater.MATER_NUM):mater.PRICE,
              MATER_SPEC: mater.MATER_SPEC,
              DELIVER_DATE:(mater.DELIVER_DATE)?mater.DELIVER_DATE:values.DELIVER_DATE.format('YYYY-MM-DD'),
              MATER_REMRAK: mater.MATER_REMRAK
            });
          }
          handleAdd({
            SUPPLIER_ID: values.SUPPLIER_ID,
            DELIVER_DATE: values.DELIVER_DATE.format('YYYY-MM-DD'),
            PHONE: values.PHONE,
            REMARK: values.REMARK
          }, maters);
        }
      });
    };

    const errors = form.getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon}/>
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle"/>
          </Popover>
          {errorCount}
        </span>
      );
    };

    return (
      <Fragment>
        <Card title="采购单概要" className={styles.card} bordered={false}>
          <Form onSubmit={handleAdd} style={{ marginTop: 8 }}>
            <FormField
              form={form}
              label="供应商"
              name="SUPPLIER_ID"
              required={true}
            >
              <Select showSearch
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      style={{ width: '100%' }} placeholder="请选择供应商">
                {supplierList.map((supplier, idx) =>
                  <Select.Option key={`key_${idx}`}
                                 value={supplier.SUPPLIER_ID}>{supplier.SUPPLIER_NAME}</Select.Option>)
                }
              </Select>
            </FormField>
            <FormField
              form={form}
              label="交货时间"
              name="DELIVER_DATE"
              required={true}
            >
              <DatePicker disabledDate={disabledDateBefore} style={{ width: '100%' }}/>
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
            required={true}
            name="maters"
          >
            <TableForm materList={materList}/>
          </FormField>
        </Card>
        <FooterToolbar >
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={loading}>
            确定
          </Button>
          <Button type="ghost" style={{ marginLeft: 8 }} onClick={handleCancel}>
            取消
          </Button>
        </FooterToolbar>
      </Fragment>
    );
  }
}






