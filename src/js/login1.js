$(function () {
    
    // 判断你是否有记住的用户名
    var remusername = getCookie('remusername');
    // 有保存的用户名则自动填充
    if(remusername){
        $('[name="username"]').val(remusername);
    }
    console.log(111);
    $('.jdlogin').on('click', function () {
    // $('[type="button"]').on('click', function () {
        // 验证用户名
        if ($('[name="username"]').val() === '') {
            layer.msg('用户名不能为空', {
                icon: 2,
                time: 1500

            })
            return false;
        }

        // 验证用户名
        if ($('[name="password"]').val() === '') {
            layer.msg('密码不能为空', {
                icon: 2,
                time: 1500

            })
            return false;
        }

        // 禁用按钮避免过多请求
        $(this).prop('disabled', true)
        // 遮罩层
        var loadIndex = layer.load(0, {
            shade: false
        });
        
        $.ajax({
            method: "POST",
            url: "./php/login.php",
            data: $('form').serialize(),
            dataType:'json',
            success: res=>{
                $(this).prop('disabled', false)
                layer.close(loadIndex);
                var {meta:{status,msg}} = res;
                // 账号密码正确
                if (status === 1) {
                    // 将用户名密码存储在cookie中
                    setCookie('username',$('[name="username" ]').val())
                    // setCookie('password',$('[name="password" ]').val())
                    if($('[name="remember"]').prop('checked')){
                        setCookie('remusername',$('[name="username" ]').val())
                    }

                    layer.msg(msg, {
                        icon: 1,
                        time: 1500
                    }, function () {
                        location.href = 'home.html';
                    })
                } else {
                    layer.msg(msg, {
                        icon: 2,
                        time: 1500
                    }, function () {
                        // location.href = 'login.html';
                    })
                }
            }
            })


    })
})