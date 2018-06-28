import React, {PureComponent} from 'react';
import {Input, Icon, Select} from 'antd';
import {editCell, editLine, inputWrapper, textWrapper, checkIcon, editIcon, hiddenIcon} from './index.less';

const Option = Select.Option;

export default class ListEditableCell extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleSelect = (value) => {
    this.setState({value});
  };

  check = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  render() {
    let { editable, value,list} = this.props;
    return (
      <div className={editCell}>
        {
          editable ?
            (
              <div className={inputWrapper}>
                <Select
                  defaultValue={{ key: value.key }}
                  onSelect={this.handleSelect}
                  onBlur={this.check}
                  style={{ minWidth: 120, width:'100%' }}
                  disabled={disabled || false}
                  labelInValue
                >
                  {
                    list.map((item,idx)=>
                      <Select.Option key={`key_${idx}`} value={item.MATER_ID}>{item.MATER_CODE}</Select.Option>
                    )
                  }
                </Select>
              </div>
            ) :
            (
              <div className={textWrapper}>
                {value.label}
              </div>
            )

        }
      </div>
    );
  }
}

