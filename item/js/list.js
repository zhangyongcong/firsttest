require.config({
    paths:{
        "jquery":"jquery-1.10.1.min",
        "jquery-cookie":"jquery.cookie",
        "list_data":"list_data",
        "right_block":"right_block"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"]
    }
})

require(['list_data'],function(list_data){
    list_data.download();
    list_data.add();
    // list_data.ballMove();
})

require(['right_block'],function(right_block){
    right_block.download();
    right_block.scroll();
})

require(['index'],function(index){
    index.index();
    index.silde();
})