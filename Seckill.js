define(['jquery'],function(){
    function download(){
        $.ajax({
            type:'get',
            url:"../data/Seckill.json",
            success:function(data){
                var arr = data;
                for(let i =0;i < arr.length;i++){
                    $(`
                    <a href="http://localhost:2829/html/goods.html?id=${arr[i].id}">
                            <dl id='${arr[i].id}'>
                                <dt>
                                    <img src="${arr[i].img}" alt="">
                                </dt>
                                <dd>
                                <h3>${arr[i].title}</h3>
                                <div>
                                    <i>￥${arr[i].price}</i>
                                    <em>￥${arr[i].delprice}</em>
                                    <button class="a">立即抢购</button>
                                </div></dd>
                            </dl>
                            </a>
                    `).appendTo('main section .right')
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    return{
        download:download
    }
})