import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { StandardTable } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './index.less';

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.models.customer,
}))
export default class Customer extends PureComponent {
  state = {
    //modalVisible: false,
    //expandForm: false,
    //selectedRows: [],
    //formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  render() {
    //const { rule: { data }, loading } = this.props;
    //const { selectedRows, modalVisible } = this.state;

    return <PageHeaderLayout content="帮助说明文档" />;
  }
}
