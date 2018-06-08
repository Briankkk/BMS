import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'antd';

const DefaultModelFormLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

export default class FormField extends Component {

  renderChildren() {
    const { name, action, children, form, initialValue, label, rules, required } = this.props;
    const { getFieldDecorator } = form;

    const itemRules = rules || [];
    if (required) {
      itemRules.unshift({ required: true, message: `${label} 不能为空` });
    }


    // 如果没有action直接返回
    if (!action) {
      return getFieldDecorator(name, {
        rules: itemRules,
        initialValue,
      })(children);
    }


    // 有action 做一层包装
    return (
      <Row gutter={4}>
        <Col span={20}>
          { getFieldDecorator(name, {
            rules: itemRules,
            initialValue,
          })(children)
        }
        </Col>
        <Col span={4}>
          {action}
        </Col>
      </Row>
    );
  }

  render() {
    const { required, label ,colon,extra,help,labelCol=DefaultModelFormLayout.labelCol,wrapperCol=DefaultModelFormLayout.wrapperCol,hasFeedback,validateStatus} = this.props;

    return (
      <div>
        <Form.Item {...{ labelCol,wrapperCol,label,required,hasFeedback, validateStatus, extra,help,colon}} >
          {this.renderChildren()}
        </Form.Item>
      </div>
    );
  }
}
