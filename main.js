console.log("加载成功");

/* 配置所有引入的.js文件的路径 */

require.config({
    paths:{
        "jquery":"jquery-1.10.1.min",
        "jquery-cookie":"jquery.cookie",
        "banner":"banner",
        "nav":"nav",
        "index_list":"index_list",
        "index":"index",
        "right_block":"right_block",
        "parabola":"parabola",
        "setTimeout":"setTimeout",
        "Seckill":"Seckill"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"]
    }
})

// banner图
require(['banner'],function(banner){
    banner.download();
    banner.banner();
    banner.sc_num();
    banner.login();
})
// 左侧导航
require(['nav'],function(nav){
    nav.download();
    nav.nav();
})
// 下方数据
require(['index_list'],function(index_list){
    index_list.download();
})
// 顶部导航
require(['index'],function(index){
    index.index();
    index.silde();
})
// 右侧边栏
require(['right_block'],function(right_block){
    right_block.download();
    right_block.scroll();
})
// 倒计时
require(['setTimeout'],function(setTimeout){
    setTimeout.Start();
})
// 秒杀右侧数据
require(['Seckill'],function(Seckill){
    Seckill.download();
})