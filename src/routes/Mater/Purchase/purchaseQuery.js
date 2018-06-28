import React, { PureComponent, Fragment } from 'react';

import {Card,Divider,Modal,Popconfirm} from 'antd';
import { StandardTable,AddButton } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import QueryForm from './queryForm';

import styles from './index.less';




export default class PurchaseQuery extends PureComponent {

  render() {
    const { list,pagination,total,supplierList, loading,onAdd } = this.props;

    const columns = [
      {
        title: '采购单编号',
        dataIndex: 'PURCHASE_CODE'
      },
      {
        title: '供应商名称',
        dataIndex: 'SUPPLIER_NAME',
        sorter:true
      },
      {
        title: '交货时间',
        dataIndex: 'DELIVER_DATE',
        sorter:true
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

    const queryFormProps = {
      handleQuery:this.handleQuery,
      exportable:false,
      handleExport:this.handleExport
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






