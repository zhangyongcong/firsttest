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
// 右侧边栏
require(['right_block'],function(right_block){
    right_block.download();
    right_block.scroll();
})
// 拖拽
require(['drag'],function(drag){
    drag.drag();
})

// 导航
require(['index'],function(index){
    index.index();
    index.silde();
})