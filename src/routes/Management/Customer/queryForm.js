import {Form,Input} from 'antd';
import {FormQuery,FormField } from 'components';

const QueryForm = Form.create()(props => {
  const {form,queryFormProps} = props;
  return(
    <FormQuery form={form} {...queryFormProps}>
      <FormField
        label="客户名称"
        name="CUSTOMER_NAME"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="客户简称"
        name="CUSTOMER_SHORT_NAME"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="客户编码"
        name="CUSTOMER_CODE"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="联系人"
        name="LINKMAN"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="联系电话"
        name="PHONE"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="联系地址"
        name="ADDRESS"
        form={form}
      ><Input />
      </FormField>
    </FormQuery>
  )

});

export default QueryForm;
