define(['jquery'],function($){
    function index(){
        $(`<div class="head">
    <!-- 图标 -->
    <div class="head_nav">
        <img src="images/head_nav.jpg" alt="">
    </div>
    <!-- 导航 -->
    <header>
        <ul>
            <li><a href="">联想首页</a></li>
            <li><a href="">商城</a></li>
            <li><a href="">社区</a></li>
            <li><a href="">服务</a></li>
            <li><a href="">资讯</a></li>
            <li><a href="">门店</a></li>
            <li><a href="">手机版</a></li>
        </ul>
        <p>
            <a href="html/login.html">登录</a>
            <a href="html/register.html">注册</a>
            <a href=""><i class="iconfont">&#xe655;</i>购物车<span>(0)</span></a>
        </p>
    </header>
</div>`).appendTo('container')
    }
    return{
        index:index
    }
});