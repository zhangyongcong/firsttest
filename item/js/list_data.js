define(['jquery','jquery-cookie','parabola'],function($){
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
                        <dl>
                            <dt>
                                <img src="${arr1[j].img}" alt="">
                            </dt>
                            <dd>${arr1[j].title}</dd>
                            <dd>￥${arr1[j].price}</dd>
                            <button id="${arr1[j].id}">加入购物车</button>
                    </dl>
                    `).appendTo(node.find('.right'))
                    // console.log(arr1[j].id)
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
    // 点击按钮添加购物车
    $('main').on("click","article .right dl button",function(){
        //取出当前商品id
        var id = this.id;
        // console.log(id);
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
            // console.log(cookirStr)
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
            if(cookieArr.length){
                $.cookie('goods',JSON.stringify(cookieArr),{
                    expires: 7,
                    path:'/'
                })
            }else{
               $.cookie('goods',null); 
            }
        }
        sc_num();
        ballMove(this);
        // return false;
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

        var X = $(".head header .p .car").offset().left - $(oBtn).offset().left;
        var Y = $(".head header .p .car").offset().top - $(oBtn).offset().top;

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
        add:add,
        // ballMove:ballMove
    }
})