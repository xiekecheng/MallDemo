<?php
header( 'content-type:text/html;charset=utf8' );
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$tel = $_POST['tel'];

// 数据库连接信息
$con = mysqli_connect( 'localhost', 'root', 'xkc19950', 'test' );
mysqli_query( $con, 'set names utf8' );
$res = mysqli_query( $con, "select * from user where username = '$username'" );
$row = mysqli_fetch_assoc( $res );

if ( $row ) {
    $arr = [
        'meta'=>[
            'status'=>0,
            'msg'=>'用户名被占用'
        ]
    ];
} else {
    $res = mysqli_query( $con, "insert into user(username,password,email,tel) values('$username','$password','$email','$tel')" );
    if ( $res ) {
        $arr = [
            'meta'=>[
                'status'=>1,
                'msg'=>'注册成功'
            ]
        ];
    } else {
        $arr = [
            'meta'=>[
                'status'=>2,
                'msg'=>'注册失败'
            ]
        ];
    }
}
echo json_encode( $arr );