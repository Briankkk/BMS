import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Card,Divider,Modal,Popconfirm} from 'antd';
import { StandardTable,AddButton } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import QueryForm from './queryForm';
import PurchaseEdit from './purchaseEdit';
import PurchaseDetail from './purchaseDetail';
import PurchaseQuery from './purchaseQuery';
import styles from './index.less';


@connect(({ purchase, loading }) => ({
  purchase,
  loading: loading.models.purchase,
}))
export default class Purchase extends PureComponent {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'purchase/query',

    });
  }

  render() {
    const { purchase: { list,pagination,total,supplierList,materList,editType,purchaseInfo}, loading ,dispatch} = this.props;


    const purchaseListProps = {
      list,
      pagination,
      total,
      supplierList,
      loading,
      onQuery(param){
        dispatch({
          type: 'purchase/query',
          payload: param
        });
      },
      onAdd(){
        dispatch({
          type: 'purchase/save',
          payload: {editType: 'add'}
        });
      },
      onDetail(purchaseId){
        dispatch({
          type: 'purchase/queryById',
          payload: {
            purchaseId: purchaseId,
            editType: 'detail'
          }
        });
      },
      onDel(id){
        dispatch({
          type: 'purchase/delete',
          payload: {id}
        });
      },
    };

    const purchaseDetailProps = {
      purchaseInfo,
      loading,
      handleCancel(){
        dispatch({
          type: 'purchase/save',
          payload: {editType: ''}
        });
      }
    };

    const purchaseEditProps = {
      supplierList,
      materList,
      loading,
      handleAdd(purchase, maters){
        dispatch({
          type: 'purchase/add',
          payload: {purchase, maters}
        });
      },
      handleCancel(){
        dispatch({
          type: 'purchase/save',
          payload: {editType: ''}
        });
      }
    };


    return (
      <PageHeaderLayout content="帮助说明文档">
        {
          editType === '' ?
            (
              <PurchaseQuery {...purchaseListProps}/>
            ) :
            (
              editType === 'add' ?
                (
                  <PurchaseEdit {...purchaseEditProps}/>
                ) :
                (
                  <PurchaseDetail {...purchaseDetailProps}/>
                )
            )

        }
      </PageHeaderLayout>
    );
  }
}






