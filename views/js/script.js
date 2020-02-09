$(document).ready(getProducts('', 7))

if ("<%=user.picture%>" != "") {
	$('.logged-in').hide();
	$('.avatar').show();
	$('.sell-button').addClass('mt-2');
}

function getProducts(link, limit) {
    $.get('/products/category' + link + '/'+ limit, function (product) {
        if (product.length != 0) {
            $('.store-products').html('');
            product.forEach((prod_deta) => {
				var prod_title = prod_deta.title;
				if($(document).width() < 700){
					if(prod_title.length > 17)
						prod_title = prod_deta.title.substring(0, 17) + '...'
				}
                $('.store-products').prepend(
                    `<div class="col-md-4 col-xs-6" id='store-product'>
						<div class="product">
							<div class="product-img">
								<img src="/image/${prod_deta.image[0]}" alt="Product image">
								<div class="product-label">
									<span class="new">NEW</span>
								</div>
							</div>
							<div class="product-body">
								<p class="product-category">${prod_deta.sub_type}</p>
								<h3 class="product-name"><a href="#" class="prod-title">${prod_title}</a></h3>
								<h4 class="product-price">PRICE : ₹${prod_deta.price}</h4>
								<div class="product-btns">
									<button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
									<button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
									<button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
								</div>
							</div>
						</div>
					</div>`
                )
                $('#store-product').on('click', function () {
                    const title = $(this).find('.product-body').find('.prod-title').text();
                    window.location.href = '/items/' + title;
                });
            })
        }
        else {
            $('.store-products').html('Oops nothing to be sold');
        }

    })
}

$('.all-categories').click(function () {
    $(this).parent('li').siblings().removeClass('active');
    $(this).parent('li').addClass('active');
    getProducts('', 7);
})

$('.main-category').click(function () {
    $(this).parent('li').siblings().removeClass('active');
    $(this).parent('li').addClass('active');
    let link = $(this).attr('id').replace(/ /g, '%20');
    getProducts('/'+link, 7)
});

if($(document).width() < 700){

}
