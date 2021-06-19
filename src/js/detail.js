$(function () {
    // 获取cookie 判断是否登录
    var username = getCookie('username')
    //  console.log(username);
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
    $('.logout').on('click', function () {
        removeCookie('username')
        var str = `
            <li>
            <a href="javascript:;">登录</a>
          </li>
          <li>
            <a href="register1.html">注册</a>
          </li>
            `
        $('.customNav').html(str)

        goLogin()
    })
    goLogin()

    // 获取商品id
    var reg = /id=(\d+)/;
    var arr = reg.exec(location.search);
    // console.log(location.search);
    // console.log(arr);

    if(!arr){
        layer.msg('非法访问',{
            icon:2,
            time:500
        },function(){
            location.href = 'list.html';
        })
    }
    var id = arr[1];
    // 发送ajax请求数据
    $.get('./php/detail.php',{id:id},res=>{
        var {meta:{status,msg},data} = res;
        console.log(data);
        if(status===1){
            $('.goodsName').text(data.name)
            $('.goodsPrice').text(data.price)
            // $('.goodsDescr').text(data.name)
        }
    },'json')


})

function goLogin() {
    $('.customNav li:first').on('click', function () {
        // 点击登录 跳转前先存储当前url
        localStorage.setItem('url', location.href);

        // 跳转到登录页
        location.href = 'login1.html';
        // 登录成功跳转回详情页
    })
}