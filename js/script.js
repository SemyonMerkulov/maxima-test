(function(){

  function initCounter() {
    var $metr, $cal, timer;
    $metr = $('.footer-info__meters');
    $cal = $('.footer-info__cals');

    clearInterval(timer);
    timer = setInterval(function (){
        $metr.text(parseInt($metr.text())+1);
        $cal.text(Number(parseFloat($cal.text())+0.087).toFixed(2));
    }, 1000);
  }

	function initSlick() {
		$('.slider__inner').slick({
			slidesToShow: 1,
			autoplay: true,
			arrows: false
		});
	}

	function initMask() {
		$('.weight-form__field_weight').inputmask({"mask": "9{1,3} кг"});
		$('.weight-form__field_age').inputmask({"mask": "9{1,2} лет"});
		$('.weight-form__field_height').inputmask({"mask": "9{1,3} см"});
	}

	function skierAnimation() {
		var bottomEl = $('.weight'); 
		var skier = $('.events__skier-figure');
		var trigger = bottomEl.offset().top - bottomEl.height();

		if ($(window).scrollTop() > trigger && skier.hasClass('js-freeze')) {

			skier.removeClass('js-freeze');

			TweenMax.set(skier, {left: 1500, bottom: 86})
			TweenMax.to(skier, 5, {left: -1500, bottom: -86});

			setInterval(function(){
	      TweenMax.set(skier, {left: 1500, bottom: 86})
	      TweenMax.to(skier, 7, {left: -1500, bottom: -86});
	    }, 7000);
		}
	}

	$(window).on("load resize scroll", function(){
		// skierAnimation();
	})

	$(document).ready(function(){

    initCounter();  
		initSlick();
		initMask(); 

		$(".slider__nav-btn_prev").click(function(){
			$('.slider__inner').slick('slickPrev');
		});
		$(".slider__nav-btn_next").click(function(){
			$('.slider__inner').slick('slickNext');
		});
	});
})();