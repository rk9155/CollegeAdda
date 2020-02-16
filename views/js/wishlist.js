var cty = 0
function deleteWish(prod_id, element) {
    cty--
    $('#wishlist').find('.qty').text(cty)
    $.get('/wishlist/remove/' + prod_id)
    $(element).parents('.product-widget').hide()
}

$.get('/api/logged-in-user', function (datap) {

    if (datap != "") {

        $.get('/wishlist/get', function (data) {
            cty = data.length
            $('#wishlist').find('.qty').text(cty)
            if (data.length != 0) {
                $('.cart-list').html('')
                data.forEach((prod_deta) => {
                    $('.cart-list').prepend(`
                <div class="product-widget">
                <span id='prod_id' style='display:none'>${prod_deta._id}</span>
                <div class="product-img">
                    <img src="/image/${prod_deta.image[0]}" alt="">
                </div>
                <div class="product-body">
                        <h3 class="product-name"><a href="#">${prod_deta.title}</a></h3>
                        <h4 class="product-price">₹${prod_deta.price}</h4>
                </div>
                <button class="delete" onclick='deleteWish("${prod_deta._id}" , this)'><i class="fa fa-close"></i></button>
                </div>
            `)

                    $('.product-widget').children('.product-img').click(function () {
                        const title = $(this).parents('.product-widget').find('#prod_id').text();
                        window.location.href = '/items/' + title;
                    })
                    $('.product-widget').children('.product-body').click(function () {
                        const title = $(this).parents('.product-widget').find('#prod_id').text();
                        window.location.href = '/items/' + title;
                    })
                })
            }

            else {
                $('.cart-list').prepend('Nothing in wishlist :)')
            }

        })

        setTimeout(function () {
            $('.add-to-wishlist').click(function () {
                let prod_id = $(this).parents('#store-product').find('#prod_id').text()
                if ($('#wishlist').find('.qty').text() == 0)
                    $('.cart-list').html('')

                if ($(this).children('i').attr('class') == 'fa fa-heart-o') {
                    $(this).children('i').removeClass('fa-heart-o')
                    $(this).children('i').addClass('fa-heart')

                    let prod_title = $(this).parents('#store-product').find('.prod-title').text()
                    let prod_price = $(this).parents('#store-product').find('.product-price').text()
                    let prod_img = $(this).parents('#store-product').find('.product-img').children('img').attr('src')


                    $.get('/wishlist/add/' + prod_id)
                    cty++
                    $('#wishlist').find('.qty').text(cty)
                    $('.cart-list').prepend(`
                <div class="product-widget">
                <span id='prod_id' style='display:none'>${prod_id}</span>
                <div class="product-img">
                    <img src="${prod_img}" alt="">
                </div>
                <div class="product-body">
                        <h3 class="product-name"><a href="#">${prod_title}</a></h3>
                        <h4 class="product-price">${prod_price}</h4>
                </div>
                <button class="delete" onclick='deleteWish("${prod_id}" , this)'><i class="fa fa-close"></i></button>
                </div>
            `)

                    $('.product-widget').children('.product-img').click(function () {
                        window.location.href = '/items/' + prod_id;
                    })
                    $('.product-widget').children('.product-body').click(function () {
                        window.location.href = '/items/' + prod_id;
                    })
                }

                else {
                    $(this).children('i').removeClass('fa-heart')
                    $(this).children('i').addClass('fa-heart-o')
                    deleteWish(prod_id , )
                }

            })

        }, 5000)
    }
})