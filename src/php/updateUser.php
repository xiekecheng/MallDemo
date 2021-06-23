<?php
// 设置响应头编码
header( 'content-type:text/html;charset=utf8' );
// $username = $_GET['username'];
// $username = 'xkccoding3';
// $password = $_POST['password'];
$usr = $_POST['form-usr'];
$pwd = $_POST['form-pwd'];
$tel = $_POST['form-tel'];
$email = $_POST['form-email'];


echo $username;
$con = mysqli_connect( 'localhost', 'root', 'xkc19950', 'test' );
mysqli_query( $con, 'set names utf8' );

// 验证账号密码
$sql = "UPDATE user set password = '$pwd',email = '$email',tel= '$tel' where username = '$usr'";

$res = mysqli_query( $con, $sql );

// $row = mysqli_fetch_assoc($res);
if($res){
    echo json_encode([
        'meta'=>[
            'status'=>1,
            'msg'=>'修改账户成功'
        ]
    ]);
}else{
    echo json_encode([
        'meta'=>[
            'status'=>2,
            'msg'=>'修改账户失败'
        ]
    ]);
}
