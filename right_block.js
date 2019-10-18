define(['jquery'],function($){
    function download(){
        // 右侧导航栏
        $.ajax({
            type:"get",
            url:"../data/right_block.json",
            success:function(data){
                var arr = data;
                for(var i = 0; i < arr.length; i++){
                    $(`
                    <dl>
                        <dt><i class="iconfont">${arr[i].css}</i></dt>
                        <dd>${arr[i].name}</dd>
                    </dl>
                        `).appendTo('.container .right_lan')
                }
            },
            error:function(msg){
                console.log(msg);
            }  
        })

    }
    function scroll(){
        $(window).on("scroll",function(){
            if($(window).scrollTop() >= 300){
                $(".right_lan").css({
                    "display":"block"
                })
            }else{
                $(".right_lan").css({
                    "display":"none"
                }) 
            }
        })
        $(".right_lan").click(function(){
            $(window).scrollTop(0);
        })
    }
    return {
        download:download,
        scroll:scroll
    }
})