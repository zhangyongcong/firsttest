define(['jquery','jquery-cookie'],function($){
    function download(){
        $.ajax({
            type:"get",
            url:"../data/data.json",
            success:function(data){
                var arr = data;
                for(var i = 0; i < arr.length; i++){
                    var node = $(`
                    <article>
                    <div class="top">
                        <h2>${arr[i].name}</h2>
                    </div>
                    <div class="right">
                        
                    </div>
                     </article>
                        `).appendTo('main')

                        var arr1 = arr[i].rightArr;
                        for(var j = 0 ;j < arr1.length;j++){
                        $(`
                        <a href="">
                        <dl>
                            <dt>
                                <img src="${arr1[j].img}" alt="">
                            </dt>
                            <dd>${arr1[j].title}</dd>
                            <dd>￥${arr1[j].price}</dd>
                            <button>加入购物车</button>
                    </dl></a>
                        `).appendTo(node.find('.right'))
                }
                }  
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    
// 加载购物车
function add(){
    sc_num();
    // 点击按钮跳转订单页
    $('main').on("click","article .right a dl button",function(){
        location.href="car.html"
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
                path:'/'
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
        ballMove(this);
        return false;
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
        // 抛物线
    function ballMove(oBtn){
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
    }
    return{
        download:download,
        add:add
    }
})