console.log('111');
require.config({
    paths:{
        "jquery":"jquery-1.10.1.min",
        "jquery-cookie":"jquery.cookie",
        "goods_banner":"goods_banner",
        "drag":"drag"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"]
    }
})

/* 遵从AMD规范 */
require(['goods_banner'],function(goods_banner){
    goods_banner.download();
    goods_banner.add();
    goods_banner.slide();
})
require(['right_block'],function(right_block){
    right_block.download();
    right_block.scroll();
})

require(['drag'],function(drag){
    drag.drag();
})