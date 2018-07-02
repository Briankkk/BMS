import React, { PureComponent,Fragment} from 'react';
import { Card, Badge, Table, Divider,Button } from 'antd';
import moment from 'moment';
import { FormField,FooterToolbar,DescriptionList} from 'components';
import styles from './index.less';
const { Description } = DescriptionList;




export default class PurchaseDetail extends PureComponent {


  render() {
    const { purchaseInfo, loading,handleCancel,handleExportPDF } = this.props;

    const purchaseSummary = {
      SUPPLIER_NAME:purchaseInfo[0].SUPPLIER_NAME,
      PURCHASE_CODE:purchaseInfo[0].PURCHASE_CODE,
      PHONE:purchaseInfo[0].PHONE,
      REMARK:purchaseInfo[0].REMARK,
      DELIVER_DATE:moment(purchaseInfo[0].DELIVER_DATE).format('YYYY-MM-DD')
    };

    const exportPDF = () => {
      const purchaseId = purchaseInfo[0].SUPPLIER_ID;
      handleExportPDF(purchaseId);
    };

    const columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        render: (text, record, index)=><span>{index + 1}</span>
      },
      {
        title: '原料名称',
        dataIndex: 'MATER_NAME'
      },
      {
        title: '原料型号',
        dataIndex: 'MATER_CODE',
        sorter: (a, b) => a.MATER_CODE - b.MATER_CODE
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
            <Badge status="success" text="完成" />
          ) : (
            <Badge status="Error" text="在途" />
          ),
      },
      {
        title: '原料单价',
        dataIndex: 'UNIT_PRICE',
      },
      {
        title: '交货时间',
        dataIndex: 'MATER_DELIVER_DATE',
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
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
            <Description term="采购单编号">{purchaseSummary.PURCHASE_CODE}</Description>
            <Description term="供应商名称">{purchaseSummary.SUPPLIER_NAME}</Description>
            <Description term="交货时间">{purchaseSummary.DELIVER_DATE}</Description>
            <Description term="联系电话">{purchaseSummary.PHONE}</Description>
            <Description term="备注">{purchaseSummary.REMARK}</Description>
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
          <Button type="primary" onClick={exportPDF} loading={loading}>
            导出
          </Button>
          <Button type="ghost" style={{ marginLeft: 8 }} onClick={handleCancel}>
            返回
          </Button>
        </FooterToolbar>
      </Fragment>
    );
  }
}
