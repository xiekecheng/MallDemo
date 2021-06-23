$(function () {
// start common.js
// 获取cookie 判断是否登录
var username = getCookie('username')
//  console.log(username);
if (username) {
    console.log('已登录');
    // var str = `
    //     <li>
    //     欢迎<span style="color:red; font-size:20px; margin:0 5px"><a href="user.html">${username}</a></span>来到京东商城
        
    //     </li>
    //     <li>
    //         <a href="javascript:;" class="logout">退出</a>
    //     </li>
        
    //     `
    // $('.customNav').html(str)


    // start登陆修改
    var str = `
        <li>
        <li><a href="user.html">${username}</a><i></i></li>
        <li class="space"></li>
        <li><a href="javascript:;" class="logout">退出登录</a></li>
        <li class="space"></li>
        
        `
    $('.loginWrap').html(str)
    $('.username').html(`<a href="">${username}</a>`)
    
    // end 登陆修改登陆修改

}
// else{
//     var str = `
//     <li><a href="login1.html">登录</a><i></i></li>
//     <li class="space"></li>
//     <li><a href="register1.html">注册</a></li>
//     <li class="space"></li>
//     `
//     $('.fr').prepend(str)
// }


$('.logout').on('click', function () {
    removeCookie('username')
    // var str = `
    //     <li>
    //     <a href="login1.html">登录</a>
    //   </li>
    //   <li>
    //     <a href="register1.html">注册</a>
    //   </li>
    //     `
    // $('.customNav').html(str)

    // start 登陆修改

    $('.fr:nth-child(1)').remove();

    var str = `
    <li><a href="login1.html">登录</a></li>
    <li class="space"></li>
    <li><a href="register1.html">注册</a></li>
    <li class="space"></li>
        `
        $('.loginWrap').html(str)
    // end 登陆修改
})
// end common.js























    var uname = getCookie('username');
    var userData = null;
    // var url = './php/userinfo.php'
    var url = '/src/php/userinfo.php'
    $.get(url, {
        username: uname
    }, res => {
        // console.log(res);
        var {
            meta: {
                status,
                msg
            },
            data
        } = res;
        userData = data;
        console.log(userData);
    }, 'json').done(function () {
        $('.portrait>img').prop('src',userData.avatar)
        updateUser(userData);
    })
    console.log('全局userData', userData);
    //修改账号信息
    // updateUser(userData);



    updateAvatar(uname);
})

function updateAvatar(uname) {
    $('.portrait').on('click', function () {
        //询问框
        let html = `
        <input type="file" name="file">
        
        `

        var updateAvatar = layer.confirm(html, {
            btn: ['上传头像', '取消'] //按钮
        }, function () {
            // 修改头像  1.上传到服务器,修改数据库路径
            // console.log($('[name="file"]')[0].files[0]);
            // console.dir($('[name="file"]')[0])
            var formData = new FormData()
            formData.append('file',$('[name="file"]')[0].files[0])
            formData.append('username',uname)
            console.log(formData);
            // $.post('./php/uploadAvatar.php',fd,res=>{
                
            // },'json')
            // $.ajax({
            //     type: "POST",
            //     url: './php/uploadAvatar.php',
            //     data: formData,
            //     success: res=>{
            //         console.log('成功');
            //     },
            //     dataType: 'json'
            //   }).done(function(){
            //       console.log('请求完成');
            //   })


            var xhr = new XMLHttpRequest()
            xhr.onload = function(){
                var res = xhr.responseText;
                // xhr.resp
                var data = JSON.parse(res)
                console.log(data);
                var {meta:{status,msg},path} = data;
                console.log(status);
                if(status==1){
                    console.log(22222);
                    $('.portrait>img').prop('src',path)
                    console.log(path);
                    // $('.portrait').html(`<img src="${path}" alt="">`)
                }
                layer.msg(msg);
                
                // 只能转json字符串，非json字符串会报错
                // var data = JSON.parse(res)
                // console.log(data);
            }
            // 文件上传必须使用post提交方式
            xhr.open('post','./php/uploadAvatar.php')
            xhr.send(formData)

        }, function () {
            layer.close(updateAvatar);
        });


        //页面层
        // var html = `
        // <input type="file" name="file">
        // <button>上传</button>
        
        // `
        // layer.open({
        //     type: 1,
        //     skin: 'layui-layer-rim', //加上边框
        //     area: ['420px', '240px'], //宽高
        //     content: html
        //     // content: 'html内容'
        // });

        return false;
    })
}

function updateUser(userData) {
    $('.userSetting').on('click', function () {
        // console.log('userData,',userData);
        //询问框
        var str = ` 
        
    <form id = "formdata">
    
    <div class="input-group">
        <span class="input-group-addon" id="basic-addon1">账号:</span>
        <input type="text" name="form-usr" class="form-usr" placeholder="Username" aria-describedby="basic-addon1" readonly=readonly value="${userData.username}">
    </div>
    <div class="input-group">
        <span class="input-group-addon" id="basic-addon1">密码:</span>
        <input type="text" name="form-pwd" class="form-pwd" placeholder="pwd" aria-describedby="basic-addon1" value="${userData.password}">
    </div>
    <div class="input-group">
        <span class="input-group-addon" id="basic-addon1">手机:</span>
        <input type="text" name="form-tel" class="form-tel" placeholder="tel" aria-describedby="basic-addon1"  value="${userData.tel}">
    </div>
    <div class="input-group">
        <span class="input-group-addon" id="basic-addon1">邮箱:</span>
        <input type="text" name="form-email" class="form-email" placeholder="email" aria-describedby="basic-addon1" value="${userData.email}">
    </div>
    </form>
    `

        var userUpdate = layer.confirm(str, {
            btn: ['确认修改', '取消'] //按钮
        }, function () {
            // 修改密码
            var formdata = $('#formdata').serialize();
            console.log(formdata);
            $.post('./php/updateUser.php', formdata, res => {
                var {
                    meta: {
                        status,
                        msg
                    }
                } = res;
                layer.msg(msg);
            }, 'json')
        }, function () {
            layer.close(userUpdate);
        });


    })
}