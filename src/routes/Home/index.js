import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Card,Divider,Modal,Popconfirm} from 'antd';
import { StandardTable,AddButton } from 'components';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';



@connect(({ home, loading }) => ({
  home,
  loading: loading.models.home,
}))
export default class Home extends PureComponent {
  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/query',

    });
  }



  render() {
    return (
      <PageHeaderLayout content="帮助说明文档">
      </PageHeaderLayout>
    );
  }
}






