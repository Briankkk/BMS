import {Form,Input,DatePicker} from 'antd';
import {FormQuery,FormField } from 'components';

const { RangePicker } = DatePicker;

const QueryForm = Form.create()(props => {
  const {form,queryFormProps} = props;
  return(
    <FormQuery form={form} {...queryFormProps}>
      <FormField
        label="员工账号"
        name="STAFF_CODE"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="租户名称"
        name="CUST_NAME"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="操作类型"
        name="HANDLER_TYPE"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="操作名称"
        name="HANDLER_NAME"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="操作时间"
        name="CREATE_TIME"
        form={form}
      ><RangePicker
        showTime={{ format: 'HH:mm:ss' }}
        format="YYYY-MM-DD HH:mm:ss"
        placeholder={['开始时间', '结束时间']}
      />
      </FormField>


    </FormQuery>
  )

});

export default QueryForm;
