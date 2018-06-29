import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input,Select, message, Popconfirm, Divider,DatePicker } from 'antd';
import moment from 'moment';
import { disabledDateBefore } from '../../../utils/utils';
import styles from './index.less';

export default class TableForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }
  getRowByKey(key, newData) {
    return (newData || this.state.data).filter(item => item.key === key)[0];
  }
  index = 0;
  cacheOriginData = {};
  toggleEditable = (e, key) => {
    e.preventDefault();
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      console.log(newData);
      this.setState({ data: newData });
    }
  };
  remove(key) {
    const newData = this.state.data.filter(item => item.key !== key);
    this.setState({ data: newData });
    this.props.onChange(newData);
  }
  newMater = () => {
    const newData = this.state.data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      MATER_NAME: '',
      MATER_NUM: '',
      MATER_SPEC: '',
      DELIVER_DATE:'',
      MATER_REMRAK:'',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };
  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }
  handleFieldChange(e, fieldName, key) {
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }
  handleSelectChange(value,fieldValue,fieldName, key) {
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = value;
      target[fieldValue] = value.label;
      this.setState({ data: newData });
    }
  }

  handleDateChange(date,fieldName, key) {
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = date.format('YYYY-MM-DD');
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }

      const target = this.getRowByKey(key) || {};
      if (!target.MATER_ID || !target.MATER_NUM) {
        message.error('请填写完整原料信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      this.props.onChange(this.state.data);
      this.setState({
        loading: false,
      });
    }, 200);
  }
  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  }
  render() {
    const {materList} = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        render: (text, record, index)=><span>{index + 1}</span>
      },
      {
        title: '原料名称',
        dataIndex: 'MATER_CODE',
        sorter: (a, b) => a.MATER_CODE - b.MATER_CODE,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select labelInValue showSearch defaultValue={record.MATER_ID} onChange={e => this.handleSelectChange(e,'MATER_CODE','MATER_ID',record.key)} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{ minWidth: 150, width: '100%' }} placeholder="请选择原料">
                {materList.map((mater,idx) =>
                  <Select.Option key={`key_${idx}`} value={mater.MATER_ID}>{mater.MATER_CODE}</Select.Option>)
                }
              </Select>
            );
          }
          return text;
        },
      },
      {
        title: '原料数量',
        dataIndex: 'MATER_NUM',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'MATER_NUM', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
              />
            );
          }
          return text;
        },
      },
      {
        title: '原料规格',
        dataIndex: 'MATER_SPEC',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'MATER_SPEC', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
              />
            );
          }
          return text;
        },
      },
      {
        title: '原料单价',
        dataIndex: 'UNIT_PRICE',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'UNIT_PRICE', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
              />
            );
          }
          return text;
        },
      },
      {
        title: '交货时间',
        dataIndex: 'DELIVER_DATE',
        render: (text, record) => {
          if (record.editable) {
            if(record.DELIVER_DATE) {
              return (
                <DatePicker defaultValue={moment(record.DELIVER_DATE, 'YYYY-MM-DD')}
                            onChange={e => this.handleDateChange(e,'DELIVER_DATE', record.key)}
                            disabledDate={disabledDateBefore} style={{ width: '100%' }}/>
              );
            }else{
              return (
                <DatePicker onChange={e => this.handleDateChange(e,'DELIVER_DATE', record.key)}
                            disabledDate={disabledDateBefore} style={{ width: '100%' }}/>
              );
            }
          }
          return text;
        },
      },
      {
        title: '备注',
        dataIndex: 'MATER_REMRAK',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'MATER_REMRAK', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          if (!!record.editable && this.state.loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    return (
      <Fragment>
        <Table
          loading={this.state.loading}
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          rowClassName={record => {
            return record.editable ? styles.editable : '';
          }}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMater}
          icon="plus"
        >
          新增原料
        </Button>
      </Fragment>
    );
  }
}
