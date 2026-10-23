$(window).on('load', function() {

    /*======== Preloader ========*/
    $(".loader").fadeOut();
    $(".preloader").delay(1000).fadeOut();


    /*======== Isotope Portfolio Setup ========*/
    if( $('.portfolio-items').length ) {
        var $elements = $(".portfolio-items"),
            $filters = $('.portfolio-filter ul li');
        $elements.isotope();

        $filters.attr('aria-pressed', function() {
            return $(this).hasClass('active') ? 'true' : 'false';
        }).on('click', function(){
            $filters.removeClass('active').attr('aria-pressed', 'false');
            $(this).addClass('active').attr('aria-pressed', 'true');
            var selector = $(this).data('filter');
            $(".portfolio-items").isotope({
                filter: selector,
                hiddenStyle: {
                    transform: 'scale(.2) skew(30deg)',
                    opacity: 0
                },
                visibleStyle: {
                    transform: 'scale(1) skew(0deg)',
                    opacity: 1
                },
                transitionDuration: '.5s'
            });
        }).on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).trigger('click');
            }
        });
    }

});


/*======== Document Ready Function ========*/
$(document).ready(function() {

    "use strict";


    /*======== SimpleBar Setup ========*/
    $('.pt-page').each(function() {
        var $id = '#' + $(this).attr('id');
        new SimpleBar($($id)[0]);
    });

    $(document).on('mouseup', function (e) {
        var headerContainer = $('.header-main');

        if (!headerContainer.is(e.target) && headerContainer.has(e.target).length === 0 && $(e.target).closest('.header-toggle').length === 0) {
            $('.header-content').removeClass('on');
            $('.header-toggle').attr('aria-expanded', 'false');
        }

    });

    /*======== Fitty Setup ========*/
    fitty('.header-name', {
        multiLine: false,
        maxSize: 20,
        minSize: 10
    });

    /*======== Active Current Link ========*/
    $('.nav-menu a').on('click',function() {
        if($('.header-content.on').length) {
            $('.header-content').removeClass('on');
            $('.header-toggle').attr('aria-expanded', 'false');
        }
    });

    /*======== Mobile Toggle Click Setup ========*/
    $('.header-toggle').on('click', function() {
        $('.header-content').toggleClass('on');
        $(this).attr('aria-expanded', $('.header-content').hasClass('on') ? 'true' : 'false');
    });

    /*========Clients OwlCarousel Setup========*/
    $(".clients .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 2,
            },
            500: {
                items: 3,
            },
            700: {
                items: 4,
            },
            1000: {
                items: 6,
            },
        },
    });

    /*========Testimonials OwlCarousel Setup========*/
    $(".testimonials .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        dots: false,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            800: {
                items: 1,
            },
            1000: {
                items: 2,
            },
        },
    });

    /*======== Skills Progress Animation ========*/
    if($('.skills').length > 0) {

        var el = new SimpleBar($('#resume')[0]).getScrollElement();

        //When scrolled to Progress
        $(el).on('scroll', function() {
            animateProgress();
        });

        //When Resume Section have page-active on page load
        if($('#resume').hasClass('page-active')) {
            animateProgress();
        }

        //When Resume Link is clicked
        $('a[href="#resume"]').on('click', function(){
            animateProgress();
        });

        function animateProgress() {
            $('.progress .progress-bar').each(function() {
                var bottom_object = $(this).offset().top + $(this).outerHeight();
                var bottom_window = $(window).scrollTop() + $(window).height();
                var progressWidth = $(this).data('progress-value') + '%';
                if (bottom_window > bottom_object) {
                    $(this).css({
                        width: progressWidth
                    });
                    $(this).find('.progress-value').animate({
                        countNum: parseInt(progressWidth, 10)
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $(this).text(Math.floor(this.countNum) + '%');
                        },
                        complete: function() {
                            $(this).text(this.countNum + '%');
                        }
                    });
                }
            });
        }
    }

    /*======== Portfolio Image Link Setup ========*/
    $('.portfolio-items .image-link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /*======== Portfolio Video Link Setup ========*/
    $('.portfolio-items .video-link').magnificPopup({
        type: 'iframe',
        gallery: {
            enabled: true
        }
    });

    /*======== Portfolio Ajax Link Setup ========*/
    ajaxPortfolioSetup($('.portfolio-items .ajax-link'), $('.ajax-portfolio-popup'));

    /*======== Portfolio Tilt Setup ========*/
    $('#portfolio .item figure').tilt({
        maxTilt: 3,
        glare: true,
        maxGlare: .6,
        reverse: true
    });

    /*======== Google Map Setup ========*/
    if($('#map').length) {
        initMap();
     }


    /*======== Contact Form Setup ========*/
    contactFormSetup();
});


/*********** Function Ajax Portfolio Setup **********/
function ajaxPortfolioSetup($ajaxLink, $ajaxContainer) {
    $ajaxLink.on('click', function(e) {
        var link = $(this).attr('href');

        if(link === "#") {
            e.preventDefault();
            return;
        }

        $ajaxContainer.find('.content-wrap .popup-content').empty();

        $ajaxContainer.addClass('on');
        $.ajax({
            url: link,
            beforeSend: function() {
                $ajaxContainer.find('.ajax-loader').show();
            },
            success: function(result) {
                $ajaxContainer.find('.content-wrap .popup-content').html(result);
            },
            complete: function() {
                $ajaxContainer.find('.ajax-loader').hide();
            },
            error: function(e) {
                $ajaxContainer.find('.ajax-loader').hide();
                $ajaxContainer.find('.content-wrap .popup-content').html('<h1 class="text-center">Something went wrong! Retry or refresh the page.</h1>')
            }
        });
        e.preventDefault();
    });

    $ajaxContainer.find('.popup-close').on('click', function() {
        $ajaxContainer.removeClass('on');
    });


}


/********** Function Map Initialization **********/
function initMap() {
    var latitude = $("#map").data('latitude'),
        longitude = $("#map").data('longitude'),
        zoom = $("#map").data('zoom'),
        cordinates = new google.maps.LatLng(latitude, longitude);

    var styles = [{"stylers":[{"saturation":-100},{"gamma":0.8},{"lightness":4},{"visibility":"on"}]},{"featureType":"landscape.natural","stylers":[{"visibility":"on"},{"color":"#5dff00"},{"gamma":4.97},{"lightness":-5},{"saturation":100}]}];
        var mapOptions = {
        zoom: zoom,
        center: cordinates,
        mapTypeControl: false,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
        styles: styles
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var marker = new google.maps.Marker({
        position: cordinates,
        map: map,
        title: "We are here!"
    });
}

/********** Function Contact Form Setup **********/
function contactFormSetup() {
    var $form = $('#contact-form');
    if (!$form.length) {
        return;
    }

    function updateFieldState(field) {
        var $field = $(field);
        $field.parent('.input').toggleClass('input--filled', $.trim($field.val()).length > 0);
        if (field.checkValidity()) {
            $field.removeClass('cf-error');
        }
    }

    $('.input__field').each(function() {
        updateFieldState(this);
    }).on('input change', function() {
        updateFieldState(this);
    }).on('invalid', function() {
        $(this).addClass('cf-error');
    });

    $form.on('submit', function(e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }

        var name = $.trim($('#cf-name').val()),
            email = $.trim($('#cf-email').val()),
            message = $.trim($('#cf-message').val()),
            subject = 'Portfolio enquiry from ' + name,
            body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message,
            mailto = 'mailto:muhkhseet@gmail.com?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);

        showAlertBox(200, 'Your email app is opening. Review and send the message to complete your enquiry.');
        window.location.href = mailto;
    });
}


/********** Function Show Alert Box **********/
function showAlertBox(response, message) {
    var $alertBox = $('<div class="alert"></div>').text(message),
        $alContainer = $('#contact-form .alert-container');

    $alertBox.addClass(response === 200 ? 'alert-success' : 'alert-danger');
    $alContainer.stop(true).html($alertBox).fadeIn(300).delay(6000).fadeOut(400);
}

