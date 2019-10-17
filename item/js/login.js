 /* PC1点击切换二维码登录 */
   $(function(){
       $('#e_icon').click(function(){
           $('#phone_login').css({
               'display':"block"
           });
           $('#pc_login').css({
               'display':'none'
           });
       });


   /* 二维码1点击切换账号密码登录 */

       $('#co_icon').click(function(){
           $('#pc_login').css({
               'display':'block'
           });
           $('#phone_login').css({
               'display':'none'
           });
       });

  
   /* PC1切换短信快捷登录 */
   $('#news').click(function(){
       $('#pc_login').css({
           'display':'none'
       });
       $('#news_login').css({
           'display':'block'
       });
   });

   /* 短信页切换二维码登录 */
   $('#e_icon1').click(function(){
       $('#phone_login1').css({
            'display':"block"
       });
       $('#news_login').css({
           'display':"none"
       });
   });

    /*二维码2点击短信登录 */
    $('#co_icon1').click(function(){
       $('#news_login').css({
           'display':'block'
       });
       $('#phone_login1').css({
           'display':'none'
       });
   });

   /* 短信页切换用户名登录 */
   $('#user').click(function(){
       $('#news_login').css({
           'display' :'none'
       });
       $('#pc_login').css({
           'display':'block'
       });
   });

   /* PC登录按钮，登录成功跳转主页 */
   $('#submit').click(function(){
       $.ajax({
           type:"post",
           url:"../login.php",
           data:{
               phone:$('#input1').val(),
               password:$('#input2').val()
           },
           success:function(result){
               var obj = JSON.parse(result);
               if(obj.code){
                   $('.alert').css({
                       'display':'block',
                       'color':'red'
                   });
                   $('.alert').html(obj.message);
               }else{
                   location.href = "http://localhost:8888";
                   setCookie();
                   
               }
                $('.alert').css({
                    'display':'block'
                });       
           },
           error:function(msg){
               alert(msg);
           }
       });
       
   });
   
   /* 验证码 */
   $('#input5').click(function(){
        $('#input4').val(testCodeNum(6));
    });

   /* 短信页登录按钮 */
   $('#submit1').click(function(){
        $.ajax({
            type:"post",
            url:"../login.php",
            data:{
                phone:$('#input3').val()
            },
            success:function(result){
                var obj = JSON.parse(result);
                if(obj.code){
                    $('.alert').css({
                        'display':'block',
                        'color':'red'
                    });
                    $('.alert').html(obj.message);
                }else{
                    location.href = "http://localhost:8888";
                    setCookie()
                }
                $('.alert').css({
                    'display':'block'
                });       
            },
            error:function(msg){
                alert(msg);
            }
        }); 
    });

    function setCookie(){
        var username = $('#input1').val();
           $.cookie("name",username,{
                path:'/'
            })
        }
});