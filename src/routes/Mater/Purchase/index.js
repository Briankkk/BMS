import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Card,Divider,Modal,Popconfirm} from 'antd';
import { StandardTable,AddButton } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import QueryForm from './queryForm';
import PurchaseAdd from './purchaseAdd';
import PurchaseMod from './purchaseMod';
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


  handleAdd = fields => {
    this.props.dispatch({
      type: 'purchase/add',
      payload: {...fields},
    });
    this.setState({
      modalVisible: false,
    });
  };


  handleEdit = (id,fields) => {
    this.props.dispatch({
      type: 'purchase/modify',
      payload: {...fields,MATER_ID:id},
    });
    this.setState({
      modalVisible: false,
    });
  };

  handleDelete = id => {
    this.props.dispatch({
      type: 'purchase/delete',
      payload: {id},
    });
  };

  handleQuery=fields=>{
    this.setState({
      formValues: fields,
    });
    this.props.dispatch({
      type: 'purchase/query',
      payload: fields,
    });
  };

  handleExport=fields=>{
    this.props.dispatch({
      type: 'purchase/exportFile',
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
      type: 'purchase/query',
      payload: params,
    });
  };

  render() {
    const { purchase: { list,pagination,total,supplierList,editType}, loading ,dispatch} = this.props;


    const purchaseListProps ={
      list,
      pagination,
      total,
      supplierList,
      loading,
      onAdd(){
        dispatch({
          type:'purchase/save',
          payload: {editType:'add'}
        });
      },
      onModify(storageId){
        dispatch({
          type:'storage/queryStorageById',
          payload: {
            storageId: storageId,
            editorType: 'modify'
          }
        });
      },
      onDel(storageId){
        dispatch({
          type:'storage/del',
          payload: storageId,
        });
      }
    };

    const purchaseAddProps ={
      list,
      pagination,
      total,
      supplierList,
      loading,
      onAdd(){
        dispatch({
          type:'purchase/save',
          payload: {editType:'add'}
        });
      },
      onModify(storageId){
        dispatch({
          type:'storage/queryStorageById',
          payload: {
            storageId: storageId,
            editorType: 'modify'
          }
        });
      },
      handleCancel(){
        dispatch({
          type:'purchase/save',
          payload: {editType:''}
        });
      }
    };

    const queryFormProps = {
      handleQuery:this.handleQuery,
      exportable:false,
      handleExport:this.handleExport
    };

    return (
      <PageHeaderLayout content="帮助说明文档">
        {
          editType===''?
            (
              <PurchaseQuery {...purchaseListProps}/>
            ):
            (
              editType==='add'?
                (
                  <PurchaseAdd {...purchaseAddProps}/>
                ):
                (
                  <PurchaseMod />
                )
            )

        }
      </PageHeaderLayout>
    );
  }
}






