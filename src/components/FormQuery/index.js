import React, { PureComponent } from 'react';
import { Button, Col, Form, Row ,Icon,Input} from 'antd';
import styles from './index.less';


export default class FormQuery extends PureComponent {

  state = {
    expand: false,
  };


  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleQuery(values);
      }
    });
  }

  handleExport = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleExport(values);
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({expand: !expand});
  }


  renderField() {

    const { children=[], cols = 3 ,showCountDefault=3,searchText='查询', exportable = true, resetText = '重置',collapseText='更多'} = this.props;
    const colSpan = 24 / cols;
    const totalCount = children.length;
    const showCount = this.state.expand ? totalCount : showCountDefault;

    const buttonCol = (totalCount>3&&!this.state.expand)?24:24 - (totalCount % cols) * colSpan;
    let colEles;
    if (Array.isArray(children)) {
      colEles = children.map((ele, idx) => {
        return <Col key={`key_${idx}`} span={colSpan}
                    style={{ display: idx < showCount ? 'block' : 'none' }}> {ele} </Col>
      })
    } else {
      colEles = <Col key={`key_1`} span={colSpan}> {children} </Col>
    }
    return (
      <Row gutter={24}>
        {colEles}
        <Col span={buttonCol} style={{ textAlign: 'right' }}>
          <span className={styles.submitButtons}>
            <Button type="primary" htmlType="submit">{searchText}</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>{resetText}</Button>
            {exportable && <Button style={{ marginLeft: 8 }} onClick={this.handleExport}>导出</Button>}
            {totalCount > showCountDefault && <a style={{ marginLeft: 8 }} onClick={this.toggle}>{collapseText} <Icon
              type={this.state.expand ? 'up' : 'down'}/></a>}

          </span>
        </Col>
      </Row>
    )

  }

  render() {
    return (
      <div className={styles.queryForm}>
        <Form onSubmit={this.handleSearch}>
          {this.renderField()}
        </Form>
      </div>
    );
  }
}


