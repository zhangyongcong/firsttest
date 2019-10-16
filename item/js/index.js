define(['jquery'],function($){
    function index(){
        $(`
        <ol>
        <li>新品发布会</li>
        <li>私人订制</li>
        <li>合伙人</li>
        <li>以旧换新</li>
        <li>租赁</li>
        <li>0元试用</li>
        <li>积分商城</li>
        <li>企业采购</li>
    </ol>`).appendTo('.container .nav')
    }

    function silde(){
        var aLis = $('.container .nav').find('ol').find('li');
        // alert(aLis[0].innerHTML);   
        for(let i = 0; i < aLis.length; i++){
             $('.container .nav').on("mouseenter","ol li",function(){
                // alert(1)
                $(this).css({
                    "color":"orange"
                })
                $('.center').css({
                    'display':"block"
                })
            }) 
            $('.container .nav').on("mouseleave","ol li",function(){
                // alert(1)
                $(this).css({
                    "color":"black"
                })
                $('.center').css({
                    'display':"none"
                })
            })  
        }   
                
    }
    return{
        index:index,
        silde:silde
    }
});