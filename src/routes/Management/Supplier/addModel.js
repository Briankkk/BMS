import {Modal,Form,Input} from 'antd';
import {FormField } from 'components';


const AddModel = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleEdit,handleModalVisible,supplierInfo,editType } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        form.resetFields();
        if (editType === 'Add') {
          handleAdd(fieldsValue);
        } else if (editType === 'Mod') {
          handleEdit(supplierInfo.SUPPLIER_ID, fieldsValue);
        }
      }
    });
  };
  return (
    <Modal
      title="新建供应商"
      destroyOnClose={true}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible(false,'',{})}
    >
      <FormField
        form={form}
        label="供应商名称"
        name="SUPPLIER_NAME"
        required={true}
        initialValue={supplierInfo.SUPPLIER_NAME}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="供应商简称"
        name="SUPPLIER_SHORT_NAME"
        required={true}
        initialValue={supplierInfo.SUPPLIER_SHORT_NAME}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="供应商编码"
        name="SUPPLIER_CODE"
        required={true}
        initialValue={supplierInfo.SUPPLIER_CODE}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="联系人"
        name="LINKMAN"
        initialValue={supplierInfo.LINKMAN}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="联系电话"
        name="PHONE"
        initialValue={supplierInfo.PHONE}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="联系地址"
        name="ADDRESS"
        initialValue={supplierInfo.ADDRESS}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="传真"
        name="FAX"
        initialValue={supplierInfo.FAX}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="电子邮件"
        name="EMAIL"
        initialValue={supplierInfo.EMAIL}
      >
        <Input />
      </FormField>
    </Modal>
  );
});

export default AddModel;
