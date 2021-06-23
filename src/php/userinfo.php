<?php
// 设置响应头编码
header( 'content-type:text/html;charset=utf8' );
$username = $_GET['username'];
// $username = 'xkccoding3';
// $password = $_POST['password'];

$con = mysqli_connect( 'localhost', 'root', 'xkc19950', 'test' );
mysqli_query( $con, 'set names utf8' );

// 验证账号密码
$sql = "select * from user where username = '$username'";

$res = mysqli_query( $con, $sql );

// while($row = mysqli_fetch_assoc( $res )){
//     $arr[]  = $row;
// }
$row = mysqli_fetch_assoc($res);
echo json_encode([
    'meta'=>[
        'status'=>1,
        'msg'=>'数据获取成功'
    ],
    'data'=>$row
]);