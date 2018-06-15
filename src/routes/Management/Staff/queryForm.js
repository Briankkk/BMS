import {Form,Input} from 'antd';
import {FormQuery,FormField } from 'components';

const QueryForm = Form.create()(props => {
  const {form,queryFormProps} = props;
  return(
    <FormQuery form={form} {...queryFormProps}>
      <FormField
        label="员工名称"
        name="STAFF_NAME"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="员工账号"
        name="STAFF_CODE"
        form={form}
      ><Input />
      </FormField>
    </FormQuery>
  )

});

export default QueryForm;
