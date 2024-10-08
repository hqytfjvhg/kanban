import router from "./route";
import store from "./store";

// 白名单
const whiteList = [
  "/info_screen/screen/sts",
  "/info_screen/screen/marketing",
  "/info_screen/screen/company",
  "/info_screen/screen/finance/finance",
  "/info_screen/screen/finance/cost",
  "/info_screen/screen/finance/money",
  "/info_screen/screen/finance/financeV2",
  "/info_screen/register",
  "/info_screen/forget",
  "/info_screen/dingding/publish",
  "/info_screen/dingding/index",
  "/info_screen/dingding/news",
  "/info_screen/dingding/shows",
  "/info_screen/dingding/notices",
  "/info_screen/dingding/shows/publish",
  "/info_screen/dingding/notices/publish",
  //旧投票模块
  "/info_screen/ticket/choice",
  "/info_screen/ticket/index",
  "/info_screen/ticket/index2",
  "/info_screen/ticket/index3",
  "/info_screen/ticket/result",
  "/info_screen/ticket/result1",
  "/info_screen/ticket/result2",
  "/info_screen/ticket/result3",

  // 盈亏平衡模型
  // '/profit/index',
  // 春茗节目投票
  "/act/votedv2/index",
  "/act/votedv2/index2",
  "/act/votedv2/index3",
  "/act/votedv2/result",
  "/act/votedv2/result2",
  "/act/votedv2/result3",
  "/act/votedv2/choice",
];

router.beforeEach(async (to, from, next) => {
  //${to and from are Route Object,next() must be called to resolve the hook}

  const expired = 8 * 60 * 60 * 1000;
  const login_time = parseInt(store.getters.login_time);
  const token = store.getters.token;
  console.info("鉴权");
  //register page
  if (whiteList.indexOf(to.path) !== -1) {
    console.info("鉴权");
    next();
  } else {
    console.info("33333=====");

    if (token) {
      if (login_time + expired <= new Date().getTime()) {
        store
          .dispatch("user/resetAction")
          .then(console.log(`reset token and login_time successfully`));

        if (to.path !== "/info_screen/login") {
          next({
            path: "/info_screen/login",
          });
        } else {
          next();
        }
      }
      // let role = store.getters.role
      // if(role === "none"){
      //     role =  await store.dispatch('role/getRoleAction')
      // }

      if (to.path === "/info_screen/login") {
        next("/");
      } else {
        next();
      }
    } else {
      if (to.path === "/info_screen/login") {
        next();
      } else {
        next({
          path: "/info_screen/login",
        });
      }
    }
  }
});
