import {Modal,Form,Input} from 'antd';
import {FormField } from 'components';


const AddModel = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleEdit,handleModalVisible,staffInfo,editType } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        form.resetFields();
        if (editType === 'Add') {
          handleAdd(fieldsValue);
        } else if (editType === 'Mod') {
          handleEdit(staffInfo.STAFF_ID, fieldsValue);
        }
      }
    });
  };
  return (
    <Modal
      title="新建员工"
      destroyOnClose={true}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible(false,'',{})}
    >
      <FormField
        form={form}
        label="员工名称"
        name="STAFF_NAME"
        required={true}
        initialValue={staffInfo.STAFF_NAME}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="员工账号"
        name="STAFF_CODE"
        required={editType === 'Add'}
        initialValue={staffInfo.STAFF_CODE}
      >
        <Input disabled={editType === 'Mod'}/>
      </FormField>
      <FormField
        form={form}
        label="员工密码"
        name="PASSWORD"
        required={true}
      >
        <Input />
      </FormField>
    </Modal>
  );
});

export default AddModel;
