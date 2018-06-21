import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';
//import * as Cookies from 'js-cookie';
import * as uuidv1 from 'uuid/v1';
import { getAuthCodeC,getAuthCodeS } from '../../utils/authority';


const { Tab, UserName, Password,Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {

  handleSubmit = (err, values) => {
    if (!err) {
      let authCodeC = getAuthCodeC(values.userName);
      if (authCodeC === '') {
        //authCodeC = Cookies.get('csrfToken');
        authCodeC = uuidv1();
      }
      this.props.dispatch({
        type: 'login/login',
        payload: {
          authCodeC: authCodeC,
          authCodeS: getAuthCodeS(values.userName),
          ...values,
        },
      });
    }
  };


  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon/>;
  };

  render() {
    const { login, submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={'account'} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            {login.status === 'error' && !login.submitting &&
            this.renderMessage(login.errorMessage)}
            <UserName name="userName" placeholder=""/>
            <Password name="password" placeholder=""/>
          </Tab>
          <Submit loading={submitting}>登录</Submit>

        </Login>
      </div>
    );
  }
}
