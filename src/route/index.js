import Vue from "vue";
import Router from "vue-router";

import Layout from "@/layout/index.vue";

Vue.use(Router);

// 解决 NavigationDuplicated: Avoided redundant navigation to current location 报错
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

const constantRoutes = [
  {
    path: "/info_screen/login",
    component: () => import("../view/login/index.vue"),
    hidden: true,
  },
  {
    name: "register",
    path: "/info_screen/register",
    component: () => import("../view/register/index.vue"),
    hidden: true,
  },
  {
    name: "forget",
    path: "/info_screen/forget",
    component: () => import("../view/forget/index.vue"),
    hidden: true,
  },
  {
    name: "redirect-home",
    path: "/",
    redirect: "/info_screen/home",
    hidden: true,
  },
  {
    path: "/info_screen",
    component: Layout,
    hidden: true,
    children: [
      {
        // 主页
        name: "ifiBord Dashboard",
        path: "home",
        component: () => import("@/view/home/index.vue"),
        meta: {
          title: "route.home",
        },
      },
    ],
  },
  // ticket 投票模块
  {
    name: "TicketChoice",
    path: "/info_screen/ticket/choice",
    component: () => import("@/view/ticket/choice"),
    hidden: true,
  },
  {
    name: "TicketIndex",
    path: "/info_screen/ticket/index",
    component: () => import("@/view/ticket/index"),
    hidden: true,
  },
  {
    name: "TicketIndex2",
    path: "/info_screen/ticket/index2",
    component: () => import("@/view/ticket/index2"),
    hidden: true,
  },
  {
    name: "TicketIndex3",
    path: "/info_screen/ticket/index3",
    component: () => import("@/view/ticket/index3"),
    hidden: true,
  },
  {
    name: "TicketResult",
    path: "/info_screen/ticket/result",
    component: () => import("@/view/ticket/result"),
    hidden: true,
  },
  {
    name: "TicketResult2",
    path: "/info_screen/ticket/result2",
    component: () => import("@/view/ticket/result2"),
    hidden: true,
  },
  {
    name: "TicketResult3",
    path: "/info_screen/ticket/result3",
    component: () => import("@/view/ticket/result3"),
    hidden: true,
  },
  //screen单独新开标签页的数据大屏
  {
    name: "screen_company",
    path: "/info_screen/screen/company",
    component: () => import("@/view/screen/company/indexV3"),
    hidden: true,
  },
  {
    name: "sts",
    path: "/info_screen/screen/sts",
    component: () => import("@/view/screen/sts/indexV3"),
    hidden: true,
  },
  {
    name: "marketing",
    path: "/info_screen/screen/marketing",
    component: () => import("@/view/screen/marketing/indexV3"),
    hidden: true,
  },
  {
    name: "finance",
    path: "/info_screen/screen/finance/finance",
    component: () => import("@/view/screen/finance/finance/index"),
    hidden: true,
  },
  {
    name: "financeV2",
    path: "/info_screen/screen/finance/financeV2",
    component: () => import("@/view/screen/finance/finance/indexV2"),
    hidden: true,
  },
  {
    name: "cost",
    path: "/info_screen/screen/finance/cost",
    component: () => import("@/view/screen/finance/cost/index"),
    hidden: true,
  },
  {
    name: "money",
    path: "/info_screen/screen/finance/money",
    component: () => import("@/view/screen/finance/money/index"),
    hidden: true,
  },
  {
    name: "profit",
    path: "/info_screen/screen/profit",
    meta: {
      title: "盈亏平衡模型",
    },
    component: () => import("@/view/screen/profit/index"),
    hidden: true,
  },
  //DINGDING
  {
    name: "dingding",
    path: "/info_screen/dingding/publish",
    component: () => import("@/view/dingding/index.vue"),
    hidden: true,
  },
  // {
  //   name:"publish",
  //   path:"/info_screen/dingding/index",
  //   component:() => import('@/view/dingding/publish.vue'),
  //   hidden:true
  // },
  {
    name: "news-publish",
    path: "/info_screen/dingding/index",
    component: () => import("@/view/dingding/component/key-new.vue"),
    hidden: true,
  },
  {
    name: "shows-publish",
    path: "/info_screen/dingding/shows/publish",
    component: () => import("@/view/dingding/component/show-new.vue"),
    hidden: true,
  },
  {
    name: "notices-publish",
    path: "/info_screen/dingding/notices/publish",
    component: () => import("@/view/dingding/component/urgent-new.vue"),
    hidden: true,
  },
  {
    name: "news",
    path: "/info_screen/dingding/news",
    component: () => import("@/view/dingding/component/news.vue"),
    hidden: true,
  },
  {
    name: "notices",
    path: "/info_screen/dingding/notices",
    component: () => import("@/view/dingding/component/notices.vue"),
    hidden: true,
  },
  {
    name: "shows",
    path: "/info_screen/dingding/shows",
    component: () => import("@/view/dingding/component/shows.vue"),
    hidden: true,
  },
  //manage
  {
    name: "style",
    path: "/info_screen/style",
    component: Layout,
    hidden: false,
    children: [
      // {
      //   path:'company',
      //   name:'style-company',
      //   component: () => import('@/view/style/company.vue')
      // },
      // {
      //   path:'sts',
      //   name:'style-sts',
      //   component: () => import('@/view/style/sts.vue')
      // },
      // {
      //   path:'marketing',
      //   name:'style-marketing',
      //   component: () => import('@/view/style/marketing.vue')
      // },
      // {
      //   path:'updateStyle',
      //   name:'style-update',
      //   component: () => import('@/view/style/updateStyle.vue'),
      //   props: route => ({query:route.query.styleId})
      // },
      // {
      //   path:'addStyle',
      //   name:'style-add',
      //   component: () => import('@/view/style/addStyle.vue'),
      //   props: route => ({query:route.query.screenId})
      // },
    ],
  },
  //数据
  {
    name: "data",
    path: "/info_screen/data",
    component: Layout,
    hidden: false,
    meta: {
      title: "route.dataManager",
    },
    children: [
      {
        name: "test1",
        path: "test1",
        meta: {
          title: "Test1",
        },
        component: () => import("@/view/test/test1.vue"),
        hidden: true,
      },
      {
        name: "excel",
        path: "lucky",
        meta: {
          title: "excel",
        },
        component: () => import("@/view/test/lucky-sheet.vue"),
        hidden: true,
      },
      {
        name: "Company",
        path: "company",
        meta: {
          title: "route.company",
        },
        component: () => import("@/view/screen/company/index1"),
        hidden: true,
      },
      {
        name: "Tech Support",
        path: "sts",
        meta: {
          title: "route.techSupport",
        },
        component: () => import("@/view/screen/sts/index1"),
        hidden: true,
      },
      {
        name: "Marketing",
        path: "marketing",
        meta: {
          title: "route.marketing",
        },
        component: () => import("@/view/screen/marketing/index1"),
        hidden: true,
      },
      {
        path: "ticket",
        name: "data-ticket",
        meta: {
          title: "Ticket",
        },
        component: () => import("@/view/data/ticket/index.vue"),
      },
      {
        path: "ticket/add",
        name: "data-ticket-add",
        component: () => import("@/view/data/ticket/add.vue"),
      },
      {
        path: "ticket/view",
        name: "data-ticket-view",
        meta: {
          title: "Ticket View",
        },
        component: () => import("@/view/data/ticket/view.vue"),
      },
      // 退货
      {
        path: "return",
        name: "dms:sts:return",
        meta: {
          title: "route.return",
        },
        component: () => import("@/view/data/return/index.vue"),
      },
      {
        path: "return/add",
        name: "data-return-add",
        component: () => import("@/view/data/return/add.vue"),
      },
      // 产品时间点
      {
        path: "stage",
        name: "dms:marketing:stage",
        meta: {
          title: "route.productStage",
        },
        component: () => import("@/view/data/stage/index.vue"),
      },
      {
        path: "stage/add",
        name: "data-stage-add",
        component: () => import("@/view/data/stage/add.vue"),
      },
      {
        path: "stage/view",
        name: "data-stage-view",
        meta: {
          title: "Product Stage View",
        },
        component: () => import("@/view/data/stage/view.vue"),
      },
      // 紧急通知
      {
        path: "notice",
        name: "dms:sts:notice",
        meta: {
          title: "route.notices",
        },
        component: () => import("@/view/data/notice/index.vue"),
      },
      // 项目日历
      {
        path: "project",
        name: "dms:marketing:project",
        meta: {
          title: "route.projectCalendar",
        },
        component: () => import("@/view/data/project/index.vue"),
      },
      {
        path: "project/add",
        name: "data-project-add",
        component: () => import("@/view/data/project/add.vue"),
      },
      {
        path: "overstock",
        name: "data-overstock",
        meta: {
          title: "Overstock",
        },
        component: () => import("@/view/data/overstock/index.vue"),
      },
      {
        path: "overstock/add",
        name: "data-overstock-add",
        component: () => import("@/view/data/overstock/add.vue"),
      },
      {
        path: "sale",
        name: "data-sale",
        meta: {
          title: "Sale",
        },
        component: () => import("@/view/data/sale/index.vue"),
      },
      {
        path: "sale/add",
        name: "data-sale-add",
        component: () => import("@/view/data/sale/add.vue"),
      },
      // 时钟
      {
        path: "clock",
        name: "dms-clock",
        meta: {
          title: "route.clock",
        },
        component: () => import("@/view/data/clock/index.vue"),
        props: (route) => ({
          query: route.query.screenId,
        }),
      },
      {
        path: "clock/team",
        name: "data-clock-team",
        meta: {
          title: "route.team",
        },
        component: () => import("@/view/data/clock/team.vue"),
        props: (route) => ({
          query: route.query.clockId,
        }),
      },
      // 假期
      {
        path: "calendar",
        // name: "data-calendar",
        name: "dms:company:vocation",
        meta: {
          title: "route.vacation",
        },
        component: () => import("@/view/data/calendar/index.vue"),
        //props: route => ({query:route.query.screenId})
      },
      //展会消息
      {
        path: "show",
        name: "dms:marketing:show",
        meta: {
          title: "route.extNews",
        },
        component: () => import("@/view/data/show/index.vue"),
      },
      {
        path: "show/add",
        name: "data-show-add",
        component: () => import("@/view/data/show/add.vue"),
      },
      // 内部消息
      {
        path: "keynew",
        name: "dms:company:news",
        meta: {
          title: "route.intNews",
        },
        component: () => import("@/view/data/keynew/index.vue"),
      },
      {
        path: "keynew/add",
        name: "data-keynew-add",
        component: () => import("@/view/data/keynew/add.vue"),
      },
      // 媒体新闻
      {
        path: "awards",
        name: "dms:company:award",
        meta: {
          title: "route.mediaNews",
        },
        component: () => import("@/view/data/awards/index.vue"),
      },
      // 新闻
      {
        path: "product",
        name: "dms:company:product",
        meta: {
          title: "route.productName",
        },
        component: () => import("@/view/data/product/index.vue"),
      },
      // EOL
      {
        path: "eol",
        name: "dms:marketing:eol",
        meta: {
          title: "route.eol",
        },
        component: () => import("@/view/data/eol/index.vue"),
      },
      // 特殊项目
      {
        path: "specialProject",
        name: "dms:marketing:specialProject",
        meta: {
          title: "route.specialProject",
        },
        component: () => import("@/view/data/specialProject/index.vue"),
      },
      // 产品测试时间点
      {
        path: "productTesting",
        name: "dms:sts:productTesting",
        meta: {
          title: "route.productTesting",
        },
        component: () => import("@/view/data/productTesting/index.vue"),
      },
      // 软件硬件时间点
      {
        path: "software",
        name: "dms:sts:software",
        meta: {
          title: "route.softwareStage",
        },
        component: () => import("@/view/data/software/index.vue"),
      },
      {
        path: "avgTicket",
        name: "data-avgTicket",
        meta: {
          title: "AvgTicket",
        },
        component: () => import("@/view/data/avgTicket/index.vue"),
      },
      {
        path: "unsolvedTicket",
        name: "data-unsolvedTicket",
        meta: {
          title: "UnsolvedTicket",
        },
        component: () => import("@/view/data/unsolvedTicket/index.vue"),
      },
      {
        path: "rma",
        name: "data-rma",
        meta: {
          title: "RMA",
        },
        component: () => import("@/view/data/rma/index.vue"),
      },
      // 每月库存
      {
        path: "monthOverstock",
        name: "dms:marketing:monthOverstock",
        meta: {
          title: "route.monthOverstock",
        },
        component: () => import("@/view/data/monthOverstock/index.vue"),
      },
      // 投诉
      {
        path: "complaint",
        name: "dms:sts:complaint",
        meta: {
          title: "route.complaint",
        },
        component: () => import("@/view/data/complaint/index.vue"),
      },
      // 未解决投诉
      {
        path: "complaintUnsolved",
        name: "dms:sts:complaintUnsolved",
        meta: {
          title: "route.unsolvedComplaint",
        },
        component: () => import("@/view/data/complaintUnsolved/index.vue"),
      },

      // excel模板管理
      {
        path: "excelTemplate",
        // name: "excel-template",
        name: "dms:excel:template",
        meta: {
          title: "route.excelTemplate",
        },
        component: () => import("@/view/data/excelTemplate/index.vue"),
      },
    ],
  },
  //财务模块
  {
    name: "finance-data",
    path: "/info_screen/fdata", //菜单的资源url是前端访问的地址
    component: Layout,
    hidden: false,
    meta: {
      title: "route.financeDataManager",
    },
    children: [
      // Excel编辑模块, 只能内嵌在菜单路由下，不然访问会没有侧边菜单栏,其他菜单路由如需使用，直接复制代码到对应菜单路由下
      {
        name: "EditContributionEdit",
        path: "/info_screen/excel/contributionEdit",
        component: () => import("../view/excel/contributionEdit.vue"),
        hidden: true,
        meta: {
          title: "协同编辑Excel",
        },
      },
      // 财务部门数据管理-财务
      {
        path: "finance",
        name: "fdms:finance",
        meta: {
          title: "home.finance",
        },
        component: () => import("@/view/finance_data/finance/index.vue"),
      },
      // 财务部门数据管理-部门
      {
        path: "department",
        name: "fdms:department",
        meta: {
          title: "cost.department",
        },
        component: () => import("@/view/finance_data/department/index.vue"),
      },
      //现金流
      {
        path: "cash",
        name: "fdms:money",
        meta: {
          title: "finance.cashManagement.cashFlows",
        },
        component: () => import("@/view/finance_data/cash/index.vue"),
      },
      //盈亏机型管理
      {
        path: "profit",
        name: "fdms:profit", //显示在菜单栏上的name和path与数据大屏的name和path不同
        meta: { title: "finance.profit.modelTitle" },
        component: () => import("@/view/finance_data/profit/table.vue"),
      },
      {
        name: "profit",
        path: "screen/profit",
        meta: {
          title: "Profit Dashboard",
        },
        component: () => import("@/view/screen/profit/index"),
        hidden: true,
      },
      {
        name: "finance-screen",
        path: "screen/finance",
        meta: {
          title: "Finance",
        },
        component: () => import("@/view/screen/finance/finance/index"), //菜单栏中内嵌数据大屏
        hidden: true,
      },
      {
        name: "cost-screen",
        path: "screen/cost",
        meta: {
          title: "Department",
        },
        component: () => import("@/view/screen/finance/cost/index"),
        hidden: true,
      },
      {
        name: "money-screen",
        path: "screen/money",
        meta: {
          title: "Cash",
        },
        component: () => import("@/view/screen/finance/money/index"),
        hidden: true,
      },
    ],
  },
  //日志
  {
    name: "log",
    path: "/info_screen/log",
    component: Layout,
    hidden: false,
    meta: {
      title: "route.log",
    },
    children: [
      {
        path: "exception",
        name: "log-exception",
        meta: {
          title: "route.exception",
        },
        component: () => import("@/view/log/exception.vue"),
      },
      // 日志--操作
      {
        path: "operation",
        name: "log:operation",
        meta: {
          title: "route.operation",
        },
        component: () => import("@/view/log/operation.vue"),
      },
    ],
  },
  // 用户
  {
    name: "user",
    path: "/info_screen/user",
    component: Layout,
    hidden: false,
    meta: {
      title: "route.account",
    },
    children: [
      // 设置
      {
        path: "setting",
        name: "my:setting",
        meta: {
          title: "route.personalSetting",
        },
        component: () => import("@/view/user/setting.vue"),
      },
      {
        path: "password",
        name: "user-password",
        meta: {
          title: "route.updatePassword",
        },
        component: () => import("@/view/user/password.vue"),
      },
      // 个人信息
      {
        path: "info",
        name: "my:info",
        meta: {
          title: "route.myInfo",
        },
        component: () => import("@/view/user/info.vue"),
      },
      {
        path: "bindEmail",
        name: "bind-email",
        meta: {
          title: "route.bindEmail",
        },
        component: () => import("@/view/user/bindEmail.vue"),
      },
    ],
  },
  {
    name: "permission",
    path: "/info_screen/data",
    component: Layout,
    hidden: false,
    meta: {
      title: "route.permission",
    },
    children: [
      //权限-用户
      {
        path: "user",
        name: "ums:user",
        meta: {
          title: "route.user",
        },
        component: () => import("@/view/data/system/user/index.vue"),
      },
      //权限-角色
      {
        path: "role",
        name: "ums:role",
        meta: {
          title: "route.role",
        },
        component: () => import("@/view/data/system/role/index.vue"),
      },
      //权限-菜单
      {
        path: "menu",
        name: "ums:menu",
        meta: {
          title: "route.menu",
        },
        component: () => import("@/view/data/system/menu/index.vue"),
      },
      // 权限-资源
      {
        path: "resource",
        name: "ums:resource",
        meta: {
          title: "route.resource",
        },
        component: () => import("@/view/data/system/resource/index.vue"),
      },
    ],
  },

  // 盈亏平衡模型
  // {
  //   name: "profit",
  //   path: "/info_screen/profit",
  //   meta: {
  //     title: "盈亏模型",
  //   },
  //   children: [
  //     {
  //       path: "manage",
  //       name: "profit-manage",
  //       meta: { title: "机型管理" },
  //       component: () => import("@/view/profit/table.vue"),
  //     },
  //   ],
  // },

  // 春茗节目投票
  {
    name: "index2",
    path: "/act/votedv2/index",
    meta: {
      title: "春茗节目投票",
    },
    component: () => import("@/view/act/index.vue"),
    hidden: true,
  },
  {
    name: "votedv2",
    path: "/act/votedv2/index2",
    meta: {
      title: "春茗节目投票",
    },
    component: () => import("@/view/act/index2.vue"),
    hidden: true,
  },
  {
    name: "index3",
    path: "/act/votedv2/index3",
    meta: {
      title: "春茗节目投票",
    },
    component: () => import("@/view/act/index3.vue"),
    hidden: true,
  },
  {
    name: "result",
    path: "/act/votedv2/result",
    meta: {
      title: "春茗节目投票",
    },
    component: () => import("@/view/act/result.vue"),
    hidden: true,
  },
  {
    name: "result2",
    path: "/act/votedv2/result2",
    meta: {
      title: "春茗节目投票",
    },
    component: () => import("@/view/act/result2.vue"),
    hidden: true,
  },
  {
    name: "result3",
    path: "/act/votedv2/result3",
    meta: {
      title: "春茗节目投票",
    },
    component: () => import("@/view/act/result3.vue"),
    hidden: true,
  },
  {
    name: "choice",
    path: "/act/votedv2/choice",
    meta: {
      title: "春茗节目投票",
    },
    component: () => import("@/view/act/choice.vue"),
    hidden: true,
  },
  {
    name: "404",
    path: "/404",
    component: () => import("@/view/notFound/index.vue"),
  },
  {
    path: "*", // 此处需特别注意至于最底部
    redirect: "/404",
  },
];

const createRouter = () =>
  new Router({
    routes: constantRoutes,
  });

const router = createRouter();

export default router;
