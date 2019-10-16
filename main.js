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
        "setTimeout":"setTimeout"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"]
    }
})

/* 遵从AMD规范 */
require(['banner'],function(banner){
    banner.download();
    banner.banner();
})

require(['nav'],function(nav){
    nav.download();
    nav.nav();
})

require(['index_list'],function(index_list){
    index_list.download();
    // index_list.add();
})

require(['index'],function(index){
    index.index();
})

require(['right_block'],function(right_block){
    right_block.download();
    right_block.scroll();
})

require(['setTimeout'],function(setTimeout){
    setTimeout.Start();
})