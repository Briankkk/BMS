import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {Input,Card,Radio,Form,Row,Col,Select,Button,Icon,Divider} from 'antd';
import moment from 'moment';
import { StandardTable } from 'components';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.models.customer,
}))
@Form.create()
export default class Customer extends PureComponent {
  state = {
    //modalVisible: false,
    expandForm: false,
    selectedRows: [],
    //formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/query',

    });
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }



  render() {
    const { customer: { list,pagination }, loading } = this.props;

    const { modalVisible } = this.state;

    const columns = [
      {
        title: '客户名称',
        dataIndex: 'CUSTOMER_NAME',
      },
      {
        title: '客户简称',
        dataIndex: 'CUSTOMER_SHORT_NAME',
      },
      {
        title: '客户编码',
        dataIndex: 'CUSTOMER_CODE',
      },
      {
        title: '联系人',
        dataIndex: 'LINKMAN'
      },
      {
        title: '联系电话',
        dataIndex: 'PHONE'
      },
      {
        title: '联系地址',
        dataIndex: 'ADDRESS'
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="">修改</a>
            <Divider type="vertical"/>
            <a href="">删除</a>
          </Fragment>
        ),
      },
    ];

    const extraContent = (
      <div>
        <Button icon="plus"  className={styles.extraContentButton} type="primary" onClick={() => this.handleModalVisible(true)}>
          新建
        </Button>
      </div>
    );

    return (
      <PageHeaderLayout content="帮助说明文档">
        <div className={styles.standardList}>
          <Card title="客户列表" bordered={false} extra={extraContent}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable columns={columns}
                           pagination={pagination}
                           dataSource={list}
                           loading={loading}/>

          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
  }
