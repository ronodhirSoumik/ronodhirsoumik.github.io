/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Initialize Recents Swiper
    if (document.querySelector('.recents-swiper')) {
        new Swiper('.recents-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.recents-next',
                prevEl: '.recents-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        });
    }

    // Recents Modal Logic
    const recentsModalEl = document.getElementById('recentsModal');
    if (recentsModalEl) {
        const modalBody = document.getElementById('recentsModalBody');
        
        // When card is clicked
        document.querySelectorAll('.recents-card').forEach(card => {
            card.addEventListener('click', () => {
                const type = card.getAttribute('data-type');
                const title = card.getAttribute('data-title');
                let contentHtml = '';
                
                if (type === 'video') {
                    const src = card.getAttribute('data-src');
                    modalBody.style.background = '#000';
                    contentHtml = `<iframe width="100%" height="100%" src="${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="min-height: 400px; height: 60vh; max-height: 600px;"></iframe>`;
                } else if (type === 'image') {
                    const src = card.getAttribute('data-src');
                    modalBody.style.background = '#000';
                    contentHtml = `<div class="d-flex align-items-center justify-content-center w-100 h-100" style="min-height: 400px;"><img src="${src}" class="img-fluid" style="max-height: 80vh; object-fit: contain;" alt="${title}"></div>`;
                } else if (type === 'text') {
                    const content = card.getAttribute('data-content');
                    modalBody.style.background = '#fff';
                    contentHtml = `<div class="p-4 p-md-5 w-100 h-100 bg-white" style="min-height: 400px;">
                                    <h3 class="mb-4 text-dark" style="font-family: 'Saira Extra Condensed', sans-serif; font-weight: 700;">${title}</h3>
                                    <div class="text-dark" style="font-family: 'Quicksand', sans-serif;">${content}</div>
                                   </div>`;
                }
                
                modalBody.innerHTML = contentHtml;
                const bsModal = new bootstrap.Modal(recentsModalEl);
                bsModal.show();
            });
        });

        // Clear contents to stop video etc. on close
        recentsModalEl.addEventListener('hidden.bs.modal', () => {
            modalBody.innerHTML = '';
            modalBody.style.background = '#000';
        });
    }

});
