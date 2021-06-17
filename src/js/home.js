 $(function () {
     console.log(1111);
     // 获取cookie 判断是否登录
     var username = getCookie('username')
     console.log(username);
     if (username) {
         var str = `
        <li>
        欢迎<span style="color:red; font-size:20px; margin:0 5px">${username}</span>来到京东商城
        
        </li>
        <li>
            <a href="javascript:;" class="logout">退出</a>
        </li>
        
        `
         $('.customNav').html(str)
     }
     $('.logout').on('click',function(){
         removeCookie('username')
        var str = `
        <li>
        <a href="login1.html">登录</a>
      </li>
      <li>
        <a href="register1.html">注册</a>
      </li>
        `
         $('.customNav').html(str)
     })
 })