import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Card,Divider,Modal,Popconfirm} from 'antd';
import { StandardTable,AddButton } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import AddModel from './addModel';
import QueryForm from './queryForm';
import styles from './index.less';



@connect(({ supplier, loading }) => ({
  supplier,
  loading: loading.models.supplier,
}))
export default class Customer extends PureComponent {
  state = {
    modalVisible: false,
    supplierInfo:{},
    editType:'',
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'supplier/query',

    });
  }

  handleModalVisible = (flag,type,supplierInfo) => {
    this.setState({
      modalVisible: !!flag,
      editType:type,
      supplierInfo:supplierInfo
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'supplier/add',
      payload: {...fields},
    });
    this.setState({
      modalVisible: false,
    });
  };


  handleEdit = (id,fields) => {
    this.props.dispatch({
      type: 'supplier/modify',
      payload: {...fields,SUPPLIER_ID:id},
    });
    this.setState({
      modalVisible: false,
    });
  };

  handleDelete = id => {
    this.props.dispatch({
      type: 'supplier/delete',
      payload: {id},
    });
  };

  handleQuery=fields=>{
    this.setState({
      formValues: fields,
    });
    this.props.dispatch({
      type: 'supplier/query',
      payload: fields,
    });
  };

  handleExport=fields=>{
    this.props.dispatch({
      type: 'supplier/exportFile',
      payload: {EXPORT_TYPE:'SUPPLIER', ...fields}
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
      type: 'supplier/query',
      payload: params,
    });
  };

  render() {
    const { supplier: { list,pagination,total}, loading } = this.props;

    const columns = [
      {
        title: '供应商名称',
        dataIndex: 'SUPPLIER_NAME',
        sorter:true
      },
      {
        title: '供应商简称',
        dataIndex: 'SUPPLIER_SHORT_NAME',
        sorter:true
      },
      {
        title: '供应商编码',
        dataIndex: 'SUPPLIER_CODE',
        sorter:true
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
        title: '传真',
        dataIndex: 'FAX'
      },
      {
        title: '电子邮件',
        dataIndex: 'EMAIL'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => {this.handleModalVisible(true,'Mod',record);}}>修改</a>
            <Divider type="vertical"/>
            <Popconfirm title="确认要删除这个供应商吗?" onConfirm={() => {
                                this.handleDelete(record.SUPPLIER_ID);
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
        <Card title="供应商列表" bordered={false} extra={<AddButton handleOnClick={()=>{this.handleModalVisible(true,'Add',{})}}/>}>
          <QueryForm queryFormProps={queryFormProps}/>
          <StandardTable columns={columns}
                         pagination={pagination}
                         total={total}
                         dataSource={list}
                         loading={loading}
                         rowKey={record => record.SUPPLIER_ID}
                         onChange={this.handleTableChange}/>

        </Card>
        <AddModel {...parentMethods} {...this.state}/>
      </PageHeaderLayout>
    );
  }
}






