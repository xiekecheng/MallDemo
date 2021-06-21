$(function () {
    $.get('php/list.php', res => {
        console.log(res);
        var {
            meta: {
                status,
                msg
            },
            data
        } = res;

        var pageSize = 8;
        var p = new Page('page', {
            /*language:{
                first:"|<<",
                prev:"<<",
                next:">>",
                last:">>|"
            },*/
            pageData: {
                total: data.length,
                pageSize
            },
            show: function (currentPage) {
                // console.log(currentPage);
                /*
                1   arr.slice(0,10)
                2   arr.slice(10,20)
                3   arr.slice(20,30)
                */
                var brr = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                var str = '';
                brr.forEach(item => {
                    str += `
            
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="thumbnail">
                    <img src="${item.img}" alt="...">
                    <div class="caption">
                        <p><span class="jdprice"><b>￥</b><em>${item.price}</em></span></p>
                        <h3 class="goodsName">${item.name}</h3>
                        
                        <p><span class="spanNum">${item.totalComment}<strong class="goodscomment">条评价</strong></span></p>
                        <p class="shopName"><a href="${item.shopLink}">${item.shopName}</a></p>
                        <p>
                            <a href="detail.html?id=${item.id}" class="btn btn-primary" role="button">查看详情</a> <a href="#"
                                class="btn btn-danger" role="button">立即购买</a>
                            </p>
                            
                    </div>
                </div>
            </div> 
            
           `
                })
                $('.goods .row').html(str)
            }
        })
    }, 'json')
})
