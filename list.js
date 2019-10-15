define(['jquery','jquery-cookie','parabola'],function($){
    function download(){
        // sc_num();
        $.ajax({
            type:"get",
            url:"../data/data.json",
            success:function(data){
                var arr = data;

                for(let i = 0; i < arr.length; i++){
                    var node =$(`
                    <article>
                    <div class="top">
                        <h2>${arr[i].name}</h2>
                        <ul>
                <li><a href="">${arr[i].list5}<i class="iconfont">&#xe84f;</i></a></li>
                            <li><a href="">${arr[i].list4}</a></li>
                            <li><a href="">${arr[i].list3}</a></li>
                            <li><a href="">${arr[i].list2}</a></li>
                            <li><a href="">${arr[i].list1}</a></li>
                        </ul>
                    </div>
                            <div class="left">
                                <img src="${arr[i].leftImg}" alt="">
                            </div>
                            <div class="right">
                            </div>
                    </article>
                        `).appendTo("main");
                        var arr1 = arr[i].rightArr;
                        for(let j = 0; j < arr1.length;j++){
                            $(`
                            <a href="html/goods.html?id=${arr1[j].id}">
                            <dl id=${arr1[j].id}>
                                <dt>
                                    <img src="${arr1[j].img}" alt="">
                                </dt>
                                <dd>${arr1[j].title}</dd>
                                <dd>${arr1[j].desc}</dd>
                                <dd>￥${arr1[j].price}</dd>
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


    // 添加数据到购物车
    function add(){
        sc_num();
        $('main').on("click",".right a",function(){
            //取出当前商品id
            var id = this.id;
            // 判断是否是第一次存储
            var first = $.cookie('goods') == null ? true : false;
            if(first){
                // 第一次存储
                var arr = [{id:id,num:1}];
                $.cookie("goods",JSON.stringify(arr),{
                    expires: 7
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
                    expires: 7
                })
            }
            if(cookieArr.length){
                $.cookie('goods',JSON.stringify(cookieArr),{
                    expires: 7
                })
            }else{
               $.cookie('goods',null); 
            }
            sc_num();
            ballMove(this);
    })
    // alert($.cookie('goods'))
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
                $('header .p a span').html(sum);
            }else{
                $('header .p a span').html(0);
            }
        }
        
    
    function ballMove(oBtn){
        //小球位置显示在加入购物车按钮这个位置
        $("#ball").css({
            display: 'block',
            left: $(oBtn).offset().left,
            top: $(oBtn).offset().top
        })

        var X = $("header .p a span").offset().left - $(oBtn).offset().left;
        var Y = $("header .p a span").offset().top - $(oBtn).offset().top;

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
    return {
        download:download,
        // add:add
    }
});