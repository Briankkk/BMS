import {Modal,Form,Input,Select} from 'antd';
import {FormField } from 'components';


const AddModel = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleEdit,handleModalVisible,staffInfo,editType,roleList } = props;
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

  const staffRoleData = [];
  roleList.map((role,idx) => {
    staffRoleData.push(<Select.Option key={`key_${idx}`} value={role.STAFF_ROLE_NAME}>{role.STAFF_ROLE_CODE}</Select.Option>)
  });

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
      <FormField
        form={form}
        label="员工角色"
        name="STAFF_ROLE"
        initialValue={staffInfo.STAFF_ROLE}
        required={true}
      >
        <Select style={{ width: '100%' }} placeholder="请选择员工角色">
          {staffRoleData}
        </Select>
      </FormField>
    </Modal>
  );
});

export default AddModel;
