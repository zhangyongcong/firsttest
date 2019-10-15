define(['jquery'], function($){
    function download(){
        $.ajax({
            type:"get",
            url:"../data/nav.json",
            success:function(data){
                // alert(data);
                 
                // var arr2 = data[0].right_block[0].right; 
                // alert(arr1.length);
                var arr = data;
               
                for(var i = 0; i < arr.length; i++){
                    var node = $(`
                            <li><a href="">${arr[i].list}<i class="iconfont">&#xe634;</i></a>                           
                            <div class="right_block">
                            <section>
                                
                            </section>
                            <aside></aside>
                            </div>
                            </li>
                        `).appendTo('.banner_l .banner_left ul')
                        var arr1 = arr[i].right_block;
                        // alert(i)
                        for(var j = 0 ;j < arr1.length;j++){
                        var node1 =$(`<ol><li><a href="${arr1[j].url}">${arr1[j].title}<i class="iconfont">&#xe634;</i></a></li></ol>`).appendTo(node.find('.right_block').find('section'))
                        var arr2 = arr1[j].right;
                        for(var k = 0 ;k < arr2.length;k++){
                        $(`<a href="${arr2[k].url}">${arr2[k].name}</a>`).appendTo(node1.find('li'))
                        }
                }
                }  
                

            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    function nav(){
        $(".banner_l .banner_left ul").on("mouseenter","li",function(){
            this.style.backgroundColor = "#fff";
            $(".right_block").eq($(this).index()).show();
        })
        $(".banner_l .banner_left ul").on("mouseleave","li",function(){
            $(this).css({
                "background":"rgba(245,245,245,0.6)"
            })
            $(".right_block").eq($(this).index()).hide();
        })
    }
    return{
        download:download,
        nav:nav
    }
})