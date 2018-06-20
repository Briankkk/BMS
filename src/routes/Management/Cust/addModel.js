import {Modal,Form,Input} from 'antd';
import {FormField } from 'components';


const AddModel = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleEdit,handleModalVisible,custInfo,editType } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        form.resetFields();
        if (editType === 'Add') {
          handleAdd(fieldsValue);
        } else if (editType === 'Mod') {
          handleEdit(custInfo.CUST_ID, fieldsValue);
        }
      }
    });
  };
  return (
    <Modal
      title="新建租户"
      destroyOnClose={true}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible(false,'',{})}
    >
      <FormField
        form={form}
        label="租户名称"
        name="CUST_NAME"
        required={true}
        initialValue={custInfo.CUST_NAME}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="租户编码"
        name="CUST_CODE"
        required={true}
        initialValue={custInfo.CUST_CODE}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="联系电话"
        name="CUST_PHONE"
        initialValue={custInfo.CUST_PHONE}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="联系地址"
        name="CUST_ADDRESS"
        initialValue={custInfo.CUST_ADDRESS}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="传真"
        name="FAX"
        initialValue={custInfo.FAX}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="税号"
        name="TAX_NUMBER"
        initialValue={custInfo.TAX_NUMBER}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="银行名称"
        name="BANK_NAME"
        initialValue={custInfo.BANK_NAME}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="银行账号"
        name="BANK_ACCOUNT"
        initialValue={custInfo.BANK_ACCOUNT}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="银行账户"
        name="BANK_NUMBER"
        initialValue={custInfo.BANK_NUMBER}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="仓库地址"
        name="STORE_HOUSE"
        initialValue={custInfo.STORE_HOUSE}
      >
        <Input />
      </FormField>

    </Modal>
  );
});

export default AddModel;
