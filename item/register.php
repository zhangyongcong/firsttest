<?php
    header("Content-type:text/html;charset=utf-8");
    // 统一返回格式
    $responseData = array("code" => 0, "message" => "");
    // 取出传过来的数据
    $phone = $_POST["phone"];
    $password = $_POST['password'];
	$addTime = $_POST["addTime"];

    // 简单的表单验证
    if(!$phone){
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }

    // 1.连接数据库
    $link = mysql_connect("localhost","root","123456");

    // 2.判断连接是否成功
    if(!$link){
        $responseData["code"] = 3;
        $responseData["message"] = "数据库连接失败";
        echo json_encode($responseData);
        exit;
    }

    // 3.设置字符集
    mysql_set_charset("utf8");

    // 4.选择数据库
    mysql_select_db("user");

    // 5.准备sql语句
    $sql1 = "select * from user where phone='{$phone}'";

    // 6.发送sql语句
    $res = mysql_query($sql1);

    // 7.取出一行数据
    $row = mysql_fetch_assoc($res);

    if($row){
        // 用户名重名
        $responseData["code"] = 4;
        $responseData["message"] = "用户名已存在";
        echo json_encode($responseData);
        exit;
    }

    // md5加密
    $str = md5(md5(md5($password)."qingdao")."beijing");

    // 准备sql将数据插入到数据库中
    $sql2 = "insert into user(phone,password,create_time) values('{$phone}','{$str}',{$addTime})";

    // 返回布尔值
    $res = mysql_query($sql2);
    if(!$res){
        $responseData["code"] = 5;
        $responseData["message"] = "注册失败";
        echo json_encode($responseData);
    }else{
        $responseData["message"] = "注册成功";
        echo json_encode($responseData);
    }

    // 8.关闭数据库
    mysql_close($link);
?>