import {Modal,Form,Input,InputNumber,Select} from 'antd';
import {FormField } from 'components';


const AddModel = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleEdit,handleModalVisible,prodInfo,editType,prodTypeList,customerList } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        const prodTypeId=fieldsValue.PROD_TYPE_ID;
        const customerId=fieldsValue.CUSTOMER_ID;
        if(prodTypeId) {
          fieldsValue.PROD_TYPE_ID =prodTypeId.split('_')[0];
          fieldsValue.PROD_TYPE_NAME =prodTypeId.split('_')[1];
        }
        if(customerId) {
          fieldsValue.CUSTOMER_ID =customerId.split('_')[0];
          fieldsValue.CUSTOMER_NAME =customerId.split('_')[1];
        }
        form.resetFields();
        if (editType === 'Add') {
          handleAdd(fieldsValue);
        } else if (editType === 'Mod') {
          handleEdit(prodInfo.PROD_ID, fieldsValue);
        }
      }
    });
  };

  const prodTypeData = [];
  prodTypeList.map((prodType, idx) => {
    prodTypeData.push(<Select.Option key={`key_${idx}`}
                                     value={prodType.PROD_TYPE_ID+'_'+prodType.PROD_TYPE_NAME}>{prodType.PROD_TYPE_NAME}</Select.Option>)
  });

  const customerData = [];
  customerList.map((customer, idx) => {
    customerData.push(<Select.Option key={`key_${idx}`}
                                     value={customer.CUSTOMER_ID+'_'+customer.CUSTOMER_NAME}>{customer.CUSTOMER_NAME}</Select.Option>)
  });

  return (
    <Modal
      title="新建产品"
      destroyOnClose={true}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible(false,'',{})}
    >
      <FormField
        form={form}
        label="产品名称"
        name="PROD_NAME"
        required={true}
        initialValue={prodInfo.PROD_NAME}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="产品型号"
        name="PROD_CODE"
        required={true}
        initialValue={prodInfo.PROD_CODE}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="产品类型"
        name="PROD_TYPE_ID"
        initialValue={prodInfo.PROD_TYPE_ID&&(prodInfo.PROD_TYPE_ID+'_'+prodInfo.PROD_TYPE_NAME)}
      >
        <Select style={{ width: '100%' }} placeholder="请选择产品类型">
          {prodTypeData}
        </Select>
      </FormField>
      <FormField
        form={form}
        label="客户名称"
        name="CUSTOMER_ID"
        initialValue={prodInfo.CUSTOMER_ID&&(prodInfo.CUSTOMER_ID+'_'+prodInfo.CUSTOMER_NAME)}
      >
        <Select style={{ width: '100%' }} placeholder="请选择客户名称">
          {customerData}
        </Select>
      </FormField>
      <FormField
        form={form}
        label="产品单位"
        name="PROD_UNIT"
        required={true}
        initialValue={prodInfo.PROD_UNIT}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="产品数量"
        name="PROD_NUM"
        required={true}
        initialValue={prodInfo.PROD_NUM}
      >
        <InputNumber style={{ width: '100%' }} min={0} />
      </FormField>


    </Modal>
  );
});

export default AddModel;
