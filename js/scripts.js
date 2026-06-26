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

    // Initialize Open Source Swiper
    if (document.querySelector('.opensource-swiper')) {
        new Swiper('.opensource-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: '.opensource-next',
                prevEl: '.opensource-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25,
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

    // Fetch dynamic PR counts
    const updatePrCount = (repo, elementId) => {
        const el = document.getElementById(elementId);
        if (el) {
            fetch(`https://api.github.com/search/issues?q=repo:${repo}+is:pr+author:ronodhirSoumik+is:merged`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.total_count !== undefined) {
                        el.innerText = `Merged: ${data.total_count}`;
                    }
                })
                .catch(error => console.error(`Error fetching PR count for ${repo}:`, error));
        }
    };

    // Fetch dynamic Issue counts
    const updateIssueCount = (repo, elementId) => {
        const el = document.getElementById(elementId);
        if (el) {
            fetch(`https://api.github.com/search/issues?q=repo:${repo}+is:issue+author:ronodhirSoumik`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.total_count !== undefined) {
                        el.innerText = `Issues: ${data.total_count}`;
                    }
                })
                .catch(error => console.error(`Error fetching issue count for ${repo}:`, error));
        }
    };

    // Fetch dynamic Review counts
    const updateReviewCount = (repo, elementId) => {
        const el = document.getElementById(elementId);
        if (el) {
            fetch(`https://api.github.com/search/issues?q=repo:${repo}+is:pr+reviewed-by:ronodhirSoumik`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.total_count !== undefined) {
                        el.innerText = `Reviews: ${data.total_count}`;
                    }
                })
                .catch(error => console.error(`Error fetching review count for ${repo}:`, error));
        }
    };

    // Fetch Repo Info (Stars)
    const updateRepoInfo = (repo, starsId) => {
        const starsEl = document.getElementById(starsId);
        if (starsEl) {
            fetch(`https://api.github.com/repos/${repo}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.stargazers_count !== undefined) {
                        starsEl.innerText = data.stargazers_count > 1000 ? (data.stargazers_count / 1000).toFixed(1) + 'k' : data.stargazers_count;
                    }
                })
                .catch(error => console.error(`Error fetching repo info for ${repo}:`, error));
        }
    };

    // Update Overall Stats
    const updateStatsRow = () => {
        const username = 'ronodhirSoumik';

        // Total PRs Merged
        fetch(`https://api.github.com/search/issues?q=author:${username}+is:pr+is:merged`)
            .then(res => res.json())
            .then(data => {
                const el = document.getElementById('stat-prs');
                if (el && data.total_count !== undefined) el.innerText = `${data.total_count}+`;
            }).catch(() => document.getElementById('stat-prs').innerText = '15+');

        // Total Repo Stars and Projects (Using a fixed set of projects or derived)
        // Since we can't easily fetch all stars across all contributed repos without authentication and multiple calls,
        // we'll sum the stars of the featured repos, and set projects dynamically if possible.
        Promise.all([
            fetch('https://api.github.com/repos/spring-projects/spring-security').then(res => res.json()),
            fetch('https://api.github.com/repos/flwrlabs/flower').then(res => res.json()),
            fetch('https://api.github.com/repos/nilbuild/developer-roadmap').then(res => res.json())
        ]).then(results => {
            let totalStars = 0;
            results.forEach(repo => {
                if (repo && repo.stargazers_count) totalStars += repo.stargazers_count;
            });
            const starsEl = document.getElementById('stat-stars');
            if (starsEl && totalStars > 0) starsEl.innerText = `${(totalStars / 1000).toFixed(0)}k+`;

            const projectsEl = document.getElementById('stat-projects');
            if (projectsEl) projectsEl.innerText = '3+';
        }).catch(() => {
            const starsEl = document.getElementById('stat-stars');
            if (starsEl) starsEl.innerText = '20k+';
            const projectsEl = document.getElementById('stat-projects');
            if (projectsEl) projectsEl.innerText = '3+';
        });
    };

    // Execute fetches
    updatePrCount('spring-projects/spring-security', 'pr-count-spring');
    updateIssueCount('spring-projects/spring-security', 'issue-count-spring');
    updateReviewCount('spring-projects/spring-security', 'review-count-spring');
    updateRepoInfo('spring-projects/spring-security', 'stars-spring');

    updatePrCount('flwrlabs/flower', 'pr-count-flower');
    updateIssueCount('flwrlabs/flower', 'issue-count-flower');
    updateReviewCount('flwrlabs/flower', 'review-count-flower');
    updateRepoInfo('flwrlabs/flower', 'stars-flower');

    updatePrCount('nilbuild/developer-roadmap', 'pr-count-roadmap');
    updateIssueCount('nilbuild/developer-roadmap', 'issue-count-roadmap');
    updateReviewCount('nilbuild/developer-roadmap', 'review-count-roadmap');
    updateRepoInfo('nilbuild/developer-roadmap', 'stars-roadmap');

    updateStatsRow();

});

