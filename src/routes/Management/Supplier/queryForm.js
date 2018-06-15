import {Form,Input} from 'antd';
import {FormQuery,FormField } from 'components';

const QueryForm = Form.create()(props => {
  const {form,queryFormProps} = props;
  return(
    <FormQuery form={form} {...queryFormProps}>
      <FormField
        label="供应商名称"
        name="SUPPLIER_NAME"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="供应商简称"
        name="SUPPLIER_SHORT_NAME"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="供应商编码"
        name="SUPPLIER_CODE"
        form={form}
      ><Input />
      </FormField>
    </FormQuery>
  )

});

export default QueryForm;
