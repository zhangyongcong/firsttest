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

        function add(){
            sc_num();
            sc_msg();
            // 点击按钮添加购物车
            $('main').on("click",".aside .counts aside span",function(){
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
        })
    
    
        //加和减
        $("main").on("click", ".aside .counts aside i", function(){
            //商品id
            var id = $(this).closest(".data").attr("id");
            // alert(id);
            //取出对应cookie中的数据
            var cookieArr = JSON.parse($.cookie("goods"));
            // alert(JSON.stringify(cookieArr));
            for(var i = 0; i < cookieArr.length; i++){
                if(id == cookieArr[i].id){
                    //要修改的数据
                    var goodObj = cookieArr[i];
                    break;
                }
            }
            if(this.innerHTML == "+"){
                goodObj.num++;
                // console.log(goodObj.num)
            }else{
                    if(goodObj.num == 1){
                    alert("数量已经见到最小了！");
                    // goodObj.num == 1;
                }else{
                    goodObj.num--;
                }
            }
    
            //重新显示新的数量
            $(this).parent().parent().prev().children().text();
        //    alert( $(this).parent().parent().prev().children().html());
            $(this).siblings("#num1").html(goodObj.num);
            // var money = goodObj.num * ($(this).parent().parent().prev().children().text());
            // $(this).parent().parent().next().children('i').html(money);
            /* 计算总价 */
            $(this).parent().parent().next().children('i').html(goodObj.num * ($(this).parent().parent().prev().children().text()));

            // alert($(this).parent().parent().next().children('i').html());
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7,
                path:'/'
            });
            sc_num();
    
        })
    }
    
                // 统计购物车中的商品数量
                function sc_num(){
                    var cookieStr = $.cookie("goods");
                    if(cookieStr){
                        var cookieArr = JSON.parse(cookieStr);
                        var sum = 0;
                        for(var i = 0; i < cookieArr.length;i++){
                            sum += cookieArr[i].num;
                        }
                        $('main .aside .count aside span').html(sum);
                    }else{
                        $('main .aside .count aside span').html(0);
                    }
                }
                function sc_msg(){
                    // $('main .aside').empty();//清空所有的子节点
                    $.ajax({
                        type:'get',
                        url:'../data/goods.json',
                        success:function(arr){
                            // 取出cookie中的数据
                            var cookieStr = $.cookie('goods');
                            // alert(cookieStr)
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
                                        <i>${newArr[i].price}</i>
                                    </div>
                                    <div class="counts">
                                        <aside>
                                             <i class="remove">-</i>
                                            <span id="num1">${newArr[i].num}</span>
                                            <i class="add">+</i>
                                        </aside>
                                    </div>
                                    <div class="money">
                                        <i>${newArr[i].price*newArr[i].num}</i>
                                    </div>
                                    <div class="active">
                                            <a><i>删除</i>/<span>移入收藏夹</span></a>
                                    </div>
                                </div>`).appendTo('main .aside');
                                }
                                $(`<div class="left">
                                <input type="checkbox">
                                <span>全选</span>
                                <a href="">删除选中商品</a>
                            </div>
                            <div class="right">
                                <p>商品总价：<i>7890.00</i></p>
                                <p>优惠节省：<i>0.00</i></p>
                                <p>合计：<i>7890.00</i></p>
                            </div>
                        </div>`).appendTo('main .bottom')
                            }
                        },
                        error:function(msg){
                            console.log(msg);
                        }
                    })
    }
    return {
        download:download,
        banner:banner,
        add:add
    }
})