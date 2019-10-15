define(['jquery','jquery-cookie',"parabola"],function($){
    // 下载数据
    function download(){
        $.ajax({
            type:"get",
            url:"../data/car.json",
            success:function(data){
                // alert(data);
                var arr = data;

                for(let i = 0; i < arr.length; i++){

                    var node =$(`
                            <div class='foot'></div>
                        `).appendTo("main .banner");
                        var arr1 = arr[i].rightArr;
                        for(let j = 0; j < arr1.length;j++){
                            $(`
                            <dl id="${arr1[j].id}">
                                <dt>
                                    <img src="${arr1[j].img}" alt="">
                                </dt>
                                <dd>${arr1[j].title}</dd>
                                <dd>${arr1[j].desc}</dd>
                                <dd>￥${arr1[j].price}</dd>
                            </dl>
                        `).appendTo(node) 
                        } 
                    }                    
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }

    // 轮播
    function banner(){
        var aImgs = null;
        var timer = null;//每两秒切换一张
        var iNow = 0;//当前展示的图片的下标


        // 启动一个定时器，每隔2秒
        timer = setInterval(function(){
            iNow++;
            tab();
        },2000);

        // 添加移入移出
        $('main .banner').mouseenter(function(){
            clearInterval(timer);
        })

        $('main .banner').mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2000);
        });

        $(".left-btn,.right-btn").mouseenter(function(){
            clearInterval(timer);
        })

        function tab(){
            if(!aImgs){
                aImgs = $(".banner").find('.foot');
            }
            if(iNow == 18){
                iNow = 0;
            }
            aImgs.hide().css("opacity",0).eq(iNow).show().animate({
                opacity:1
            },0);
        }

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
            if(iNow > 17){
                iNow = 17;
            }
            tab();
        })
    }


    function sc_msg(){
        $('main .aside').empty();//清空ul所有的子节点
        $.ajax({
            type:'get',
            url:'../data/data.json',
            success:function(arr){
                // 取出cookie中的数据
                var cookieStr = $.cookie('goods');
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    // 找出加入购物车的商品数据
                    var newArr = [];
                    for(var i = 0;i < arr.length;i++){
                        for(var j = 0;j < cookieArr.length;j++){
                            if(arr[i].id == cookieArr[j].id){
                                // 增加购物车商品数量
                                arr[i].num = cookieArr[j].num;
                                newArr.push(arr[i]);
                            }
                        }
                    }

                    console.log(newArr);
                    // 每次加载数据的时候，都将上一次的数据清空
                    // $('main aside').html('');

                    for(var i = 0;i < newArr.length;i++){
                        $(` <div class="data" id="${newArr[i].id}">
                        <input type="checkbox">
                        <div class="img">
                            <img src="${newArr[i].img}" alt="">
                        </div>
                        <div class="font">
                            <i>${newArr[i].title}</i>
                        </div>
                        <div class="blank">
                        
                        </div>
                        <div class="price">
                            <i>${newArr[i].price}/i>
                        </div>
                        <div class="counts">
                            <aside>
                                 <a href="">-</a>
                                <span>${newArr[i].num}</span>
                                <a href="">+</a>
                            </aside>
                           
                        </div>
                        <div class="money">
                            <i>${newArr[i].price}*${newArr[i].num}</i>
                        </div>
                        <div class="active">
                                <a><i>删除</i>/<span>移入收藏夹</span></a>
                        </div>
                    </div>`).appendTo('main .aside');
                    }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
   /*  function add(){
        sc_num();
        sc_msg();
        // 点击按钮跳转订单页
        $('main section article').on("click",".bottom .button .btn2",function(){
            location.href="car.html"
        })
        // 点击按钮添加购物车
        $('main section article').on("click",".bottom .button .btn1",function(){
            //取出当前商品id
            var id = this.id;
            // 判断是否是第一次存储
            var first = $.cookie('goods') == null ? true : false;
            if(first){
                // 第一次存储
                var arr = [{id:id,num:1}];
                $.cookie("goods",JSON.stringify(arr),{
                    expires: 7,
                    path:'/'
                })
            }else{
                // 判断是否添加过
                var cookirStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookirStr);
                var same = false; //假设没有存储过
                for(var i = 0; i< cookieArr.length ; i++){
                    if(cookieArr[i].id == id){
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                // 判断是否添加过
                if(!same){
                    var obj = {id:id,num:1};
                    cookieArr.push(obj);
                }

                $.cookie('goods',JSON.stringify(cookirStr),{
                    expires: 7,
                    path:'/'
                })
            }
            if(cookieArr.length){
                $.cookie('goods',JSON.stringify(cookieArr),{
                    expires: 7,
                    path:'/'
                })
            }else{
               $.cookie('goods',null); 
            }
            sc_num();
            sc_msg();
            ballMove(this);
    }) */

    //加和减
 /*    $("main section article").on("click", ".bottom p #count i", function(){
        //商品id
        var id = $(this).closest(".bottom").attr("id");
        //取出对应cookie中的数据
        var cookieArr = JSON.parse($.cookie("goods"));
        for(var i = 0; i < cookieArr.length; i++){
            if(id == cookieArr[i].id){
                //要修改的数据
                var goodObj = cookieArr[i];
                break;
            }
        }
        if(this.innerHTML == "+"){
            goodObj.num++;
        }else{
            if(goodObj.num == 1){
                // alert("数量已经见到最小了！");
                $('.remove').trigger('click');
                var cookieArr = JSON.parse($.cookie("goods"));
                for(var i = 0; i < cookieArr.length; i++){
                    if(id == cookieArr[i].id){
                        cookieArr.splice(i, 1);
                        break;
                    }
                }
            }else{
                goodObj.num--;
            }
        }

        //重新显示新的数量
        $(this).prevAll("em").html(goodObj.num);

        $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
        });
        sc_num();

    })
} */
            // 统计购物车中的商品数量
            /* function sc_num(){
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var sum = 0;
                    for(var i = 0; i < cookieArr.length;i++){
                        sum += cookieArr[i].num;
                    }
                    $('.head header .p a span').html(sum);
                }else{
                    $('.head header .p a span').html(0);
                }
            } */
        
    
    /* function ballMove(oBtn){
        //小球位置显示在加入购物车按钮这个位置
        $("#ball").css({
            display: 'block',
            left: $(oBtn).offset().left,
            top: $(oBtn).offset().top
        })

        var X = $(".head header .p a span").offset().left - $(oBtn).offset().left;
        var Y = $(".head header .p a span").offset().top - $(oBtn).offset().top;

        //创建一个抛物线对象
        var bool = new Parabola({
            el: "#ball",
            offset: [X, Y],
            duration: 800,
            curvature: 0.0005,
            callback: function(){
                $("#ball").hide();
            }
        });
        //开始运动
        bool.start();
    } */
    return {
        download:download,
        banner:banner,
        sc_msg:sc_msg
    }
})