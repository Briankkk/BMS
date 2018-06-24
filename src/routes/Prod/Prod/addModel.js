import {Modal,Form,Input,Select} from 'antd';
import {FormField } from 'components';


const AddModel = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleEdit,handleModalVisible,materInfo,editType,materTypeList } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        form.resetFields();
        if (editType === 'Add') {
          handleAdd(fieldsValue);
        } else if (editType === 'Mod') {
          handleEdit(supplierInfo.MATER_ID, fieldsValue);
        }
      }
    });
  };

  const materTypeData = [];
  materTypeList.map((materType,idx) => {
    materTypeData.push(<Select.Option key={`key_${idx}`} value={materType.MATER_TYPE_ID}>{materType.MATER_TYPE_NAME}</Select.Option>)
  });

  return (
    <Modal
      title="新建原料"
      destroyOnClose={true}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible(false,'',{})}
    >
      <FormField
        form={form}
        label="原料名称"
        name="MATER_NAME"
        required={true}
        initialValue={materInfo.MATER_NAME}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="原料型号"
        name="MATER_CODE"
        required={true}
        initialValue={materInfo.MATER_CODE}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="原料类型"
        name="MATER_TYPE_ID"
        initialValue={materInfo.MATER_TYPE_ID}
        required={false}
      >
        <Select style={{ width: '100%' }} placeholder="请选择原料类型">
          {materTypeData}
        </Select>
      </FormField>
      <FormField
        form={form}
        label="原料单位"
        name="MATER_UNIT"
        required={true}
        initialValue={materInfo.MATER_UNIT}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="原料数量"
        name="MATER_NUM"
        initialValue={materInfo.MATER_NUM}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="原料提醒量"
        name="MATER_HINT_MIN"
        initialValue={materInfo.MATER_HINT_MIN}
      >
        <Input />
      </FormField>

    </Modal>
  );
});

export default AddModel;
