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
        console.log(res);
        var {meta:{status,msg},data} = res;
        // console.log(data);
        if(status===1){
            $('.goodsName').text(data.name)
            $('.goodsPrice').text(data.price)
            // console.log(data.description);
            $('.goodsDescr').text(data.description)
            // console.log(data.introduce);
            $('[name="introduce"]').html(data.introduce);
            // console.log($('.mask img'));
            // $('.middle>img').prop('src',data.img)
            $('.middle').html(`
            <div class="mask"></div>
            <img src="${data.img}" alt="">
            <div class="big">
                <img src="${data.img}" alt="">
            </div>
            `)

            var arr = data.manyImg.split('==========');
            // console.log(arr);
            var imgStr = '';
            arr.forEach((v,i) => {
                if (i===0) {
                    imgStr+= `
                    <img class="active" src="${v}" alt="">
                    `
                }else{
                    imgStr+= `
                    <img src="${v}" alt="">
                    `
                }
            });
            $('.small').html(imgStr);
            // 数据传输完毕后调用放大镜效果
            enlarge();
            // 加入购物车
            addCart(username,id);
        }
    },'json')
    // new Tab().init('tab');
    var t = new Tab('tab')
    t.init()

})

function addCart(username,id){
    // console.log('加入购物车');
    $('.addCart').on('click',function(){
        // 判断是否登录
        // console.log(username);
        if(!username){
            // 存储当前url以便之后跳转回来详情页
            localStorage.setItem('url',location.href)
            location.href = 'login1.html'
            return false;
        }

        // 先判断本地存储中是否有数据
        var data = localStorage.getItem('data')
        // 查询是否有购物车,没有则创建,有则取之使用
        if(!data){
            var arr = []
            
        }else{
            var arr = JSON.parse(data)
        }
        console.log('传入id,username',id,username);
        console.log(arr);
        // find 方法 从数组中找到满足条件的第一个元素,并返回该元素
        var findResult = arr.find(item=>{
            console.log('item.goodsid,item.username',item.goodsid,item.username);
            console.log('id,username',id,username);
            return item.goodsid==id&&item.username === username
        })
        
        if(!findResult){
            var obj = {
                username,
                goodsid:id,
                number:1
            }
            arr.push(obj)
        }else{
            // 返回的findResult和数组中的findResult指向同一个地址,所以修改findResult.number++ ,数组中也会随之改变
            findResult.number++
        }
        localStorage.setItem('data',JSON.stringify(arr))
    })
}

function goLogin() {
    $('.customNav li:first').on('click', function () {
        // 点击登录 跳转前先存储当前url
        localStorage.setItem('url', location.href);

        // 跳转到登录页
        location.href = 'login1.html';
        // 登录成功跳转回详情页
    })
}

