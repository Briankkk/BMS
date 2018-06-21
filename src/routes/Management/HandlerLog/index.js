import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Card,Divider,Modal,Popconfirm} from 'antd';
import { StandardTable,AddButton } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import QueryForm from './queryForm';
import styles from './index.less';



@connect(({ handlerLog, loading }) => ({
  handlerLog,
  loading: loading.models.handlerLog,
}))
export default class HandlerLog extends PureComponent {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'handlerLog/query',

    });
  }



  handleQuery=fields=>{
    this.setState({
      formValues: fields,
    });
    this.props.dispatch({
      type: 'handlerLog/query',
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
      type: 'handlerLog/query',
      payload: params,
    });
  };

  render() {
    const { handlerLog: { list,pagination,total}, loading } = this.props;

    const columns = [
      {
        title: '员工名称',
        dataIndex: 'STAFF_NAME',
        sorter:true
      },
      {
        title: '员工账号',
        dataIndex: 'STAFF_CODE',
        sorter:true
      },
      {
        title: '租户名称',
        dataIndex: 'CUST_NAME',
        sorter:true
      },
      {
        title: '操作类型',
        dataIndex: 'HANDLER_TYPE',
        sorter:true
      },
      {
        title: '操作名称',
        dataIndex: 'HANDLER_NAME',
        sorter:true
      },
      {
        title: '操作Header',
        dataIndex: 'HANDLER_HEADER',
      },
      {
        title: '操作Body',
        dataIndex: 'HANDLER_BODY',
      },
      {
        title: '操作时间',
        dataIndex: 'CREATE_TIME',
        sorter:true
      }
    ];



    const queryFormProps = {
      handleQuery:this.handleQuery,
      exportable:false,
    };

    return (
      <PageHeaderLayout content="帮助说明文档">
        <Card title="操作日志列表" bordered={false} >
          <QueryForm queryFormProps={queryFormProps}/>
          <StandardTable columns={columns}
                         pagination={pagination}
                         total={total}
                         dataSource={list}
                         loading={loading}
                         rowKey={record => record.HANDLER_LOG_ID}
                         onChange={this.handleTableChange}/>

        </Card>
      </PageHeaderLayout>
    );
  }
}






