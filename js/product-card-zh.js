document.addEventListener('DOMContentLoaded', () => {
    const swiperWrapper = document.querySelector('#product-cardSwiper .swiper-wrapper');

    // 遍歷您的產品數據庫
    productData.forEach(product => {
        // 為每一筆數據，建立一個完整的 HTML 卡片字串
        const slideHTML = `
            <div class="swiper-slide">
                <div class="card">
                    <div class="card-inner">
                        <div class="card-front">
                            ${product.isHot ? '<span class="card-badge">HOT</span>' : ''}
                            <div class="card-image">
                                <img src="${product.imageUrl}" alt="${product.name}">
                            </div>
                            <img src="../images/home/logo.webp" alt="Company Logo" class="card-logo">
                            <div class="card-text">
                                <h3>${product.name}</h3>
                                <p>${product.description}</p>
                            </div>
                        </div>
                        <div class="card-back" style="background-image: url('${product.imageUrl}')">
                            <div class="card-back-content">
                                <h3>Details</h3>
                                <p>${product.details}</p>
                                <span class="more-button-container">
                                    <a class="btn-product" href="${product.productUrl}">More Details</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        swiperWrapper.innerHTML += slideHTML;
    });

    const swiper = new Swiper('#product-cardSwiper', {
        loop: true,
        centeredSlides: true,
        slidesPerView: 6,
        spaceBetween: 10,

        observer: true,
        observeParents: true,
        pagination: {
            el: '#productPagination',
            clickable: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        on: {
            init: function () {
                setTimeout(() => {
                    //swiper.slideToLoop(0, 0, false); // slideToLoop(index, speed, runCallbacks)

                    swiper.slides.forEach(slide => slide.classList.remove('active'));
                    swiper.slides[swiper.activeIndex].classList.add('active');
                }, 0);
            },
            slideChangeTransitionEnd: function () {
                swiper.slides.forEach(slide => slide.classList.remove('active'));
                swiper.slides[swiper.activeIndex].classList.add('active');
            }
        },
        breakpoints: {
            1640: {
                slidesPerView: 6
            },
            1440: {
                slidesPerView: 5
            },
            1024: {
                slidesPerView: 4
            },
            640: {
                slidesPerView: 2
            },
            0: {
                slidesPerView: 1
            }
        }
    });

    swiper.update();
    swiper.autoplay.start();

    setTimeout(() => {
        if (swiper.autoplay && swiper.autoplay.running === false) {
            swiper.autoplay.start();
        }
    }, 500);

    const productSlides = document.querySelectorAll('.product-card-section .swiper-slide');
    const productSection = document.querySelector('.product-card-section');

    let productAnimated = false;

    const productObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !productAnimated) {
                productAnimated = true;
                productSlides.forEach((slide, index) => {
                    setTimeout(() => {
                        slide.classList.add('loaded');
                    }, index * 200);
                });
                observer.unobserve(productSection);
            }
        });
    }, {
        threshold: 0.2
    });

    productObserver.observe(productSection);
});
