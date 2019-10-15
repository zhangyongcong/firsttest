/* 
    遵从AMD规范编写代码
*/

define(["jquery"],function($){
    function download(){
        $.ajax({
            type:"get",
            url:"../data/banner.json",
            success:function(data){
                // alert(data);
                var arr = data;
                for(var i = 0; i < arr.length; i++){
                    $(`
                            <a href="${arr[i].url}"><img src="${arr[i].img}" alt=""></a>
                        `).appendTo('.banner section')
                   /*  $(`
                        <li></li>
                    `).appendTo('.banner ol') */
                    if(i == 0){
                        $(`
                        <li class = "active"></li>
                    `).appendTo('.banner ol')
                    }else{
                        $(`
                        <li></li>
                    `).appendTo('.banner ol')
                    }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    function banner(){
        var aImgs = null;
        var aBtns = null;
        var timer = null;//每两秒切换一张
        var iNow = 0;//当前展示的图片的下标


        // 启动一个定时器，每隔2秒，切换一张图片
        timer = setInterval(function(){
            iNow++;
            tab();
        },2000);

        // 给整个banner图添加移入移出
        $('.banner').mouseenter(function(){
            clearInterval(timer);
            $(".left-btn,.right-btn").css({
                "display":"block"
            })
        })

        $('.banner').mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2000);
            $(".left-btn,.right-btn").css({
                "display":"none"
            })
        });

        $(".left-btn,.right-btn").mouseenter(function(){
            clearInterval(timer);
            $(".left-btn,.right-btn").css({
                "display":"block"
            })
        })

        function tab(){
            if(!aImgs){
                aImgs = $(".banner").find('section').find("a");
            }
            if(!aBtns){
                aBtns = $('.banner').find('ol').find('li');
            }
            if(iNow == 6){
                iNow = 0;
            }
            aImgs.hide().css("opacity",0).eq(iNow).show().animate({
                opacity:1
            },0);

            /* aImgs.animate({
                top: -406 *iNow
            },500,function(){
                if(iNow == aBtns.size()){
                    
                    tab();iNow=0;
                }
            }) */
            aBtns.removeClass('active').eq(iNow).addClass('active');
        }

        /* 给每个圆点添加点击事件，事件委托 */
        $('.banner').on("click",'li',function(){
            iNow = $(this).index();
            tab();
            return false;
        })

        /* 左右按钮添加点击 */
        $('.left-btn').click(function(){
            iNow--;
            
            if(iNow < 0){
                iNow = 0;
            }
            tab();
        })

        $('.right-btn').click(function(){
            iNow++;
            if(iNow > 5){
                iNow = 5;
            }
            tab();
        })
    }
    return {
        download:download,
        banner:banner,
    }
})