

$(document).ready(function(){
    $('.main__corusel').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        speed: 500,
        cssEase: 'linear'
    });
    $('.img__item-main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.img__item-nav'
      });
      $('.img__item-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.img__item-main',
        dots: true,
        // centerMode: true,
        focusOnSelect: true
    });

    $('.main_info__title-item').click(function(){
        var idv = $(this).attr('id');
        $('.main_info__title-item.active').removeClass('active');
        $(this).addClass('active');
        $('.main_info__body-item.active').removeClass('active');
        $('#'+idv+'.main_info__body-item').addClass('active');
    });
    $('.choose__color-item').click(function(){
        var idv = $(this).attr('id');
        $('.choose__color-item.active').removeClass('active');
        $(this).addClass('active');
    });



    $('.order__count-minus').click(function(){
        var c = parseInt($('.order__count-count').text());
        if(c>1){
            $('.order__count-count').html(c-1);
        }
    });
    $('.order__count-plus').click(function(){
        var c = parseInt($('.order__count-count').text());
        $('.order__count-count').html(c+1);
    });
    $('.header__tools-cart').click(function(){
        $('.cart__wrapper').slideDown('fast');
    });
    $(document).on("click", function(event){
        var $trigger = $(".cart__wrapper");
        var $trigger1 = $('.header__tools-cart')
        if($trigger !== event.target && !$trigger.has(event.target).length && $trigger1 !== event.target && !$trigger1.has(event.target).length){
            $(".cart__wrapper").slideUp("fast");
        }            
    });
    $(document).on("click",'.header__tools-account',function(){
        $('.account__under').slideDown('fast');
    console.log('SlideDown')
    });
    $(document).on("click", function(event){
        var $trigger = $(".account__under");
        var $trigger1 = $('.header__tools-account')
        if($trigger !== event.target && !$trigger.has(event.target).length && $trigger1 !== event.target && !$trigger1.has(event.target).length){
            $(".account__under").slideUp("fast");
        }            
    });
// });

// const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


$('.item__digits-color__item').click(function(){
    var all = $(this).parent();
    all.find('.item__digits-color__item.active').removeClass('active');
    $(this).addClass('active');
    var p = $(this).data('pk')
    var colorq = $(this).find('div').css('backgroundColor');
    var colorch = rgb2hex(colorq);
    var g = $(this).parent().parent().parent();
    var t = $(this).parent().parent().parent().find('.hid'+p);
    
   g.find('.item__img').find('img').attr('src',t.data('img'))
    g.find('.item__title').html(t.data('title'))
    g.find('.item__info-price span').html(t.data('price'))
    console.log(g.html().split(','))
    g.find('.item__digits-size').html('')
    $.each(t.text().split(','),function(i,y){
        g.find('.item__digits-size').append('<div class="item__digits-size__item">'+y+'</div>')
    })

});


$('body').on('click','.item__digits-size__item',function(){
    var all = $(this).parent();
    all.find('.item__digits-size__item.active').removeClass('active');
    $(this).addClass('active');
    
});
$('.cart__count-plus').click(function(){
    var n =  parseInt($(this).parent().find('.cart__count-count').text());
    $(this).parent().find('.cart__count-count').html(n+1)
});
$('.cart__count-minus').click(function(){
    var n =  parseInt($(this).parent().find('.cart__count-count').text());
    if(n>1){
        $(this).parent().find('.cart__count-count').html(n-1)
    }
});





$('.select').on('click', '.select__head', function () {
    if ($(this).hasClass('open')) {
        $(this).removeClass('open');
        $(this).next().fadeOut();
    } else {
        $('.select__head').removeClass('open');
        $('.select__list').fadeOut();
        $(this).addClass('open');
        $(this).next().fadeIn();
    }
});
$('.select').on('click', '.select__item', function () {
    $('.select__head').removeClass('open');
    $(this).parent().fadeOut();
    $(this).parent().prev().text($(this).text());
    $(this).parent().prev().prev().val($(this).text());
});

$(document).click(function (e) {
    if (!$(e.target).closest('.select').length) {
        $('.select__head').removeClass('open');
        $('.select__list').fadeOut();
    }
});










// Basket 


// From item page
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
$(window).scroll(function() {
    if (screen.width > 420){
    if($(window).scrollTop() >300){
        $(".header_over").slideDown('fast');
    }else{
        $(".header_over").slideUp('fast');
    }}
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
            var id = $('.info__dop-article span').text();
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
});