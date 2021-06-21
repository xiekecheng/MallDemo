$(function () {
    // 验证登陆状态
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

    // 获取本地存储中的数据
    var data = localStorage.getItem('data');
    if (!data||data==='[]') {
        console.log('购物车中没有商品');
        str = `<div class="jumbotron">
        <h1>购物车</h1>
        <p>购物车里没有商品,赶快去挑选喜欢的宝贝吧!</p>
        <p><a class="btn btn-primary btn-lg" href="list.html" role="button">去列表页</a></p>
      </div>`;
        $('.cart').html(str);
        return false;
    }
    var arr = JSON.parse(data);
    // console.log('本地存储:', arr);
    // 在本地存储中找到当前用户名所加入购物车的商品
    var result = arr.filter(item => {
        return item.username === username;
    })


    var ids = [];
    result.forEach(item => {
        ids.push(item.goodsid)
    });
    // console.log('购物车商品:', result);
    // console.log(ids);
    // var {goodsid,number} = result;


    $.get('./php/cart.php', {
        ids: ids.join(',')
    }, res => {
        var {
            meta: {
                status,
                msg
            },
            data
        } = res;
        if (status === 1) {
            // console.log(data);
            var str = '';
            data.forEach(item => {
                // console.log(arr);
                var cartResult = arr.find(goods => {
                    return goods.goodsid == item.id;
                })
                // console.log('cartResult',cartResult);
                var num = cartResult.number;
                str += `
                <tr>
                            <th scope="row">
                                <input name="selectOne" type="checkbox">
                            </th>
                            <td class="goods">
                                <div class="goodsImg fl">
                                    <img src="${item.img}" alt="">
                                </div>
                                <div class="goodsDescr">
                                    <p>${item.name}</p>
                                </div>
    
                            </td>
                            <td>${item.price}</td>
                            <td class="number" data-id="${item.id}"><button class="btn reduce btn-sm">-</button><input type="number" name="number"
                            value="${num}"><button class="btn add btn-sm">+</button></td>
                            <td class="subTotal">${item.price*num}</td>
                            <td><a class="btn remove btn-danger" href="javascript:;">删除</a></td>
                        </tr>
                `
                $('.table>tbody').html(str);
            })
            // 全选
            selectAll();
            // 单选
            selectOne();
            // 减少商品数量
            reduce(arr);
            // 增加商品数量
            add(arr)
            subTotal();
            // 计算总价
            total();
            removeCart(arr);
            // 小计


        }
    }, 'json')
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

// 全选按钮
function selectAll() {
    $('[name="selectAll"]').on('click', function () {

        $('[name="selectAll"]').prop('checked', $(this).prop('checked'))
        $('[name="selectOne"]').prop('checked', $(this).prop('checked'));
        subTotal()
        total()
    })
}
// 单选商品
function selectOne() {
    $('[name="selectOne"]').on('click', function () {
        // 判断是否全部选择
        var flag = Array.from($('[name="selectOne"]')).every(value => {
            return value.checked === true;
        })
        // 修改全选按钮的状态
        $('[name="selectAll"]').prop('checked', flag)
        subTotal()
        total()
    })
}

// 商品减少
function reduce(arr) {
    // 数量修改
    $('.reduce').on('click', function () {
        console.log(111);
        var num = $(this).next().val() - 0 - 1;
        $(this).next().val(num);

        // 获取当前商品id
        var id = $(this).parent().attr('data-id')
        // 修改购物车中数据
        var obj = arr.find(item => item.goodsid == id)
        obj.number = num;
        localStorage.setItem('data', JSON.stringify(arr))
        subTotal()
        total()
    })


}

// 商品增加
function add(arr) {
    // 数量修改
    $('.add').on('click', function () {
        console.log(222);
        var num = $(this).prev().val() - 0 + 1;
        $(this).prev().val(num);

        // 获取当前商品id
        var id = $(this).parent().attr('data-id')
        // 修改购物车中数据
        var obj = arr.find(item => item.goodsid == id)
        obj.number = num;
        localStorage.setItem('data', JSON.stringify(arr))
        subTotal()
        total()
    })


}

// 计算总价
function total() {
    var num = 0;
    var totalPrice = 0
    // 将复选框中选中的数据进行遍历,然后将数量和总价记录下来
    $('[name="selectOne"]:checked').each((i, v) => {
        num += $(v).parent().siblings('.number').find('input').val() - 0
        totalPrice += $(v).parent().siblings('.subTotal').text() - 0
    })
    $('.totalNum').text(num)
    $('.totalPrice').text(totalPrice)
}

function subTotal() {
    // console.log($('.number input'));
    $('.number input').each((i, v) => {
        // console.log(v);
        var num = v.value - 0
        var price = $(v).parent().prev().text() - 0
        var sub = num * price;
        $(v).parent().next().text(sub)
    })
}

function removeCart(arr) {
    $('.remove').on('click', function () {
        //询问框

       var confirmindex =  layer.confirm('删除商品', {
            btn: ['移入收藏', '删除商品'] //按钮
        }, function () {
            
        }, ()=> {
            
            var goodsid = $(this).parent().siblings('.number').attr('data-id')
            // console.log(goodsid);
            var index = arr.findIndex(item=>item.goodsid == goodsid)
            // 删除本地存储中的购物车数据
            arr.splice(index,1)
            localStorage.setItem('data',JSON.stringify(arr))
            // 删除自身数据
            $(this).parent().parent().remove()
            total()
            layer.close(confirmindex)
            console.log(arr.length);
            if(arr.length===0){
                // $('.cartdata').html(`
                //     <div class="jumbotron">
                //     <h1>购物车空空如也!</h1>
                //     <p>赶快去列表页挑选商品吧！！！</p>
                //     <p><a class="btn btn-primary btn-lg" href="list.html" role="button">去列表页</a></p>
                // </div>
                // `)
                str = `<div class="jumbotron">
                <h1>购物车</h1>
                <p>购物车里没有商品,赶快去挑选喜欢的宝贝吧!</p>
                <p><a class="btn btn-primary btn-lg" href="list.html" role="button">去列表页</a></p>
              </div>`;
                $('.cart').html(str);
            }
        });
    })
}