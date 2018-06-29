import React, { PureComponent, Fragment } from 'react';
import {Card,Divider,Modal,Popconfirm,Badge} from 'antd';
import moment from 'moment';
import { StandardTable,AddButton } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import QueryForm from './queryForm';
import styles from './index.less';


export default class PurchaseQuery extends PureComponent {
  state = {
    formValues: {},
  };

  handleQuery = fields=> {
    this.setState({
      formValues: fields,
    });
    this.props.onQuery(fields)
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
    this.props.onQuery(params)
  };

  render() {
    const { list,pagination,total,supplierList, loading,onAdd,onDetail,onDel } = this.props;

    const columns = [
      {
        title: '采购单编号',
        dataIndex: 'PURCHASE_CODE'
      },
      {
        title: '供应商名称',
        dataIndex: 'SUPPLIER_NAME',
        sorter: true
      },
      {
        title: '交货时间',
        dataIndex: 'DELIVER_DATE',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '联系电话',
        dataIndex: 'PHONE'
      },
      {
        title: '备注',
        dataIndex: 'REMARK',
      },
      {
        title: '状态',
        dataIndex: 'STATE',
        render: text =>
          text === 'A' ? (
            <Badge status="success" text="正常" />
          ) : (
            <Badge status="default" text="废弃" />
          ),
      },
      {
        title: '创建时间',
        dataIndex: 'CREATE_TIME',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },

      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => onDetail(record.PURCHASE_ID)}>详情</a>
            <Divider type="vertical"/>
            <Popconfirm title="确认要删除这个采购单吗?" onConfirm={() => onDel(record.PURCHASE_ID)} okText="确认" cancelText="取消"><a>删除</a>
            </Popconfirm>
          </Fragment>
        ),
      }
    ];


    const queryFormProps = {
      handleQuery: this.handleQuery,
      exportable: false,
      handleExport: this.handleExport
    };

    return (
      <Fragment>
        <Card title="采购单列表" bordered={false} extra={<AddButton handleOnClick={()=> onAdd()}/>}>
          <QueryForm queryFormProps={queryFormProps} supplierList={supplierList}/>
          <StandardTable columns={columns}
                         pagination={pagination}
                         total={total}
                         dataSource={list}
                         loading={loading}
                         rowKey={record => record.PURCHASE_ID}
                         onChange={this.handleTableChange}/>

        </Card>
      </Fragment>
    );
  }
}






