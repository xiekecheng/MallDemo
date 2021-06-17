$(function () {

    $('.viewDetail').on('click', function () {
        //询问框
        var str = `
        1、本网站运用自身开发的操作系统通过国际互联网络为用户提供购买商品等服务。使用本网站，您必须：

（1）自行配备上网的所需设备，包括个人手机、平板电脑、调制解调器、路由器等；
（2）自行负担个人上网所支付的与此服务有关的电话费用、网络费用等；
（3）选择与所安装终端设备相匹配的软件版本，包括但不限于iOS、Android、Windows等多个京东发布的应用版本。
2、基于本网站所提供的网络服务的重要性，您确认并同意：

（1）提供的注册资料真实、准确、完整、合法有效，注册资料如有变动的，应及时更新；
（2）如果您提供的注册资料不合法、不真实、不准确、不详尽的，您需承担因此引起的相应责任及后果，并且京东保留终止您使用本网站各项服务的权利。
        `
        var confirmLayer = layer.confirm(str, {
            btn: ['我同意', '取消'] //按钮
        }, function () {
            $('[name="agreement"]').prop('checked',true);
            layer.close(confirmLayer);
        }, function () {
            // layer.msg('也可以这样', {
            //     time: 20000, //20s后自动关闭
            //     btn: ['明白了', '知道了']
            // });
        });
    })
    
    $('.jdregister').on('click', function () {
    // $('button[type="button"]').on('click', function () {

        // 验证用户名
        if ($('[name="username"]').val() === '') {
            layer.msg('用户名不能为空', {
                icon: 2,
                time: 1500

            })
            return false;
        }
        

        var usernameReg = /^[a-zA-Z]\w{2,9}$/;
        if (!usernameReg.test($('[name="username"]').val())) {
            layer.msg('用户名不规范', {
                icon: 2,
                time: 1500

            })
            return false;
        }

        if ($('[name="password"]').val() === '') {
            layer.msg('密码不能为空', {
                icon: 2,
                time: 1500

            })
            return false;
        }

        var passwordReg = /^.{6,12}$/;
        if (!passwordReg.test($('[name="password"]').val())) {
            layer.msg('密码不规范', {
                icon: 2,
                time: 1500

            })
            return false;
        }

        // 验证密码
        // if ($('[name="password"]').val() !== $('[name="repassword"]').val()) {
        //     layer.msg('两次输入密码不一致', {
        //         icon: 2,
        //         time: 1500

        //     })
        //     return false;
        // }

        // 邮箱验证
        if ($('[name="email"]').val() === '') {
            layer.msg('邮箱不能为空', {
                icon: 2,
                time: 1500

            })
            return false;
        }

        // console.log($('[name="email"]').val());
        // console.log(usernameReg.test($('[name="email"]').val()));
        var emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!emailReg.test($('[name="email"]').val())) {
            layer.msg('邮箱不规范', {
                icon: 2,
                time: 1500

            })
            return false;
        }

        // 手机号验证
        if ($('[name="tel"]').val() === '') {
            layer.msg('手机号不能为空', {
                icon: 2,
                time: 1500

            })
            return false;
        }
        var telReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!telReg.test($('[name="tel"]').val())) {
            layer.msg('手机号不规范', {
                icon: 2,
                time: 1500

            })
            return false;
        }

        // 同意协议
        // if (!$('[name="agreement"]').prop('checked')) {
        //     layer.msg('请阅读协议并同意', {
        //         icon: 1,
        //         time: 1500
        //     })
        //     return false;
        // }

        // 禁用按钮避免过多请求
        $(this).prop('disabled', true)


        // 遮罩层
        // var loadIndex = layer.load(0, {
        //     shade: false
        // });

        $.ajax({
            method: "POST",
            url: "./php/register.php",
            data: $('form').serialize(),
            dataType: 'json',
            success: res => {
                $(this).prop('disabled', false)
                // layer.close(loadIndex);
                var {
                    meta: {
                        status,
                        msg
                    }
                } = res;
                if (status === 1) {
                    layer.msg(msg, {
                        icon: 1,
                        time: 1500
                    }, function () {
                        location.href = 'login1.html';
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