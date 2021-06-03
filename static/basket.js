// From item page
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
$(window).scroll(function() {
    if($(window).scrollTop() >300){
        $(".header_over").slideDown('fast');
    }else{
        $(".header_over").slideUp('fast');
    }
});
function totalBasket(){
    setTimeout(function(){
        var total = 0;
        var total2 = 0;
        $.each($('.header').find('.cart_item-body__price-sum'),function(i,val){
            // console.log(parseInt($(this).text().replace('руб.','').replace(' ','')));
            total += parseInt($(this).text().replace('руб.','').replace(' ',''));
        });
        $.each($('.header_over').find('.cart_item-body__price-sum'),function(i,val){
            // console.log(parseInt($(this).text().replace('руб.','').replace(' ','')));
            total2 += parseInt($(this).text().replace('руб.','').replace(' ',''));
        });
        // console.log(total);
        $('.header').find('.cart_sum-sum').find('span').html(numberWithCommas(total)+' руб.');
        $('.header_over').find('.cart_sum-sum').find('span').html(numberWithCommas(total2)+' руб.');
    },500);
}
function totalCount(){
    $('.count-num').html($('.cart_item').length/2);
}
// split('</div>').split('">')[1]
// $(document).ready(function(){
    $('body').on('click','.order__btn-wrapper',function(){
        setTimeout(function(){
            var size = $('.select__head').text();
            var color = $('.choose__color-item.active').data( "color");
            var count = $('.order__count-count').text();
            var img = $('.img__item-main__item').find('img').attr('src');
            var price = $('.info__order-basket-price').find('span').text();
            var total = parseInt(price.replace( /\s/g, "")) * parseInt(count);
            var title = $('.title').text();
            var id = item.attr('id')
            console.log(parseInt(price.replace( /\s/g, "")) ,count);
            var el1 = '<div class="cart_item" id="'+id+'">'
            var el2 = '     <div class="cart_item-img"><img src="'+ img +'" alt=""></div>'
            var el3 = '     <div class="cart_item-body">        '
            var el4 = '         <div class="cart_item-body__close"><img src="/static/img/close_basket.svg" alt=""></div>'
            var el5 = '         <div class="cart_item-body__title">'+ title +'</div>'
            var el6 = '         <div class="cart_item-body__size">Размер: <span>'+ size +'</span></div>'
            var el7 = '         <div class="cart_item-body__color">Цвет: <span>'+ color +'</span></div>'
            var el8 = '         <div class="cart_item-body__price">'
            var el9 = '              <div class="cart_item-body__price-perone">'+ price +' х '+ count +'шт.</div>'
            var el10 = '             <div class="cart_item-body__price-sum">'+ numberWithCommas(total) +' руб.</div>'
            var el11 = '        </div>'
            var el12 = '      </div>'
            var el13 = '</div>'
            var el = el1 + el2 +el3 +el4 +el5 +el6 +el7 +el8 +el9 +el10 +el11 +el12 +el13
            $('.cart__items').append(el);
            $('.cart__wrapper').slideDown('fast');
            totalBasket();
            totalCount();
        },200);
        console.log('asdasdasdasdsas')
    });
    $('body').on('click','.btn__wrapper',function(){
        var item = $(this).parent().parent().parent().parent();
        var color = item.find('.item__digits-color__item.active').data('color');
        var count = item.find('.cart__count-count').text();
        var size = item.find('.item__digits-size__item.active').text();
        var price = item.find('.item__info-price').find('span').text();
        var img = item.find('.item__img').find('img').attr('src');
        var total = parseInt(price.replace( /\s/g, "")) * parseInt(count);
        var title =  item.find('.item__title').text();
        var id = item.attr('id');
        var tempid = Math.floor((Math.random() * 100000) + 10000)
        setTimeout(function(){
            var el1 = '<div class="cart_item" id="'+tempid+'" data-id="'+id+'">'
            var el2 = '     <div class="cart_item-img"><img src="'+ img +'" alt=""></div>'
            var el3 = '     <div class="cart_item-body">        '
            var el4 = '         <div class="cart_item-body__close"><img src="/static/img/close_basket.svg" alt=""></div>'
            var el5 = '         <div class="cart_item-body__title">'+ title +'</div>'
            var el6 = '         <div class="cart_item-body__size">Размер: <span>'+ size +'</span></div>'
            var el7 = '         <div class="cart_item-body__color">Цвет: <span>'+ color +'</span></div>'
            var el8 = '         <div class="cart_item-body__price">'
            var el9 = '              <div class="cart_item-body__price-perone">'+ price +' х '+ count +'шт.</div>'
            var el10 = '             <div class="cart_item-body__price-sum">'+ numberWithCommas(total) +' руб.</div>'
            var el11 = '        </div>'
            var el12 = '      </div>'
            var el13 = '</div>'
            var el = el1 + el2 +el3 +el4 +el5 +el6 +el7 +el8 +el9 +el10 +el11 +el12 +el13
            $('.cart__items').append(el);
            $('.cart__wrapper').slideDown('fast');
            totalBasket();
            totalCount();
        },200);
    });
    $('body').on('click','.cart_item-body__close',function(){
        var it = $(this).parent().parent();
        // console.log(it.attr('id'));
        // console.log(it);
        it.slideUp('fast',function(){
            $('div#'+it.attr('id')+'.cart_item').remove();
            totalBasket();
            totalCount();
        });
    });
    $('body').on('click','.cart_sum-clear',function(){
        $('.cart_item').slideUp('fast',function(){
            $('.cart_item').remove();
            totalBasket();
            totalCount();
        });
    });
// });