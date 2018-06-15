import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Card,Divider,Modal,Popconfirm} from 'antd';
import { StandardTable,AddButton } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import AddModel from './addModel';
import QueryForm from './queryForm';
import styles from './index.less';



@connect(({ staff, loading }) => ({
  staff,
  loading: loading.models.staff,
}))
export default class Staff extends PureComponent {
  state = {
    modalVisible: false,
    staffInfo:{},
    editType:'',
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'staff/query',

    });
  }

  handleModalVisible = (flag,type,staffInfo) => {
    this.setState({
      modalVisible: !!flag,
      editType:type,
      staffInfo:staffInfo
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'staff/add',
      payload: {...fields},
    });
    this.setState({
      modalVisible: false,
    });
  };


  handleEdit = (id,fields) => {
    this.props.dispatch({
      type: 'staff/modify',
      payload: {...fields,STAFF_ID:id},
    });
    this.setState({
      modalVisible: false,
    });
  };

  handleDelete = id => {
    this.props.dispatch({
      type: 'staff/delete',
      payload: {id},
    });
  };

  handleQuery=fields=>{
    this.setState({
      formValues: fields,
    });
    this.props.dispatch({
      type: 'staff/query',
      payload: fields,
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
      type: 'staff/query',
      payload: params,
    });
  };

  render() {
    const { staff: { list,pagination,total,roleList}, loading } = this.props;

    const columns = [
      {
        title: '员工名称',
        dataIndex: 'STAFF_NAME',
        sorter:true
      },
      {
        title: '员工账号',
        dataIndex: 'STAFF_CODE',
      },
      {
        title: '员工角色',
        dataIndex: 'STAFF_ROLE',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => {this.handleModalVisible(true,'Mod',record);}}>修改</a>
            <Divider type="vertical"/>
            <Popconfirm title="确认要删除这个员工吗?" onConfirm={() => {
                                this.handleDelete(record.STAFF_ID);
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
      exportable:false,
      handleExport:this.handleExport
    };

    return (
      <PageHeaderLayout content="帮助说明文档">
        <Card title="员工列表" bordered={false} extra={<AddButton handleOnClick={()=>{this.handleModalVisible(true,'Add',{})}}/>}>
          <QueryForm queryFormProps={queryFormProps}/>
          <StandardTable columns={columns}
                         pagination={pagination}
                         total={total}
                         dataSource={list}
                         loading={loading}
                         rowKey={record => record.STAFF_ID}
                         onChange={this.handleTableChange}/>

        </Card>
        <AddModel {...parentMethods} {...this.state} roleList={roleList}/>
      </PageHeaderLayout>
    );
  }
}






