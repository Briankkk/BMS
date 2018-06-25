import { PureComponent} from 'react';
import { connect } from 'dva';
import {Card,Form,Button,Select, Upload, Icon,message,Tooltip} from 'antd';
import {FormField } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';


function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('文件不能超过2M');
  }
  return isLt2M;
}

@connect(({ batchUpload, loading }) => ({
  batchUpload,
  loading: loading.models.batchUpload,
}))

@Form.create()
export default class BatchUpload extends PureComponent {


  state = {
    fileList: [],
  };

  handleSubmit = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, values) => {
      if (err) return;
      dispatch({
        type: 'batchUpload/importFile',
        payload: {fileType: values.fileType, fileName: values.fileName.file.name},

      });
    });
  };

  handleChange = ({ fileList }) => this.setState({fileList});




  render() {
    const { form } = this.props;
    const { fileList } = this.state;
    return (
      <PageHeaderLayout content="帮助说明文档">
        <Card title="批量文件" bordered={false}>
          <Form onSubmit={this.handleSubmit}>
            <FormField
              form={form}
              label="操作类型"
              name="fileType"
              wrapperCol={{ span: 5}}
              required={true}
            >
              <Select placeholder="请选择操作类型">
                <Select.Option value="CUSTOMER">新增客户</Select.Option>
                <Select.Option value="SUPPLIER">新增供应商</Select.Option>
                <Select.Option value="MATER">新增原料</Select.Option>
                <Select.Option value="PROD">新增产品</Select.Option>
              </Select>
            </FormField>

            <FormField
              form={form}
              label={(<Tooltip title="文件暂时只支持xlsx格式"><span>文件&nbsp;<Icon type="question-circle-o" /></span></Tooltip>)}
              name="fileName"
              required={true}
            >
              <Upload accept=".xlsx" action="/uploadFile" beforeUpload={beforeUpload}
                      onChange={this.handleChange}>
                {fileList.length >= 1 ? null : <Button><Icon type="upload"/> 点击上传</Button>}
              </Upload>
            </FormField>

            <FormField
              form={form}
              wrapperCol={{ span: 15, offset: 5 }}
              name="submit"
            >
              <Button type="primary" htmlType="submit">确定</Button>
            </FormField>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}






