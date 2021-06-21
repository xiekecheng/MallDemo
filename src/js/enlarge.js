function enlarge(){
    $('.small img').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
        $('.middle>img').attr('src',$(this).attr("src"))
        $('.big>img').attr('src',$(this).attr("src"))
    })
    $('.middle').hover(function(){
        // 让遮罩和大盒子显示
        $('.mask').css('display','block')
        $('.big').css('display','block')
    
        $(this).mousemove(function(e){
            var x = e.pageX;
            var y = e.pageY;
    
            // console.log(Math.ceil(parseFloat($('.middle').css('border-width'))));
    
            var left = x - $('.mask').width()/2
            var top = y - $('.mask').height()/2
    
            if(left<=$('.middle').offset().left+Math.ceil(parseFloat($('.middle').css('border-width')))){
                left=$('.middle').offset().left+Math.ceil(parseFloat($('.middle').css('border-width')))
            }
    
            if(top<=$('.middle').offset().top+Math.ceil(parseFloat($('.middle').css('border-width')))){
                top=$('.middle').offset().top+Math.ceil(parseFloat($('.middle').css('border-width')))
            }
    
            if(left>=$('.middle').offset().left+$('.middle').width()-$('.mask').width()+Math.ceil(parseFloat($('.middle').css('border-width')))){
                left=$('.middle').offset().left+$('.middle').width()-$('.mask').width()+Math.ceil(parseFloat($('.middle').css('border-width')))
            }
    
            if(top>=$('.middle').offset().top+$('.middle').height()-$('.mask').height()+Math.ceil(parseFloat($('.middle').css('border-width')))){
                top=$('.middle').offset().top+$('.middle').height()-$('.mask').height()+Math.ceil(parseFloat($('.middle').css('border-width')))
            }
            $('.mask').offset({left,top})
    
            // 遮罩移动过的距离 / 中盒子的宽高 = 大图移动的距离 / 大图的大小
            var bigLeft = $('.mask').position().left / $('.middle').width() * $('.big>img').width()
            var bigTop = $('.mask').position().top / $('.middle').height() * $('.big>img').height()
            // console.log(bigLeft,bigTop);
            $('.big>img').css({
                left:-bigLeft+"px",
                top:-bigTop+"px"
            })
        })
    },function(){
        $('.mask').css('display','none')
        $('.big').css('display','none')
    })
}