define(['jquery'],function(){
    function drag(){
        $('main section aside .banner').mouseenter(function(){
            $('#mark,#big').show();
        })
        .mouseleave(function(){
            $('#mark,#big').hide();
        }).mousemove(function(ev){
            var l = ev.pageX - $(this).offset().left - 75;
            var t = ev.pageY - $(this).offset().top - 75;
            if(l <= 0){
                l = 0;
            }
            if(l >= 370){
                l = 370;
            }

            if(t <= 0){
                t = 0;
            }
            if(t >= 370){
                t = 370;
            }
             //改变遮罩层的位置
             $("#mark").css({
                left: l,
                top: t
            })


            //同时放大图片的位置，四倍于遮罩层的位置，注意反方向的。
            $("#big img").css({
                left: -2 * l, 
                top: -2 * t
            })
        })
    }
    return{
        drag:drag
    }
})