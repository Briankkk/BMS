import React, { PureComponent, Fragment } from 'react';
import { Table } from 'antd';
import styles from './index.less';



class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
  }

  handleTableChange = (pagination, filters, sorter) => {
    //this.props.onChange(pagination, filters, sorter);
  };


  render() {
    const {  dataSource, pagination , loading, columns, rowKey } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={rowKey || 'key'}
          dataSource={dataSource}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
