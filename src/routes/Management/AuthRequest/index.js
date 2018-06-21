import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Card,Divider,Popconfirm} from 'antd';
import { StandardTable } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './index.less';


@connect(({ authRequest, loading }) => ({
  authRequest,
  loading: loading.models.authRequest,
}))
export default class AuthRequest extends PureComponent {


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'authRequest/query',

    });
  }


  handleAccept = id => {
    this.props.dispatch({
      type: 'authRequest/approve',
      payload: {id},
    });
  };

  handleReject = id => {
    this.props.dispatch({
      type: 'authRequest/reject',
      payload: {id},
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
      type: 'authRequest/query',
      payload: params,
    });
  };

  render() {
    const { authRequest: { list,pagination,total}, loading } = this.props;

    const columns = [
      {
        title: '员工名称',
        dataIndex: 'STAFF_NAME',
        sorter: true
      },
      {
        title: '员工账号',
        dataIndex: 'STAFF_CODE',
        sorter: true
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <Popconfirm title="确认要审核通过吗?" onConfirm={() => {
                                this.handleAccept(record.AUTH_REQ_ID);
                            }} okText="确认" cancelText="取消"><a>同意</a>
            </Popconfirm>
            <Divider type="vertical"/>
            <Popconfirm title="确认要拒绝申请请求吗?" onConfirm={() => {
                                this.handleReject(record.AUTH_REQ_ID);
                            }} okText="确认" cancelText="取消"><a>拒绝</a>
            </Popconfirm>
          </Fragment>
        ),
      }
    ];
    return (
      <PageHeaderLayout content="帮助说明文档">
        <Card title="申请审核列表" bordered={false}>
          <StandardTable columns={columns}
                         pagination={pagination}
                         total={total}
                         dataSource={list}
                         loading={loading}
                         rowKey={record => record.AUTH_REQ_ID}
                         onChange={this.handleTableChange}/>

        </Card>
      </PageHeaderLayout>
    );
  }
}






