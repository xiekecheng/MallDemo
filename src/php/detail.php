<?php
// 设置响应头编码
header( 'content-type:text/html;charset=utf8' );
// $username = $_POST['username'];
// $password = $_POST['password'];
$id = $_GET['id'];
// $id = 151;

$con = mysqli_connect( 'localhost', 'root', 'xkc19950', 'test' );
mysqli_query( $con, 'set names utf8' );

// 验证账号密码
$sql = "select * from goods where id = $id";

// 请求\数据
$res = mysqli_query( $con, $sql );
// 提取数据
$row = mysqli_fetch_assoc( $res );
echo json_encode( [
    'meta'=>[
        'status'=>1,
        'msg'=>'获取数据成功'
    ],
    'data'=>$row
] );