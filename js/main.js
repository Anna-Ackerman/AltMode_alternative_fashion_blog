'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
        Navigation
    --------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image'
    });

    /*------------------
        Form Validation
    --------------------*/
    $('.comment-form, .contact-form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var nameInput = form.find('input[placeholder="Ім\'я"]');
        var emailInput = form.find('input[placeholder="Email"]');
        var messageInput = form.find('textarea[placeholder="Повідомлення"]');
        var isValid = true;

        form.find('.error-message').remove();

        if (nameInput.val().trim() === '') {
            nameInput.after('<div class="error-message">Будь ласка, введіть ім\'я</div>');
            isValid = false;
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.val().trim())) {
            emailInput.after('<div class="error-message">Введіть коректний email</div>');
            isValid = false;
        }

        if (messageInput.val().trim() === '') {
            messageInput.after('<div class="error-message">Будь ласка, введіть повідомлення</div>');
            isValid = false;
        }

        if (isValid) {
            console.log('Form is valid, ready to submit');
        }
    });

    /*------------------
        Newsletter Form Validation
    --------------------*/
    $('.news-form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var emailInput = form.find('input[placeholder="Enter your mail"]');
        var isValid = true;

        form.find('.error-message').remove();

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.val().trim())) {
            emailInput.after('<div class="error-message">Введіть коректний email</div>');
            isValid = false;
        }

        if (isValid) {
            console.log('Newsletter form is valid, ready to submit');
        }
    });

    /*------------------
        Footer Year
    --------------------*/
    $(document).ready(function () {
        $('.copyright-text').html(`<p>Copyright © ${new Date().getFullYear()} All rights reserved</p>`);
    });

    /*------------------
        Hero Text Animation and Background Carousel (Crossfade)
    --------------------*/
    $(document).ready(function () {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        $('.hs-text').addClass('animate');
                        const images = [
                            'img/hero-bg.jpg',
                            'img/hero-bg2.avif',
                            'img/hero-bg3.avif'
                        ];
                        let currentIndex = 0;
                        const bg1 = document.querySelector('#bg1');
                        const bg2 = document.querySelector('#bg2');

                        bg1.style.backgroundImage = `url(${images[0]})`;
                        bg1.classList.add('active');

                        function changeBackground() {
                            const nextIndex = (currentIndex + 1) % images.length;
                            if (bg1.classList.contains('active')) {
                                bg2.style.backgroundImage = `url(${images[nextIndex]})`;
                                bg2.classList.add('active');
                                bg1.classList.remove('active');
                            } else {
                                bg1.style.backgroundImage = `url(${images[nextIndex]})`;
                                bg1.classList.add('active');
                                bg2.classList.remove('active');
                            }
                            currentIndex = nextIndex;
                        }

                        setInterval(changeBackground, 3000);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3
            });

            observer.observe(heroSection);
        }
    });

})(jQuery);