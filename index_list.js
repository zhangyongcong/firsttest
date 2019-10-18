define(['jquery'],function($){
    // 下方列表数据
    function download(){
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
                <li><a href="http://localhost:2829/html/list.html">${arr[i].list5}<i class="iconfont">&#xe84f;</i></a></li>
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
                            <a href="http://localhost:2829/html/goods.html?id=${arr1[j].id}">
                            <dl id='${arr1[j].id}'>
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
    return {
        download:download
    }
});