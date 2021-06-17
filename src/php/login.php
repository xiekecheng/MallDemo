<?php
// 设置响应头编码
header( 'content-type:text/html;charset=utf8' );
$username = $_POST['username'];
$password = $_POST['password'];

$con = mysqli_connect( 'localhost', 'root', 'xkc19950', 'test' );
mysqli_query( $con, 'set names utf8' );

// 验证账号密码
$sql = "select * from user where username = '$username' and password = '$password'";

$res = mysqli_query( $con, $sql );
$row = mysqli_fetch_assoc( $res );

if ( $row ) {
    $arr = [
        'meta'=>[
            'status'=>1,
            'msg'=>'登陆成功'
        ]
    ];
} else {
    $arr = [
        'meta'=>[
            'status'=>2,
            'msg'=>'用户名或密码错误'
        ]
    ];
}
echo json_encode($arr);