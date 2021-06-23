$(function () {
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
})