export const getCust = {
  code: 0,
  message: 'success',
  data: [{
    name: 'Customer1',
    shortName: 'cust1',
    code: 'CUST_1',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer2',
    shortName: 'cust2',
    code: 'CUST_2',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer3',
    shortName: 'cust3',
    code: 'CUST_3',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer4',
    shortName: 'cust4',
    code: 'CUST_4',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer5',
    shortName: 'cust5',
    code: 'CUST_5',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer6',
    shortName: 'cust6',
    code: 'CUST_6',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer7',
    shortName: 'cust7',
    code: 'CUST_7',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer8',
    shortName: 'cust8',
    code: 'CUST_8',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer9',
    shortName: 'cust9',
    code: 'CUST_9',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer10',
    shortName: 'cust10',
    code: 'CUST_10',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer11',
    shortName: 'cust11',
    code: 'CUST_11',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer12',
    shortName: 'cust12',
    code: 'CUST_12',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer13',
    shortName: 'cust13',
    code: 'CUST_13',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer14',
    shortName: 'cust14',
    code: 'CUST_14',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer15',
    shortName: 'cust15',
    code: 'CUST_15',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer16',
    shortName: 'cust16',
    code: 'CUST_16',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer17',
    shortName: 'cust17',
    code: 'CUST_17',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer18',
    shortName: 'cust18',
    code: 'CUST_18',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer19',
    shortName: 'cust19',
    code: 'CUST_19',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer20',
    shortName: 'cust20',
    code: 'CUST_20',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer21',
    shortName: 'cust21',
    code: 'CUST_21',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer22',
    shortName: 'cust22',
    code: 'CUST_22',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer23',
    shortName: 'cust23',
    code: 'CUST_23',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  }, {
    name: 'Customer24',
    shortName: 'cust24',
    code: 'CUST_24',
    linkman: 'aaa',
    phone: '1223',
    address: '科学搬砖组',
  },
  ],
};


export function postCust(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no, description } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        no: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        description,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getCust,
  postCust,
};
