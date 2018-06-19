import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Card,Divider,Modal,Popconfirm} from 'antd';
import { StandardTable,AddButton } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import AddModel from './addModel';
import QueryForm from './queryForm';
import styles from './index.less';



@connect(({ mater, loading }) => ({
  mater,
  loading: loading.models.mater,
}))
export default class Mater extends PureComponent {
  state = {
    modalVisible: false,
    materInfo:{},
    editType:'',
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'mater/query',

    });
  }

  handleModalVisible = (flag,type,materInfo) => {
    this.setState({
      modalVisible: !!flag,
      editType:type,
      materInfo:materInfo
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'mater/add',
      payload: {...fields},
    });
    this.setState({
      modalVisible: false,
    });
  };


  handleEdit = (id,fields) => {
    this.props.dispatch({
      type: 'mater/modify',
      payload: {...fields,MATER_ID:id},
    });
    this.setState({
      modalVisible: false,
    });
  };

  handleDelete = id => {
    this.props.dispatch({
      type: 'mater/delete',
      payload: {id},
    });
  };

  handleQuery=fields=>{
    this.setState({
      formValues: fields,
    });
    this.props.dispatch({
      type: 'mater/query',
      payload: fields,
    });
  };

  handleExport=fields=>{
    this.props.dispatch({
      type: 'mater/exportFile',
      payload: {EXPORT_TYPE:'MATER', ...fields}
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
      type: 'mater/query',
      payload: params,
    });
  };

  render() {
    const { mater: { list,pagination,total,materTypeList}, loading } = this.props;

    const columns = [
      {
        title: '原料名称',
        dataIndex: 'MATER_NAME',
        sorter:true
      },
      {
        title: '原料型号',
        dataIndex: 'MATER_CODE',
        sorter:true
      },
      {
        title: '原料类型',
        dataIndex: 'MATER_TYPE_NAME',
        sorter:true
      },
      {
        title: '原料单位',
        dataIndex: 'MATER_UNIT'
      },
      {
        title: '原料数量',
        dataIndex: 'MATER_NUM',
        sorter:true
      },
      {
        title: '原料提醒量',
        dataIndex: 'MATER_HINT_MIN',
        sorter:true
      },
      {
        title: '原料在途量',
        dataIndex: 'MATER_REQ_NUM',
        sorter:true
      },

      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => {this.handleModalVisible(true,'Mod',record);}}>修改</a>
            <Divider type="vertical"/>
            <Popconfirm title="确认要删除这个原料吗?" onConfirm={() => {
                                this.handleDelete(record.MATER_ID);
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
        <Card title="原料列表" bordered={false} extra={<AddButton handleOnClick={()=>{this.handleModalVisible(true,'Add',{})}}/>}>
          <QueryForm queryFormProps={queryFormProps} materTypeList={materTypeList}/>
          <StandardTable columns={columns}
                         pagination={pagination}
                         total={total}
                         dataSource={list}
                         loading={loading}
                         rowKey={record => record.MATER_ID}
                         onChange={this.handleTableChange}/>

        </Card>
        <AddModel {...parentMethods} {...this.state} materTypeList={materTypeList}/>
      </PageHeaderLayout>
    );
  }
}






