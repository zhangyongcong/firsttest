
define(["jquery",'jquery-cookie','parabola'],function($){
    function download(){
        var id = getUrl(`id`);
        sc_num();
        $.ajax({
            type:"get",
            url:"../data/goods.json",
            success:function(data){
                var arr = data;
                    $(`
                    <a href=""><img src="${arr[id].img}" alt=""></a>
                    <a href=""><img src="${arr[id].img1}" alt=""></a>
                    <a href=""><img src="${arr[id].img2}" alt=""></a>
                    <a href=""><img src="${arr[id].img3}" alt=""></a>
                        `).appendTo('main section aside .banner')


                    $(`<img src="${arr[id].img}">`).appendTo('main section article #big')
                    $(`
                    <h1>${arr[id].title}</h1>
                        <h5>${arr[id].desc}</h5>
                        <div class="top">
                        <p>
                        <span>商城价</span>
                        <i>￥</i>
                        <span>${arr[id].price}</span>  
                        </p>
                        <div class="active">
                            <i>
                                活动
                            </i>
                            <p>
                                <em>赢笔记本</em>
                                <a href="">◆大转盘抽奖，赢优惠券、笔记本等好礼。查看详情</a>
                            </p>
                            <p>
                                <strong>晒单有礼</strong>
                            </p>
                            <p>
                                ◆社区晒单赢延保  查看详情
                            </p>
                        </div>
                    </div>
                    <div class="bottom">
                        <p>
                            <span>分期付款</span>
                            <a class="pay"><img src="../images/hua.png"><em>花呗分期</em>
                                <select name="" id="">
                                    <option value="">选择分期</option>
                                    <option value="">3期</option>
                                    <option value="">6期</option>
                                    <option value="">12期</option>
                                </select> 
                            </a>
                            <a class="pay"><img src="../images/bank.png"><em>招商银行</em>
                                <select name="" id="">
                                    <option value="">选择分期</option>
                                    <option value="">3期</option>
                                    <option value="">6期</option>
                                    <option value="">12期</option>
                                </select>
                            </a>
                        </p>
                        <p class="count1">
                            <span>购买数量</span>
                            <a id="count">
                                <i class="remove">
                                    <strong></strong>
                                </i>
                                <em id="num1">1</em>
                                <i class="add">+</i>
                            </a>
                        </p>
                        <div class="button">
                            <button class="btn1" id='${id}'>加入购物车</button>
                            <button class="btn2">立即购买</button>
                        </div>
                    </div>

                    `).appendTo('main section article')
                $(`<ol>
                <li><img src="${arr[id].img}" alt=""></li>
               <li><img src="${arr[id].img1}" alt=""></li>
               <li><img src="${arr[id].img2}" alt=""></li>
               <li><img src="${arr[id].img3}" alt=""></li>
                </ol>`).appendTo("main section aside .ol")

                $(`<a href=""><img src="${arr[id].footImg1}"></a>
                <a href=""><img src="${arr[id].footImg2}"></a>
                <a href=""><img src="${arr[id].footImg3}"></a>
                <a href=""><img src="${arr[id].footImg4}"></a>
                <a href=""><img src="${arr[id].footImg5}"></a>
                <a href=""><img src="${arr[id].footImg6}"></a>`).appendTo('main .detial')
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }

    // 取地址栏数据
    function getUrl(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null){
            return decodeURI(r[2]);
        }
        return null;
    }

    // 图片下方滑动效果
    function slide(){
        var iNow = null;
        var aImgs = null;
        var aBtns = null;
        // 点击按钮图片切换
        $('.p1').on("click",function(){
                iNow--;
                if(iNow < 0){
                    iNow = 0;
                }
                tab();
            })
            $('.p2').on("click",function(){
                iNow++;
                if(iNow > 3){
                    iNow = 3;
                }
                tab();
            })
            // 划入图片切换
            $('main section aside .ol').on("mouseenter","ol li",function(){
                iNow = $(this).index();
                tab();
                // 划入对应图片出现边框
                $(this).css({
                    "border":"1px solid black"
                })
                return false;
            })
            // 画出边框消失
            $('main section aside .ol').on("mouseleave","ol li",function(){
                $(this).css({
                    "border":"none"
                })
                return false;
            })
        
        function tab(){
            if(!aImgs){
                aImgs = $("main section aside .banner").find('a');
            }
            if(!aBtns){
                aBtns = $('.ol').find('ol').find('li');
            }
            aImgs.hide().css("opacity",0).eq(iNow).show().animate({
                opacity:1
            },0);
    }
}

// 加载购物车
function add(){
    sc_num();
    // 点击按钮跳转订单页
    $('main section article').on("click",".bottom .button .btn2",function(){
        location.href="http://localhost:2829/html/car.html"
    })
    // 点击按钮添加购物车
    $('main section article').on("click",".bottom .button .btn1",function(){
        //取出当前商品id
        var id = this.id;
        // 判断是否是第一次存储
        var first = $.cookie('goods') == null ? true : false;
        var c = parseInt($('#num1').html());
        if(first){
            // 第一次存储
            // var c = parseInt($('#num1').html());
            var arr = [{id:id,num:c}];
            $.cookie("goods",JSON.stringify(arr),{
                expires: 7,
            })
        }else{
            // 判断是否添加过
            var cookirStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookirStr);
            var same = false; //假设没有存储过
            for(var i = 0; i< cookieArr.length ; i++){
                if(cookieArr[i].id == id){
                    cookieArr[i].num+=c;
                    same = true;
                    break;
                }
            }
            // 判断是否添加过
            if(!same){
                var obj = {id:id,num:c};
                cookieArr.push(obj);
            }

            $.cookie('goods',JSON.stringify(cookirStr),{
                expires: 7,
            })
        }
        if(cookieArr.length){
            $.cookie('goods',JSON.stringify(cookieArr),{
                expires: 7,
            })
        }else{
           $.cookie('goods',null); 
        }
        sc_num();
        // ballMove(this);
})
        //加和减
        $("main section article").on("click", ".bottom .count1 #count i", function(){
            var num =$(this).siblings('#num1').html();
            // alert($(this).siblings('#num1').html());
            if(this.innerHTML == "+"){
                $(this).siblings('#num1').html(parseInt(num)+1);
            }else{
                if(num == 1){
                    alert("数量已经最小了！");
                }else{
                    $(this).siblings('#num1').html(parseInt(num)-1);
                }
            }
            $(this).siblings("#num1").html();
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
                    $('.head header .p a span').html(sum);
                }else{
                    $('.head header .p a span').html(0);
                }
            }
    return {
        download:download,
        add:add,
        slide:slide
    }
})