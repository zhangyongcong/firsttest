console.log("加载成功");
require.config({
    paths:{
        "jquery":"jquery-1.10.1.min",
        "jquery-cookie":"jquery.cookie",
        "car_banner":"car_banner"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"]
    }
})

/* 遵从AMD规范 */
require(['car_banner'],function(car_banner){
    car_banner.download();
    car_banner.banner();
    // car_banner.sc_msg();
    // car_banner.add();
    car_banner.add();
})
