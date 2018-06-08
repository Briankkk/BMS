import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Input,Card,Form,Row,Col,Select,Button,Icon,Divider,Modal,Popconfirm} from 'antd';
import { StandardTable,FormField,AddButton } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.models.customer,
}))
@Form.create()
export default class Customer extends PureComponent {
  state = {
    modalVisible: false,
    customerInfo:{},
    editType:'',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/query',

    });
  }

  handleModalVisible = (flag,type,cutomerInfo) => {
    this.setState({
      modalVisible: !!flag,
      editType:type,
      customerInfo:cutomerInfo
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'customer/add',
      payload: {...fields},
    });
    this.setState({
      modalVisible: false,
    });
  };


  handleEdit = (id,fields) => {
    this.props.dispatch({
      type: 'customer/modify',
      payload: {...fields,CUSTOMER_ID:id},
    });
    this.setState({
      modalVisible: false,
    });
  };

  handleDelete = id => {
    this.props.dispatch({
      type: 'customer/delete',
      payload: {id},
    });
  };

  handleTableChange = (pagination, filtersArg, sorter) => {

    //const { formValues } = this.state;

    //const filters = Object.keys(filtersArg).reduce((obj, key) => {
    //  const newObj = { ...obj };
    //  newObj[key] = getValue(filtersArg[key]);
    //  return newObj;
    //}, {});

    const params = {
      PAGE_INDEX: pagination.current,
      PAGE_SIZE: pagination.pageSize,
      //...formValues,
      //...filters,
    };
    //if (sorter.field) {
    //  params.sorter = `${sorter.field}_${sorter.order}`;
    //}

    this.props.dispatch({
      type: 'customer/query',
      payload: params,
    });
  };



  renderForm() {
    return this.renderSimpleForm();
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down"/>
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  render() {
    const { customer: { list,pagination }, loading } = this.props;

    const columns = [
      {
        title: '客户名称',
        dataIndex: 'CUSTOMER_NAME',
      },
      {
        title: '客户简称',
        dataIndex: 'CUSTOMER_SHORT_NAME',
      },
      {
        title: '客户编码',
        dataIndex: 'CUSTOMER_CODE',
      },
      {
        title: '联系人',
        dataIndex: 'LINKMAN'
      },
      {
        title: '联系电话',
        dataIndex: 'PHONE'
      },
      {
        title: '联系地址',
        dataIndex: 'ADDRESS'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => {this.handleModalVisible(true,'Mod',record);}}>修改</a>
            <Divider type="vertical"/>
            <Popconfirm title="确认要删除这个客户吗?" onConfirm={() => {
                                this.handleDelete(record.CUSTOMER_ID);
                            }} okText="确认" cancelText="取消"><a>删除</a>
            </Popconfirm>
          </Fragment>
        ),
      }
    ];


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleEdit:this.handleEdit,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout content="帮助说明文档">
        <Card title="客户列表" bordered={false} extra={<AddButton handleOnClick={()=>{this.handleModalVisible(true,'Add',{})}}/>}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <StandardTable columns={columns}
                         pagination={pagination}
                         dataSource={list}
                         loading={loading}
                         onChange={this.handleTableChange}/>

        </Card>
        <CustomerModel {...parentMethods} {...this.state}/>
      </PageHeaderLayout>
    );
  }
}


const CustomerModel = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleEdit,handleModalVisible,customerInfo,editType } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        form.resetFields();
        if (editType === 'Add') {
          handleAdd(fieldsValue);
        } else if (editType === 'Mod') {
          handleEdit(customerInfo.CUSTOMER_ID, fieldsValue);
        }
      }
    });
  };
  return (
    <Modal
      title="新建客户"
      destroyOnClose={true}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible(false,'',{})}
    >
      <FormField
        form={form}
        label="客户名称"
        name="CUSTOMER_NAME"
        required={true}
        initialValue={customerInfo.CUSTOMER_NAME}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="客户简称"
        name="CUSTOMER_SHORT_NAME"
        required={true}
        initialValue={customerInfo.CUSTOMER_SHORT_NAME}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="客户编码"
        name="CUSTOMER_CODE"
        required={true}
        initialValue={customerInfo.CUSTOMER_CODE}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="联系人"
        name="LINKMAN"
        initialValue={customerInfo.LINKMAN}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="联系电话"
        name="PHONE"
        initialValue={customerInfo.PHONE}
      >
        <Input />
      </FormField>
      <FormField
        form={form}
        label="联系地址"
        name="ADDRESS"
        initialValue={customerInfo.ADDRESS}
      >
        <Input />
      </FormField>
    </Modal>
  );
});
