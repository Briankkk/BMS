import {Modal,Form,Input,InputNumber,Select} from 'antd';
import {FormField } from 'components';


const AddModel = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleEdit,handleModalVisible,materInfo,editType,materTypeList } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        const materTypeId=fieldsValue.MATER_TYPE_ID;
        if(materTypeId) {
          fieldsValue.MATER_TYPE_ID =materTypeId.split('_')[0];
          fieldsValue.MATER_TYPE_NAME =materTypeId.split('_')[1];
        }
        form.resetFields();
        if (editType === 'Add') {
          handleAdd(fieldsValue);
        } else if (editType === 'Mod') {
          handleEdit(materInfo.MATER_ID, fieldsValue);
        }
      }
    });
  };

  const materTypeData = [];
  materTypeList.map((materType,idx) => {
    materTypeData.push(<Select.Option key={`key_${idx}`} value={materType.MATER_TYPE_ID+'_'+materType.MATER_TYPE_NAME}>{materType.MATER_TYPE_NAME}</Select.Option>)
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
        initialValue={materInfo.MATER_TYPE_ID&&(materInfo.MATER_TYPE_ID+'_'+materInfo.MATER_TYPE_NAME)}
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
        required={true}
        initialValue={materInfo.MATER_NUM}
      >
        <InputNumber style={{ width: '100%' }} min={0} />
      </FormField>
      <FormField
        form={form}
        label="原料提醒量"
        name="MATER_HINT_MIN"
        initialValue={materInfo.MATER_HINT_MIN}
      >
        <InputNumber style={{ width: '100%' }} min={0} />
      </FormField>

    </Modal>
  );
});

export default AddModel;
