<?php
// 设置响应头编码
header( 'content-type:text/html;charset=utf8' );
// $username = $_POST['username'];
// $password = $_POST['password'];
$ids = $_GET['ids'];
// $ids = '3,4';


$con = mysqli_connect( 'localhost', 'root', 'xkc19950', 'test' );
mysqli_query( $con, 'set names utf8' );

// 获取id对应数据
$sql = "select * from goods where id in ($ids)";

// 请求\数据
$res = mysqli_query( $con, $sql );
$arr = [];
// 提取数据
while($row = mysqli_fetch_assoc( $res )){
    $arr[] = $row;
}
echo json_encode( [
    'meta'=>[
        'status'=>1,
        'msg'=>'获取数据成功'
    ],
    'data'=>$arr
] );