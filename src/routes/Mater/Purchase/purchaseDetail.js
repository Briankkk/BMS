import React, { PureComponent,Fragment} from 'react';
import { Card, Badge, Table, Divider,Button } from 'antd';
import { FormField,FooterToolbar,DescriptionList} from 'components';
import styles from './index.less';
const { Description } = DescriptionList;




export default class PurchaseDetail extends PureComponent {


  render() {
    const { purchaseInfo, loading,handleCancel } = this.props;
    console.log(purchaseInfo)

    const columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        render: (text, record, index)=><span>{index + 1}</span>
      },
      {
        title: '原料名称',
        dataIndex: 'MATER_CODE'
      },
      {
        title: '原料型号',
        dataIndex: 'MATER_NAME'
      },
      {
        title: '原料数量',
        dataIndex: 'MATER_NUM',
      },
      {
        title: '原料规格',
        dataIndex: 'MATER_SPEC',
      },
      {
        title: '状态',
        dataIndex: 'STATE',
        render: text =>
          text === '1' ? (
            <Badge status="success" text="成功" />
          ) : (
            <Badge status="processing" text="进行中" />
          ),
      },
      {
        title: '原料单价',
        dataIndex: 'UNIT_PRICE',
      },
      {
        title: '交货时间',
        dataIndex: 'DELIVER_DATE',
      },
      {
        title: '备注',
        dataIndex: 'MATER_REMRAK',
      }
    ]

    return (
      <Fragment>
        <Card bordered={false}>
          <DescriptionList size="large" title="采购单概要" style={{ marginBottom: 32 }}>
            <Description term="取货单号">1000000000</Description>
            <Description term="状态">已取货</Description>
            <Description term="销售单号">1234123421</Description>
            <Description term="子订单">3214321432</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />

          <div className={styles.title}>采购单原料</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            rowKey={record => record.MATER_ID}
            loading={loading}
            dataSource={purchaseInfo}
            columns={columns}
          />
        </Card>
        <FooterToolbar >
          <Button type="primary" onClick={handleCancel} loading={loading}>
            返回
          </Button>
        </FooterToolbar>
      </Fragment>
    );
  }
}
