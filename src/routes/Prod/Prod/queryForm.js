import {Form,Input,Select} from 'antd';
import {FormQuery,FormField } from 'components';

const QueryForm = Form.create()(props => {
  const {form,queryFormProps,prodTypeList,customerList} = props;
  return(
    <FormQuery form={form} {...queryFormProps}>
      <FormField
        label="产品名称"
        name="PROD_NAME"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="产品型号"
        name="PROD_CODE"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="客户"
        name="CUSTOMER_ID"
        form={form}
      ><Select showSearch filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{ width: '100%' }} placeholder="请选择客户名称">
        {
          customerList.map((customer,idx)=>
            <Select.Option key={`key_${idx}`} value={customer.CUSTOMER_ID}>{customer.CUSTOMER_NAME}</Select.Option>
          )
        }
      </Select>
      </FormField>
      <FormField
        label="产品类型"
        name="PROD_TYPE_ID"
        form={form}
      ><Select showSearch filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{ width: '100%' }} placeholder="请选择产品类型">
        {
          prodTypeList.map((prodType,idx)=>
            <Select.Option key={`key_${idx}`} value={prodType.PROD_TYPE_ID}>{prodType.PROD_TYPE_NAME}</Select.Option>
          )
        }
      </Select>
      </FormField>
    </FormQuery>
  )

});

export default QueryForm;
