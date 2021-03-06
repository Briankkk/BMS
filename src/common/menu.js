import { isUrl } from '../utils/utils';
import { getAuthority,getCust } from '../utils/authority';

const menuData = {
  admin_super_admin: [
    {
      name: 'dashboard',
      icon: 'dashboard',
      path: 'dashboard',
      children: [
        {
          name: '分析页',
          path: 'analysis',
        },
        {
          name: '监控页',
          path: 'monitor',
        },
        {
          name: '工作台',
          path: 'workplace',
          // hideInBreadcrumb: true,
          // hideInMenu: true,
        },
      ],
    },
    {
      name: '表单页',
      icon: 'form',
      path: 'form',
      children: [
        {
          name: '基础表单',
          path: 'basic-form',
        },
        {
          name: '分步表单',
          path: 'step-form',
        },
        {
          name: '高级表单',
          authority: 'admin',
          path: 'advanced-form',
        },
      ],
    },
    {
      name: '列表页',
      icon: 'table',
      path: 'list',
      children: [
        {
          name: '查询表格',
          path: 'table-list',
        },
        {
          name: '标准列表',
          path: 'basic-list',
        },
        {
          name: '卡片列表',
          path: 'card-list',
        },
        {
          name: '搜索列表',
          path: 'search',
          children: [
            {
              name: '搜索列表（文章）',
              path: 'articles',
            },
            {
              name: '搜索列表（项目）',
              path: 'projects',
            },
            {
              name: '搜索列表（应用）',
              path: 'applications',
            },
          ],
        },
      ],
    },
    {
      name: '详情页',
      icon: 'profile',
      path: 'profile',
      children: [
        {
          name: '基础详情页',
          path: 'basic',
        },
        {
          name: '高级详情页',
          path: 'advanced',
          authority: 'admin',
        },
      ],
    },
    {
      name: '结果页',
      icon: 'check-circle-o',
      path: 'result',
      children: [
        {
          name: '成功',
          path: 'success',
        },
        {
          name: '失败',
          path: 'fail',
        },
      ],
    },
    {
      name: '异常页',
      icon: 'warning',
      path: 'exception',
      children: [
        {
          name: '403',
          path: '403',
        },
        {
          name: '404',
          path: '404',
        },
        {
          name: '500',
          path: '500',
        },
        {
          name: '触发异常',
          path: 'trigger',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '基础管理',
      icon: 'tool',
      path: 'management',
      children: [
        {
          name: '操作日志',
          path: 'handlerLog',
        },
        {
          name: '租户管理',
          path: 'cust',
        },
        {
          name: '客户管理',
          path: 'customer',
        },
        {
          name: '供应商管理',
          path: 'supplier',
        },
        {
          name: '批量上传',
          path: 'batchUpload',
        },
        {
          name: '员工管理',
          path: 'staff',
        }
      ]
    }
  ],
  CZHS_user: [
    {
      name: 'dashboard',
      icon: 'dashboard',
      path: 'dashboard',
      children: [
        {
          name: '分析页',
          path: 'analysis',
        },
        {
          name: '监控页',
          path: 'monitor',
        },
        {
          name: '工作台',
          path: 'workplace',
          // hideInBreadcrumb: true,
          // hideInMenu: true,
        },
      ],
    },
    {
      name: '表单页',
      icon: 'form',
      path: 'form',
      children: [
        {
          name: '基础表单',
          path: 'basic-form',
        },
        {
          name: '分步表单',
          path: 'step-form',
        },
        {
          name: '高级表单',
          authority: 'admin',
          path: 'advanced-form',
        },
      ],
    },
    {
      name: '列表页',
      icon: 'table',
      path: 'list',
      children: [
        {
          name: '查询表格',
          path: 'table-list',
        },
        {
          name: '标准列表',
          path: 'basic-list',
        },
        {
          name: '卡片列表',
          path: 'card-list',
        },
        {
          name: '搜索列表',
          path: 'search',
          children: [
            {
              name: '搜索列表（文章）',
              path: 'articles',
            },
            {
              name: '搜索列表（项目）',
              path: 'projects',
            },
            {
              name: '搜索列表（应用）',
              path: 'applications',
            },
          ],
        },
      ],
    },
    {
      name: '详情页',
      icon: 'profile',
      path: 'profile',
      children: [
        {
          name: '基础详情页',
          path: 'basic',
        },
        {
          name: '高级详情页',
          path: 'advanced',
          authority: 'admin',
        },
      ],
    },
    {
      name: '结果页',
      icon: 'check-circle-o',
      path: 'result',
      children: [
        {
          name: '成功',
          path: 'success',
        },
        {
          name: '失败',
          path: 'fail',
        },
      ],
    },
    {
      name: '异常页',
      icon: 'warning',
      path: 'exception',
      children: [
        {
          name: '403',
          path: '403',
        },
        {
          name: '404',
          path: '404',
        },
        {
          name: '500',
          path: '500',
        },
        {
          name: '触发异常',
          path: 'trigger',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '基础管理',
      icon: 'tool',
      path: 'management',
      children: [
        {
          name: '客户管理',
          path: 'customer',
        },
        {
          name: '供应商管理',
          path: 'supplier',
        },
        {
          name: '批量上传',
          path: 'batchUpload',
        }
      ],
    },
  ],
  CZHS_admin: [
    {
      name: 'dashboard',
      icon: 'dashboard',
      path: 'dashboard',
      children: [
        {
          name: '分析页',
          path: 'analysis',
        },
        {
          name: '监控页',
          path: 'monitor',
        },
        {
          name: '工作台',
          path: 'workplace',
          // hideInBreadcrumb: true,
          // hideInMenu: true,
        },
      ],
    },
    {
      name: '表单页',
      icon: 'form',
      path: 'form',
      children: [
        {
          name: '基础表单',
          path: 'basic-form',
        },
        {
          name: '分步表单',
          path: 'step-form',
        },
        {
          name: '高级表单',
          authority: 'admin',
          path: 'advanced-form',
        },
      ],
    },
    {
      name: '列表页',
      icon: 'table',
      path: 'list',
      children: [
        {
          name: '查询表格',
          path: 'table-list',
        },
        {
          name: '标准列表',
          path: 'basic-list',
        },
        {
          name: '卡片列表',
          path: 'card-list',
        },
        {
          name: '搜索列表',
          path: 'search',
          children: [
            {
              name: '搜索列表（文章）',
              path: 'articles',
            },
            {
              name: '搜索列表（项目）',
              path: 'projects',
            },
            {
              name: '搜索列表（应用）',
              path: 'applications',
            },
          ],
        },
      ],
    },
    {
      name: '详情页',
      icon: 'profile',
      path: 'profile',
      children: [
        {
          name: '基础详情页',
          path: 'basic',
        },
        {
          name: '高级详情页',
          path: 'advanced',
          authority: 'admin',
        },
      ],
    },
    {
      name: '结果页',
      icon: 'check-circle-o',
      path: 'result',
      children: [
        {
          name: '成功',
          path: 'success',
        },
        {
          name: '失败',
          path: 'fail',
        },
      ],
    },
    {
      name: '异常页',
      icon: 'warning',
      path: 'exception',
      children: [
        {
          name: '403',
          path: '403',
        },
        {
          name: '404',
          path: '404',
        },
        {
          name: '500',
          path: '500',
        },
        {
          name: '触发异常',
          path: 'trigger',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '基础管理',
      icon: 'tool',
      path: 'management',
      children: [
        {
          name: '员工管理',
          path: 'staff',
        },
        {
          name: '登录审核',
          path: 'authRequest',
        },
        {
          name: '客户管理',
          path: 'customer',
        },
        {
          name: '供应商管理',
          path: 'supplier',
        },
        {
          name: '批量上传',
          path: 'batchUpload',
        }
      ],
    },
    {
      name: '原料管理',
      icon: 'tool',
      path: 'mater',
      children: [
        {
          name: '原料管理',
          path: 'mater',
        },
        {
          name: '采购单管理',
          path: 'purchase',
        }
      ],
    },
    {
      name: '产品管理',
      icon: 'tool',
      path: 'prod',
      children: [
        {
          name: '产品管理',
          path: 'prod',
        }
      ],
    },
  ],
}


function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => {
  const role = getAuthority()//sessionStorage.getItem('authority');
  const custCode = getCust();//sessionStorage.getItem('cust_code');
  if (role&& role !== 'guest' && role !== undefined && role !== 'undefined') {
    return formatter(menuData[custCode + '_' + role]);
  } else {
    return formatter([]);
  }
}
