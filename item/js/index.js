define(['jquery'],function($){
    function index(){
        $.ajax({
            type:"get",
            url:'../data/index.json',
            success:function(data){
                var arr = data;
                for(let i = 0;i < arr.length;i++){
                    var node = $(`
                        <li><a href="">${arr[i].title}</a>
                            <div class='menu'>
                            <div class = "center">
                            </div>
                            </div>
                        </li>`
                        ).appendTo('.container .nav ol') 
                    var arr1 = arr[i].rightArr;
                    for(let j = 0;j< arr1.length;j++){
                        $(`<a href="http://localhost:2829/html/goods.html?id=${arr1[j].id}">
                        <dl>
                            <dt>
                                <img src="${arr1[j].img}" alt="">
                            </dt>
                            <dd>${arr1[j].title}</dd>
                            <dd>${arr1[j].desc}</dd>
                            <dd>￥${arr1[j].price}</dd>
                        </dl>
                    </a>`).appendTo(node.find('.menu').find('.center'))
                    } 
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }

    function silde(){
             $('.container .nav ol').on("mouseenter","li",function(){
                //  alert(this.innerHTML);
                $(this).children().css({
                    "color":"orange"
                })
                $(".center").eq($(this).index()).show();
                return false;
            }) 
            $('.container .nav ol').on("mouseleave","li",function(){
                // alert(1)
                $(this).children().css({
                    "color":"black"
                })
                $(".center").eq($(this).index()).hide();
                return false;
            })    
                
    }
    return{
        index:index,
        silde:silde
    }
});