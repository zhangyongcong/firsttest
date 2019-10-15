define(['jquery'],function(){
    // 倒计时
    function Start(){
        var date = new Date();
        var now = date.getTime();
        var endDate = new Date('2019-11-15 00:00:00');
        var end = endDate.getTime();
        var leftTime = end - now;//时间差
        var h,m,s;
        if(leftTime >= 0){
            h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
            m = Math.floor(leftTime / 1000 / 60 % 60);
            s = Math.floor(leftTime / 1000 % 60);
            if(s < 10){
                s = '0' + s;
            }
            if(m < 10){
                m = '0' + m;
            }
            if(h < 10){
                h = '0' + h;
            } 
            
            $('#hours').html(h);
            $('#minute').html(m);
            $('#seconds').html(s);
        }else{
                console.log('已截止');

                $('#hours').html("00");
                $('#minute').html("00") ;
                $('#seconds').html("00");

            }
            setTimeout(Start,50);
    }
    return {
        Start:Start
    }
})