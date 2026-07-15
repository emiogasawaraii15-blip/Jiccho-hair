'use strict';
{
    $(function () {
        $('.header__btn').on('click', function () {
            $('.nav').toggleClass('active');
        });

        $('.nav__btn, .nav__item a').on('click', function () {
            $('.nav').removeClass('active');
        });

        // top btn scroll
        $('.topBtn').on('click', function (e) {
            e.preventDefault();
            const position = 0;
            const speed = 600;
            console.log(position);
            console.log(speed);

            $('html,body').animate({
                scrollTop: position
            }, speed);
        });

        // fade in
        $(window).on('load scroll', function () {
            const FadeIn = $('.fadeIn');

            FadeIn.each(function () {
                const boxOffset = $(this).offset().top;
                const scrollPos = $(window).scrollTop();
                const wh = $(window).height();

                if (scrollPos > boxOffset - wh + 100) {
                    $(this).addClass('animated');
                }
            });
        });

        // loading
        setTimeout(function () {
            const loading = document.getElementById('loading');
            loading.classList.add('loaded');
            loading.classList.add('fadeout');
        }, 3000);

        //modal&slider gallery
        const slides = document.querySelectorAll('.modal__item');
        const openBtns = document.querySelectorAll('.photoGallery__item .open-btn');
        const overlay = document.getElementById('modalOverlay');
        const slider = document.getElementById('modalSlider');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const container = document.querySelector('.container');

        // arrows display block or none
        function updateNavButtons() {
            if (!slider || !prevBtn || !nextBtn || slides.length === 0) return;

            const scrollLeft = slider.scrollLeft;
            const sliderWidth = slider.clientWidth;

            const currentIndex = Math.round(scrollLeft / sliderWidth);

            if (currentIndex === 0) {
                prevBtn.classList.add('is-hidden');
            } else {
                prevBtn.classList.remove('is-hidden');
            }

            if (currentIndex === slides.length - 1) {
                nextBtn.classList.add('is-hidden');
            } else {
                nextBtn.classList.remove('is-hidden');
            }
        }
        // open modal window
        if (openBtns.length && overlay && slider) {
            openBtns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    overlay.classList.add('open');
                    if (container) container.classList.add('open');

                    setTimeout(() => {
                        const sliderWidth = slider.clientWidth;
                        slider.scrollLeft = sliderWidth * index;
                        updateNavButtons()
                    }, 50); 
                });
            });
        }

        // close modal window
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay || e.target.closest('.close-btn')) {
                    overlay.classList.remove('open');
                    if (container) container.classList.remove('open');
                }
            });
        }

        // scroll arrows
        if (nextBtn && prevBtn && slider) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
            });

            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
            });
            slider.addEventListener('scroll', updateNavButtons);
        }

    });
}

