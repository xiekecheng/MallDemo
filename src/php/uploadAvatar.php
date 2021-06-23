<?php
// 设置响应头编码
header( 'content-type:text/html;charset=utf8' );
$username = $_POST['username'];
// print_r($_FILES);


// echo '$_SERVER["DOCUMENT_ROOT"]:  ========>  '.$_SERVER['DOCUMENT_ROOT'];



$path = '../uploads/'.$_FILES['file']['name'];
// move_uploaded_file($_FILES['file']['tmp_name'],'../uploads/'.$_FILES['file']['name']);
move_uploaded_file($_FILES['file']['tmp_name'],$path);
// echo '/src/uploads/'.$_FILES['file']['name'];

$sqlPath = '/src/uploads/'.$_FILES['file']['name'];
// print_r($path);
// print_r($sqlPath);
$con = mysqli_connect( 'localhost', 'root', 'xkc19950', 'test' );
mysqli_query( $con, 'set names utf8' );

// // // 验证账号密码
$sql = "update user set avatar = '$sqlPath' where username = '$username'";

$res = mysqli_query( $con, $sql );

if($res){
    echo json_encode([
        'meta'=>[
            'status'=>1,
            'msg'=>'上传头像成功',
        ],
        'path'=>$sqlPath
    ]);
}else{
    echo json_encode([
        'meta'=>[
            'status'=>2,
            'msg'=>'上传头像失败'
        ]
    ]);
}
