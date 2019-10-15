
$(function(){
    /* 个人注册页点击登录按钮 */
    $(".get").click(function(){
        location.href = 'login.html';
    });
    /* 个人注册页面验证码 */
    $('.code').click(function(){
        $('.input1').val(testCodeNum(6));
    });

    /* 个人企业用户切换 */
    $("#h3_2").click(function(){
        $("section").css({
            "display":"block"
        });
        $("aside").css({
            "display":"none"
        });
        $("input").val("");
    })

    $("#h3_1").click(function(){
        $("aside").css({
            "display":"block",
        });
        $("section").css({
            "display":"none"
        })
    })

    /* 密码简单的表单验证 */
    $('.password').blur(function(){
       if($(".password").val().length > 8 && $(".password").val().length < 20){       
            $('.alert').html('密码长度符合要求');
            $('.alert').css({
                "display":"block",
                "color":"green"
            });
       }else{
         $('.alert').html('密码长度少于8位或者大于20位');
            $('.alert').css({
                "display":"block",
                "color":"red"
            });
       }
    });

    $('.repassword').blur(function(){
         if($('.password').val() === $('.repassword').val() && $(".repassword").val() != ''  ){
            $('.alert').html('密码正确');
            $('.alert').css({
                "display":"block",
                "color":"green"
            });
        }else{
            $('.alert').html('密码输入不正确');
            $('.alert').css({
                "display":"block",
                "color":"red"
            });
        }
    });

    /* 手机号验证 */

    $('.phone').blur(function(){
        if($(".phone").val().length == 0){
           $(".alert").html('不能为空');
           $(".alert").css({
            "display":"block",
            "color":"red"
            });
        }else if(!/^[1][3,5,7,8][0-9]{9}$/.test($(".phone").val())){
            $(".alert").html('请输入正确的手机号码');
           $(".alert").css({
            "display":"block",
            "color":"red"
            });
        }else if($(".phone").val().length == 11){
            $(".alert").css({
                "display":"block",
                "color":"green"
            });
            $(".alert").html('手机号码符合要求');
        }else{
                $(".alert").html('手机号码必须由11位组成');
                $(".alert").css({
                    "display":"block",
                    "color":"red"
                });
            }
    });

    /* 注册按钮 */
    $("#submit").click(function(){
        $.ajax({
            type:"post",
            url:"../register.php",
            data:{
                phone:$(".phone").val(),
                password:$(".password").val(),
                addTime:new Date().getTime()
            },
            success:function(result){
                var obj = JSON.parse(result);
                if(obj.code){
                    $('.alert').html(obj.message);
                    $('.alert').css({
                        "display":"block",
                        "color":"red"
                    });
                }else{
                   location.href="login.html";
                }                       
            },
            error:function(msg){
                alert(msg);
            }
        })
    })

    /* 企业页 */
    $('.code1').click(function(){
        $('.input2').val(testCodeNum(6));
    });

    $(".get1").click(function(){
        location.href = 'login.html';
    });
    /* 密码 */
    $('.password1').blur(function(){
        if($(".password1").val().length > 8 && $(".password1").val().length < 20){       
            $('.alert1').html('密码长度符合要求');
            $('.alert1').css({
                "display":"block", 
                "color":"green"
            });
       }else{
         $('.alert1').html('密码长度少于8位或者大于20位');
            $('.alert1').css({
                "display":"block",
                "color":"red"
            });
       }
   });
   /* 验证密码 */
   $('.repassword1').blur(function(){
    if($('.password1').val() === $('.repassword1').val() && $(".repassword1").val().length != 0){
       $('.alert1').html('密码正确');
       $('.alert1').css({
           "display":"block",
           "color":"green"
       });
    }else{
        $('.alert1').html('密码输入不正确');
        $('.alert1').css({
            "display":"block",
            "color":"red"
        });
        }
    });

    /* 手机号 */
    $('.phone1').blur(function(){
        if($(".phone1").val().length == 0){
           $(".alert1").html('不能为空');
           $(".alert1").css({
            "display":"block",
            "color":"red"
            });
        }else if(!/^[1][3,5,7,8][0-9]{9}$/.test($(".phone1").val())){
            $(".alert1").html('请输入正确的手机号码');
           $(".alert1").css({
            "display":"block",
            "color":"red"
            });
        }else if($(".phone1").val().length == 11){
            $(".alert1").css({
                "display":"block",
                "color":"green"
            });
            $(".alert1").html('手机号码符合要求');
        }else{
                $(".alert1").html('手机号码必须由11位组成');
                $(".alert1").css({
                    "display":"block",
                    "color":"red"
                });
            }
    });
    /* 公司名验证 */
    $("#comName").blur(function(){
        if($("#comName").val() == ''){
            $('.alert1').html('不能为空');
            $('.alert1').css({
                "display":"block",
                "color":"red"
            });
        }else{
            $('.alert1').html('输入成功');
            $('.alert1').css({
                "display":"block",
                "color":"green"
            });
        }
    });

    /* 税号 */
    $("#comTax").blur(function(){
        if($("#comTax").val() == ''){
            $('.alert1').html('不能为空');
            $('.alert1').css({
                "display":"block",
                "color":"red"
            });
        }else if($("#comTax").val().length == 18){
            $('.alert1').html('输入成功');
            $('.alert1').css({
                "display":"block",
                "color":"green"
            });
        }else{
            $('.alert1').html('输入错误');
            $('.alert1').css({
                "display":"block",
                "color":"red"
            });
        }
    })

    /* 验证邮箱 */
    $("#comEmail").blur(function(){
        if($("#comEmail").val() == ''){
            $('.alert1').html('不能为空');
            $('.alert1').css({
                "display":"block",
                "color":"red"
            });
        }else if(/^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-]+)\.([a-zA-Z]{2,4})$/.test($("#comEmail").val())){
            $('.alert1').html('邮箱输入正确');
            $('.alert1').css({
                "display":"block",
                "color":"green"
            });
        }else if($("#comEmail").val().length > 18 || $("#comEmail").val().length < 6){
            $('.alert1').html('长度是6-18位');
            $('.alert1').css({
                "display":"block",
                "color":"red"
            });
        }else{
            $('.alert1').html('邮箱必须包含数字、字母、下划线、@组成');
            $('.alert1').css({
                "display":"block",
                "color":"red"
            });
        }
    })


    /* 注册按钮 */
    $("#submit1").click(function(){
        $.ajax({
            type:"post",
            url:"../register.php",
            data:{
                phone:$(".phone1").val(),
                password:$(".password1").val(),
                addTime:new Date().getTime()
            },
            success:function(result){
                var obj = JSON.parse(result);
                if(obj.code){
                    $('.alert1').html(obj.message);
                    $('.alert1').css({
                        "display":"block",
                        "color":"red"
                    });
                }else{
                   location.href="login.html";
                }                       
            },
            error:function(msg){
                alert(msg);
            }
        })
    })
})