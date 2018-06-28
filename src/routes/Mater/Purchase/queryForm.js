import {Form,Input,Select} from 'antd';
import {FormQuery,FormField } from 'components';

const QueryForm = Form.create()(props => {
  const {form,queryFormProps,supplierList} = props;
  return(
    <FormQuery form={form} {...queryFormProps}>
      <FormField
        label="采购单编号"
        name="PURCHASE_CODE"
        form={form}
      ><Input />
      </FormField>
      <FormField
        label="供应商名称"
        name="SUPPLIER_ID"
        form={form}
      ><Select showSearch filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{ width: '100%' }} placeholder="请选择供应商">
        {
          supplierList.map((supplier,idx)=>
            <Select.Option key={`key_${idx}`} value={supplier.SUPPLIER_ID}>{supplier.SUPPLIER_NAME}</Select.Option>
          )
        }
      </Select>
      </FormField>
    </FormQuery>
  )

});

export default QueryForm;
