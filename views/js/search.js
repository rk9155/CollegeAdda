var max_limit = 7
function getProductsFromCollege(link, limit) {
	$.get('/products/search/' + link + '/' + limit, function (product) {
		if (product.length != 0) {
			$('.store-products').html('');
			product.forEach((prod_deta) => {
				var prod_coll = prod_deta.college_name;
				var prod_title = prod_deta.title;
				var prod_id = prod_deta._id
				if ($(document).width() < 700) {
					if (prod_title.length > 17)
						prod_title = prod_deta.title.substring(0, 17) + '...'

					if (prod_coll.length > 17)
						prod_coll = prod_coll.substring(0, 17) + '....'
				}
				else {
					if (prod_coll.length > 30)
						prod_coll = prod_coll.substring(0, 30) + '....'
				}

				var clas;
				if (prod_deta.isWish) {
					clas = "fa-heart"
				}
				else {
					clas = "fa-heart-o"
				}
				$('.store-products').append(
					`<div class="col-md-3 col-xs-6" id='store-product'>
						<span id='prod_id' style='display:none'>${prod_id}</span>
						<div class="product">
							<div class="product-img">
								<img src="/image/${prod_deta.image[0]}" alt="Product image">
								<div class="product-label">
									<span class="new">NEW</span>
								</div>
							</div>
							<div class="product-body">
								<h4 class="product-price"><span>₹</span>${prod_deta.price}</h4>
								<h6 class="product-name"><a href="#" class="prod-title">${prod_title}</a></h6>
								<div class="product-btns">
									<button class="add-to-wishlist"><i class= 'fa ${clas}'></i><span class="tooltipp">add to wishlist</span></button>
									<button class="add-to-compare" onclick="window.location.href = 'https://wa.me/?text= Look at the Amazing🤩🤩 deals on *${prod_deta.sub_type}* at *COllegeAdda*.👉👉 ${window.location.href}items/${prod_id}';"><i class="fa fa-exchange"></i><span class="tooltipp">Share</span></button>
								</div>
								<h6 class="product-category">${prod_coll}</h6>
							</div>
						</div>
					</div>`
				)
				$('.product-img').on('click', function () {
					const title = $(this).parent().siblings('#prod_id').text();
					window.location.href = '/items/' + title;
				});
			})
		}
		else {
			$('.store-products').html('Oops nothing to be sold');
        }
        
        $('html, body').animate({
            scrollTop: ($('#products').offset().top)
        },100);

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
					deleteWish(prod_id)
				}

			})

		}, 5000)
	})
}

$.getJSON('json/college.json', function (data) {
	$('#search').on('keyup', function (e) {

		$('#searchResult').html(``);
		$('#searchResult').show();
		let searchData = $(this).val();
		let newReg = new RegExp(searchData, "i");

		data.clg.forEach((clg_name) => {
			if (clg_name.search(newReg) != -1) {
				$('#searchResult').append(`<li class="list-group-item searched">${clg_name}</li>`);
				$('.searched').click(function () {
					$('#search').val($(this).text())
				});
			}
			if (searchData == '') {
				$('#searchResult').html(``);
				$('#searchResult').hide();
			}
		});
	});
	$('#search').focusout(function (e) {
		setTimeout(() => {
			$('#searchResult').hide();
		}, 500);
	});
	$('#search').on('focus', function (e) {
		$('#searchResult').show();
	});

});

$('#search-btn').click(function (e) {
	e.preventDefault()

    getProductsFromCollege($('#search').val(), max_limit)
})
