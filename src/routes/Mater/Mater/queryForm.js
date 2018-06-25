import {Form,Input,Select} from 'antd';
import {FormQuery,FormField } from 'components';

const QueryForm = Form.create()(props => {
  const {form,queryFormProps,materTypeList} = props;
  const materTypeData = [];
  materTypeList.map((materType,idx) => {
    materTypeData.push(<Select.Option key={`key_${idx}`} value={materType.MATER_TYPE_ID}>{materType.MATER_TYPE_NAME}</Select.Option>)
  });
  return(
    <FormQuery form={form} {...queryFormProps}>
      <FormField
        label="原料名称"
        name="MATER_NAME"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="原料型号"
        name="MATER_CODE"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="原料类型"
        name="MATER_TYPE_ID"
        form={form}
      ><Select showSearch filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{ width: '100%' }} placeholder="请选择原料类型">
        {materTypeData}
      </Select>
      </FormField>
    </FormQuery>
  )

});

export default QueryForm;
