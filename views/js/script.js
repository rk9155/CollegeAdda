var max_limit = 8
var max_limit_all = 8
$(document).ready(function(){
	let college_name = getCookie('college')
	if(!college_name){
		$('#pop-coll-modal').click()
	}
	else{
		$('#search').val(college_name)
		$('#coll-data').text(college_name)
		getProducts('',max_limit)
	}

	$.get('/products/count?college='+ $('#search').val(),function (count) {
		$('#total-qt').html(count)
	})

	$('#location').text(getCookie('location'))
})

$.get('/products/count?college='+ $('#search').val(),function (count) {
	$('#total-qt').html(count)
})

$('#show-more').click(function () {
	move(2500)
	max_limit_all = max_limit_all + 8
	getProducts('', max_limit_all)
})
if ("<%=user.picture%>" != "") {
	$('.logged-in').hide();
	$('.avatar').show();
	$('.sell-button').addClass('mt-2');
}

function getProducts(link, limit) {
	$.get('/products/category' + link + '/' + limit +'?college='+ $('#search').val(), function (product) {
		if (product.length != 0) {
			$('#store-qt').html(product.length)
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
				else{
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
			$('#store-qt').html(0)
			$('.store-products').html('Oops nothing to be sold');
		}

	})
}


$('.all-categories').click(function () {
	move(3000)
	$.get('/products/count?college='+ $('#search').val(),function (count) {
		$('#total-qt').html(count)
	})
	$(this).parent('li').siblings().removeClass('active');
	$(this).parent('li').addClass('active');
	getProducts('', max_limit);
})

$('.main-category').click(function () {
	move(2000)
	$(this).parent('li').siblings().removeClass('active');
	$(this).parent('li').addClass('active');
	let link = $(this).attr('id').replace(/ /g, '%20');
	getProducts('/' + link, max_limit)

	$.get('/products/count/sub/'+link + '?college='+ $('#search').val(),function (count) {
		$('#total-qt').html(count)
	})
});

if ($(document).width() < 700) {

}

$.getJSON('../json/college.json', function (data) {
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
	$.get('/products/count?college='+ $('#search').val(),function (count) {
		$('#total-qt').html(count)
	})
	move(2500)
	$('#coll-data').text($('#search').val())
	setCookie('college',$('#search').val() , 10)
	e.preventDefault()
	getProducts('', max_limit)
})



