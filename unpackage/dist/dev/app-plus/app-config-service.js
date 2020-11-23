
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/index/invest","pages/index/bill","pages/index/billDetails","pages/index/product","pages/index/productDetails","pages/index/notice","pages/index/noticeDetails","pages/market/market","pages/market/category","pages/market/search","pages/market/searchResult","pages/market/details","pages/market/confirmOrder","pages/market/remarks","pages/market/pay","pages/market/payResult","pages/market/address","pages/market/editAddress","pages/cart/cart","pages/cart/order","pages/cart/news","pages/cart/PostSale","pages/cart/returnInfo","pages/cart/detail","pages/cart/orderDetail","pages/cart/Service","pages/cart/logistics","pages/cart/writeForm","pages/cart/writeForm2","pages/cart/remarks","pages/user/user","pages/user/userInfo","pages/user/setUp","pages/user/payPas","pages/user/team","pages/user/teamDetail","pages/user/share","pages/user/help","pages/user/about","pages/user/text","pages/user/contact","pages/share/share","pages/share/details","pages/wallet/wallet","pages/wallet/recharge","pages/wallet/withdraw","pages/wallet/choiceCoin","pages/wallet/transfer","pages/wallet/bill","pages/wallet/trade","pages/wallet/otcList","pages/wallet/otcRecord","pages/wallet/otcDetails","pages/wallet/record","pages/wallet/recordDetail","pages/wallet/integral","pages/login/login","pages/login/register","pages/login/forgetPass","pages/login/forgetPayPass","pages/login/modifyPass","pages/login/modifyPayPass","pages/card/card","pages/card/addCard","pages/chainReform/chainReform","pages/chainReform/recharge","pages/chainReform/withdraw","pages/chainReform/Notice","pages/chainReform/contract","pages/chainReform/applyChainReform","pages/chainReform/applyChainReform1","pages/chainReform/chainReformDetail","pages/chainReform/chainReformBill","pages/chainReform/pay","pages/wallet/exchange","pages/wallet/duihuan1","pages/wallet/duihuan2","pages/wallet/duihuan3","pages/wallet/duihuanBill","pages/wallet/shenqingshiwu","pages/user/shiming"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"QSC","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#999999","selectedColor":"#221915","borderStyle":"none","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/index/index","iconPath":"static/tab/index.png","selectedIconPath":"static/tab/index-active.png","text":"首页"},{"pagePath":"pages/market/category","iconPath":"static/tab/lianqitong1.png","selectedIconPath":"static/tab/lianqitong0.png","text":"链企通"},{"pagePath":"pages/chainReform/chainReform","iconPath":"static/tab/change.png","selectedIconPath":"static/tab/change-active.png","text":"链惠通"},{"pagePath":"pages/wallet/exchange","iconPath":"static/tab/lianfutong1.png","selectedIconPath":"static/tab/lianfutong0.png","text":"链付通"},{"pagePath":"pages/user/user","iconPath":"static/tab/user.png","selectedIconPath":"static/tab/user-active.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"链++","compilerVersion":"2.8.13","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#211817","navigationBarTextStyle":"white","titleNView":false,"enablePullDownRefresh":true}},{"path":"/pages/index/invest","meta":{},"window":{"navigationBarTitleText":"我的收益","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/index/bill","meta":{},"window":{"navigationBarTitleText":"收益明细","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/index/billDetails","meta":{},"window":{"navigationBarTitleText":"消费详情","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/index/product","meta":{},"window":{"navigationBarTitleText":"消费套餐"}},{"path":"/pages/index/productDetails","meta":{},"window":{"navigationBarTitleText":"立即消费","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/index/notice","meta":{},"window":{"navigationBarTitleText":"公告"}},{"path":"/pages/index/noticeDetails","meta":{},"window":{"navigationBarTitleText":"公告详情"}},{"path":"/pages/market/market","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#211817","navigationBarTextStyle":"white","titleNView":false}},{"path":"/pages/market/category","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类","titleNView":{"autoBackButton":"false","searchInput":{"disabled":true,"backgroundColor":"#F5F5F5","borderRadius":"2px","placeholder":"搜索你心仪的东西","placeholderColor":"#999999","align":"left"}}}},{"path":"/pages/market/search","meta":{},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/market/searchResult","meta":{},"window":{"navigationBarTitleText":"搜索结果"}},{"path":"/pages/market/details","meta":{},"window":{"navigationBarTitleText":"商品详情"}},{"path":"/pages/market/confirmOrder","meta":{},"window":{"navigationBarTitleText":"确认订单"}},{"path":"/pages/market/remarks","meta":{},"window":{"navigationBarTitleText":"用户评价"}},{"path":"/pages/market/pay","meta":{},"window":{"navigationBarTitleText":"收银台"}},{"path":"/pages/market/payResult","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/market/address","meta":{},"window":{"navigationBarTitleText":"收货地址","titleNView":{"buttons":[{"fontSrc":"/static/iconfont.ttf","text":"","titleColor":"#333333","float":"right","fontSize":"18"}]}}},{"path":"/pages/market/editAddress","meta":{},"window":{"navigationBarTitleText":"编辑地址"}},{"path":"/pages/cart/cart","meta":{},"window":{"navigationBarTitleText":"购物车","titleNView":{"buttons":[{"fontSrc":"/static/iconfont.ttf","text":"","titleColor":"#333333","float":"right","fontSize":"18"}]}}},{"path":"/pages/cart/order","meta":{},"window":{"navigationBarTitleText":"我的订单"}},{"path":"/pages/cart/news","meta":{},"window":{"navigationBarTitleText":"订单跟踪"}},{"path":"/pages/cart/PostSale","meta":{},"window":{"navigationBarTitleText":"退款/售后"}},{"path":"/pages/cart/returnInfo","meta":{},"window":{"navigationBarTitleText":"售后信息"}},{"path":"/pages/cart/detail","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/cart/orderDetail","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/cart/Service","meta":{},"window":{"navigationBarTitleText":"退款售后"}},{"path":"/pages/cart/logistics","meta":{},"window":{"navigationBarTitleText":"填写物流"}},{"path":"/pages/cart/writeForm","meta":{},"window":{"navigationBarTitleText":"申请退款"}},{"path":"/pages/cart/writeForm2","meta":{},"window":{"navigationBarTitleText":"申请换货"}},{"path":"/pages/cart/remarks","meta":{},"window":{"navigationBarTitleText":"评价"}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":false,"enablePullDownRefresh":true}},{"path":"/pages/user/userInfo","meta":{},"window":{"navigationBarTitleText":"个人资料","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white","titleNView":{"buttons":[{"text":"完成","titleColor":"#BD9E70","float":"right","fontSize":"14","width":"50"}]}}},{"path":"/pages/user/setUp","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/user/payPas","meta":{},"window":{"navigationBarTitleText":"设置交易密码"}},{"path":"/pages/user/team","meta":{},"window":{"navigationBarTitleText":"我的团队","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/user/teamDetail","meta":{},"window":{"navigationBarTitleText":"贡献明细","navigationBarBackgroundColor":"#211817","navigationBarTextStyle":"white"}},{"path":"/pages/user/share","meta":{},"window":{"navigationBarTitleText":"应用分享"}},{"path":"/pages/user/help","meta":{},"window":{"navigationBarTitleText":"帮助中心"}},{"path":"/pages/user/about","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/user/text","meta":{},"window":{"navigationBarTitleText":"隐私政策/用户协议"}},{"path":"/pages/user/contact","meta":{},"window":{"navigationBarTitleText":"联系我们","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/share/share","meta":{},"window":{"navigationBarTitleText":"分享"}},{"path":"/pages/share/details","meta":{},"window":{"navigationBarTitleText":"分享"}},{"path":"/pages/wallet/wallet","meta":{},"window":{"navigationBarTitleText":"我的钱包","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white","titleNView":{"buttons":[{"fontSrc":"/static/iconfont.ttf","text":"","titleColor":"#FFFFFF","float":"right","fontSize":"18"}]}}},{"path":"/pages/wallet/recharge","meta":{},"window":{"navigationBarTitleText":"充值","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/wallet/withdraw","meta":{},"window":{"navigationBarTitleText":"转账","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/wallet/choiceCoin","meta":{},"window":{"navigationBarTitleText":"选择币种"}},{"path":"/pages/wallet/transfer","meta":{},"window":{"navigationBarTitleText":"互转","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/wallet/bill","meta":{},"window":{"navigationBarTitleText":"账单","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/wallet/trade","meta":{},"window":{"navigationBarTitleText":"交易"}},{"path":"/pages/wallet/otcList","meta":{},"window":{"navigationBarTitleText":"OTC","titleNView":{"buttons":[{"fontSrc":"/static/iconfont.ttf","text":"","titleColor":"#333333","float":"right","fontSize":"18"}]}}},{"path":"/pages/wallet/otcRecord","meta":{},"window":{"navigationBarTitleText":"订单记录"}},{"path":"/pages/wallet/otcDetails","meta":{},"window":{"navigationBarTitleText":"订单详情","navigationBarBackgroundColor":"#211817","navigationBarTextStyle":"white"}},{"path":"/pages/wallet/record","meta":{},"window":{"navigationBarTitleText":"订单记录"}},{"path":"/pages/wallet/recordDetail","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/wallet/integral","meta":{},"window":{"navigationBarTitleText":"兑换链++","navigationBarBackgroundColor":"#211817","navigationBarTextStyle":"white"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/login/forgetPass","meta":{},"window":{"navigationBarTitleText":"忘记登录密码"}},{"path":"/pages/login/forgetPayPass","meta":{},"window":{"navigationBarTitleText":"忘记支付密码"}},{"path":"/pages/login/modifyPass","meta":{},"window":{"navigationBarTitleText":"修改登录密码"}},{"path":"/pages/login/modifyPayPass","meta":{},"window":{"navigationBarTitleText":"修改支付密码"}},{"path":"/pages/card/card","meta":{},"window":{"navigationBarTitleText":"银行卡","navigationBarBackgroundColor":"#211817","navigationBarTextStyle":"white"}},{"path":"/pages/card/addCard","meta":{},"window":{"navigationBarTitleText":"添加银行卡"}},{"path":"/pages/chainReform/chainReform","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"链惠通","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white","enablePullDownRefresh":true,"titleNView":{"buttons":[{"fontSrc":"/static/iconfont.ttf","text":"","titleColor":"#FFFFFF","float":"right","fontSize":"18"}]}}},{"path":"/pages/chainReform/recharge","meta":{},"window":{"navigationBarTitleText":"充值","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white","bounce":"none"}},{"path":"/pages/chainReform/withdraw","meta":{},"window":{"navigationBarTitleText":"提现","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/chainReform/Notice","meta":{},"window":{"navigationBarTitleText":"链惠通须知"}},{"path":"/pages/chainReform/contract","meta":{},"window":{"navigationBarTitleText":"签署协议"}},{"path":"/pages/chainReform/applyChainReform","meta":{},"window":{"navigationBarTitleText":"申请链惠"}},{"path":"/pages/chainReform/applyChainReform1","meta":{},"window":{"navigationBarTitleText":"协议摘要"}},{"path":"/pages/chainReform/chainReformDetail","meta":{},"window":{"navigationBarTitleText":"链惠通详情","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/chainReform/chainReformBill","meta":{},"window":{"navigationBarTitleText":"链惠通账单","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/chainReform/pay","meta":{},"window":{"navigationBarTitleText":"收银台"}},{"path":"/pages/wallet/exchange","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"链付通","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white","titleNView":{"buttons":[{"fontSrc":"/static/iconfont.ttf","text":"","titleColor":"#FFFFFF","float":"right","fontSize":"18"}]}}},{"path":"/pages/wallet/duihuan1","meta":{},"window":{"navigationBarTitleText":"链兑银","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/wallet/duihuan2","meta":{},"window":{"navigationBarTitleText":"银兑链","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/wallet/duihuan3","meta":{},"window":{"navigationBarTitleText":"卖出","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/wallet/duihuanBill","meta":{},"window":{"navigationBarTitleText":"账单","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/wallet/shenqingshiwu","meta":{},"window":{"navigationBarTitleText":"申请实物","navigationBarBackgroundColor":"#1A2B5A","navigationBarTextStyle":"white"}},{"path":"/pages/user/shiming","meta":{},"window":{"navigationBarTitleText":"实名认证"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
