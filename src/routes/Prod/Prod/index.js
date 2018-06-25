import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Card,Divider,Modal,Popconfirm} from 'antd';
import { StandardTable,AddButton } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import AddModel from './addModel';
import QueryForm from './queryForm';
import styles from './index.less';



@connect(({ prod, loading }) => ({
  prod,
  loading: loading.models.prod,
}))
export default class Prod extends PureComponent {
  state = {
    modalVisible: false,
    prodInfo:{},
    editType:'',
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'prod/query',

    });
  }

  handleModalVisible = (flag,type,prodInfo) => {
    this.setState({
      modalVisible: !!flag,
      editType:type,
      prodInfo:prodInfo
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'prod/add',
      payload: {...fields},
    });
    this.setState({
      modalVisible: false,
    });
  };


  handleEdit = (id,fields) => {
    this.props.dispatch({
      type: 'prod/modify',
      payload: {...fields,PROD_ID:id},
    });
    this.setState({
      modalVisible: false,
    });
  };

  handleDelete = id => {
    this.props.dispatch({
      type: 'prod/delete',
      payload: {id},
    });
  };

  handleQuery=fields=>{
    this.setState({
      formValues: fields,
    });
    this.props.dispatch({
      type: 'prod/query',
      payload: fields,
    });
  };

  handleExport=fields=>{
    this.props.dispatch({
      type: 'prod/exportFile',
      payload: {EXPORT_TYPE:'PROD', ...fields}
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
      type: 'prod/query',
      payload: params,
    });
  };

  render() {
    const { prod: { list,pagination,total,prodTypeList,customerList}, loading } = this.props;

    const columns = [
      {
        title: '产品名称',
        dataIndex: 'PROD_NAME',
        sorter:true
      },
      {
        title: '产品型号',
        dataIndex: 'PROD_CODE',
        sorter:true
      },
      {
        title: '产品类型',
        dataIndex: 'PROD_TYPE_NAME',
        sorter:true
      },
      {
        title: '产品单位',
        dataIndex: 'PROD_UNIT'
      },
      {
        title: '产品数量',
        dataIndex: 'PROD_NUM',
        sorter:true
      },
      {
        title: '客户名称',
        dataIndex: 'CUSTOMER_NAME',
        sorter:true
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => {this.handleModalVisible(true,'Mod',record);}}>修改</a>
            <Divider type="vertical"/>
            <Popconfirm title="确认要删除这个原料吗?" onConfirm={() => {
                                this.handleDelete(record.PROD_ID);
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

    const queryFormProps = {
      handleQuery:this.handleQuery,
      exportable:true,
      handleExport:this.handleExport
    };

    return (
      <PageHeaderLayout content="帮助说明文档">
        <Card title="产品列表" bordered={false} extra={<AddButton handleOnClick={()=>{this.handleModalVisible(true,'Add',{})}}/>}>
          <QueryForm queryFormProps={queryFormProps} prodTypeList={prodTypeList} customerList={customerList}/>
          <StandardTable columns={columns}
                         pagination={pagination}
                         total={total}
                         dataSource={list}
                         loading={loading}
                         rowKey={record => record.PROD_ID}
                         onChange={this.handleTableChange}/>

        </Card>
        <AddModel {...parentMethods} {...this.state} prodTypeList={prodTypeList} customerList={customerList}/>
      </PageHeaderLayout>
    );
  }
}






