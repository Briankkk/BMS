import {Modal,Form,Input} from 'antd';
import {FormField } from 'components';


const CustomerModel = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleEdit,handleModalVisible,customerInfo,editType } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        form.resetFields();
        if (editType === 'Add') {
          handleAdd(fieldsValue);
        } else if (editType === 'Mod') {
          handleEdit(customerInfo.CUSTOMER_ID, fieldsValue);
        }
      }
    });
  };
  return (
    <Modal
      title="新建客户"
      destroyOnClose={true}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible(false,'',{})}
    >
      <FormField
        form={form}
        label="客户名称"
        name="CUSTOMER_NAME"
        required={true}
        initialValue={customerInfo.CUSTOMER_NAME}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="客户简称"
        name="CUSTOMER_SHORT_NAME"
        required={true}
        initialValue={customerInfo.CUSTOMER_SHORT_NAME}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="客户编码"
        name="CUSTOMER_CODE"
        required={true}
        initialValue={customerInfo.CUSTOMER_CODE}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="联系人"
        name="LINKMAN"
        initialValue={customerInfo.LINKMAN}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="联系电话"
        name="PHONE"
        initialValue={customerInfo.PHONE}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="联系地址"
        name="ADDRESS"
        initialValue={customerInfo.ADDRESS}
      >
        <Input />
      </FormField>
    </Modal>
  );
});

export default CustomerModel;
