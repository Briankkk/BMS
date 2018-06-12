import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Input,Card,Form,Row,Col,Select,Button,Icon,Divider,Modal,Popconfirm} from 'antd';
import { StandardTable,FormField,FormQuery,AddButton } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';
import CustomerModel from './customerModel';
import QueryForm from './queryForm';


@connect(({ customer, loading }) => ({
  customer,
  loading: loading.models.customer,
}))
export default class Customer extends PureComponent {
  state = {
    modalVisible: false,
    customerInfo:{},
    editType:'',
    formValues: {},
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

  handleQuery=fields=>{
    this.setState({
      formValues: fields,
    });
    this.props.dispatch({
      type: 'customer/query',
      payload: fields,
    });
  };

  handleExport=fields=>{
    this.props.dispatch({
      type: 'customer/export',
      payload: {EXPORT_TYPE:'CUSTOMER', ...fields}
    });
  };


  handleTableChange = (pagination, filtersArg, sorter) => {

    const { formValues } = this.state;
    const params = {
      PAGE_INDEX: pagination.current,
      PAGE_SIZE: pagination.pageSize,
      ...formValues,
    };
    if (sorter.field) {
      params.SORTER_FIELD = `${sorter.field}`;
      params.SORTER_ORDER = `${sorter.order}`
    }
    this.props.dispatch({
      type: 'customer/query',
      payload: params,
    });
  };

  render() {
    const { customer: { list,pagination,total}, loading } = this.props;

    const columns = [
      {
        title: '客户名称',
        dataIndex: 'CUSTOMER_NAME',
        sorter:true
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
          <QueryForm handleQuery={this.handleQuery} handleExport={this.handleExport}/>
          <StandardTable columns={columns}
                         pagination={pagination}
                         total={total}
                         dataSource={list}
                         loading={loading}
                         rowKey={record => record.CUSTOMER_ID}
                         onChange={this.handleTableChange}/>

        </Card>
        <CustomerModel {...parentMethods} {...this.state}/>
      </PageHeaderLayout>
    );
  }
}






