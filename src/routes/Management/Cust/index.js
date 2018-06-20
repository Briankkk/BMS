import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Card,Divider,Modal,Popconfirm} from 'antd';
import { StandardTable,AddButton } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import AddModel from './addModel';
import styles from './index.less';



@connect(({ cust, loading }) => ({
  cust,
  loading: loading.models.cust,
}))
export default class Cust extends PureComponent {
  state = {
    modalVisible: false,
    custInfo:{},
    editType:'',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'cust/query',

    });
  }

  handleModalVisible = (flag,type,custInfo) => {
    this.setState({
      modalVisible: !!flag,
      editType:type,
      custInfo:custInfo
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'cust/add',
      payload: {...fields},
    });
    this.setState({
      modalVisible: false,
    });
  };


  handleEdit = (id,fields) => {
    this.props.dispatch({
      type: 'cust/modify',
      payload: {...fields,CUST_ID:id},
    });
    this.setState({
      modalVisible: false,
    });
  };

  handleDelete = id => {
    this.props.dispatch({
      type: 'cust/delete',
      payload: {id},
    });
  };

  handleQuery=fields=>{
    this.props.dispatch({
      type: 'cust/query',
      payload: fields,
    });
  };




  handleTableChange = (pagination, filtersArg, sorter) => {


    const params = {
      PAGE_INDEX: pagination.current,
      PAGE_SIZE: pagination.pageSize,
    };
    if (sorter.field) {
      params.SORTER_FIELD = `${sorter.field}`;
      params.SORTER_ORDER = `${sorter.order}`
    }
    this.props.dispatch({
      type: 'cust/query',
      payload: params,
    });
  };

  render() {
    const { cust: { list,pagination,total}, loading } = this.props;

    const columns = [
      {
        title: '租户名称',
        dataIndex: 'CUST_NAME',
        sorter:true
      },
      {
        title: '租户编码',
        dataIndex: 'CUST_CODE',
        sorter:true
      },
      {
        title: '联系电话',
        dataIndex: 'CUST_PHONE',
      },
      {
        title: '联系地址',
        dataIndex: 'CUST_ADDRESS'
      },
      {
        title: '传真',
        dataIndex: 'FAX'
      },
      {
        title: '税号',
        dataIndex: 'TAX_NUMBER'
      },
      {
        title: '银行名称',
        dataIndex: 'BANK_NAME'
      },
      {
        title: '银行账号',
        dataIndex: 'BANK_ACCOUNT'
      },
      {
        title: '银行账户',
        dataIndex: 'BANK_NUMBER'
      },
      {
        title: '仓库地址',
        dataIndex: 'STORE_HOUSE'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => {this.handleModalVisible(true,'Mod',record);}}>修改</a>
            <Divider type="vertical"/>
            <Popconfirm title="确认要删除这个租户吗?" onConfirm={() => {
                                this.handleDelete(record.CUST_ID);
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
        <Card title="租户列表" bordered={false} extra={<AddButton handleOnClick={()=>{this.handleModalVisible(true,'Add',{})}}/>}>
          <StandardTable columns={columns}
                         pagination={pagination}
                         total={total}
                         dataSource={list}
                         loading={loading}
                         rowKey={record => record.CUST_ID}
                         onChange={this.handleTableChange}/>

        </Card>
        <AddModel {...parentMethods} {...this.state}/>
      </PageHeaderLayout>
    );
  }
}






